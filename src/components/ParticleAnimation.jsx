import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import anime from "animejs";
import { createNoise3D, createNoise4D } from "simplex-noise";
import "./ParticleAnimation.css";

const ParticleAnimation = () => {
  const canvasRef = useRef(null);
  const loadingRef = useRef(null);
  const progressRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    // Configuration
    const CONFIG = {
      particleCount: 15000,
      shapeSize: 14,
      swarmDistanceFactor: 1.5,
      swirlFactor: 4.0,
      noiseFrequency: 0.1,
      noiseTimeScale: 0.04,
      noiseMaxStrength: 2.8,
      colorScheme: "fire",
      morphDuration: 4000,
      particleSizeRange: [0.08, 0.25],
      starCount: 18000,
      bloomStrength: 1.3,
      bloomRadius: 0.5,
      bloomThreshold: 0.05,
      idleFlowStrength: 0.25,
      idleFlowSpeed: 0.08,
      idleRotationSpeed: 0.02,
      morphSizeFactor: 0.5,
      morphBrightnessFactor: 0.6,
    };

    const COLOR_SCHEMES = {
      fire: { startHue: 0, endHue: 45, saturation: 0.95, lightness: 0.6 },
      neon: { startHue: 300, endHue: 180, saturation: 1.0, lightness: 0.65 },
      nature: { startHue: 90, endHue: 160, saturation: 0.85, lightness: 0.55 },
      rainbow: { startHue: 0, endHue: 360, saturation: 0.9, lightness: 0.6 },
    };

    // Initialize variables
    let scene, camera, renderer, controls, clock;
    let composer, bloomPass;
    let particlesGeometry, particlesMaterial, particleSystem;
    let currentPositions, sourcePositions, targetPositions, swarmPositions;
    let particleSizes, particleOpacities, particleEffectStrengths;
    let noise3D, noise4D;
    let morphTimeline = null;
    let isInitialized = false;
    let isMorphing = false;
    let currentShapeIndex = 0;
    const morphState = { progress: 0.0 };

    // Utility vectors
    const tempVec = new THREE.Vector3();
    const sourceVec = new THREE.Vector3();
    const targetVec = new THREE.Vector3();
    const swarmVec = new THREE.Vector3();
    const noiseOffset = new THREE.Vector3();
    const flowVec = new THREE.Vector3();
    const bezPos = new THREE.Vector3();
    const swirlAxis = new THREE.Vector3();
    const currentVec = new THREE.Vector3();

    // Shape generators
    const generateTextPoints = (text) => {
      const cvs = document.createElement("canvas");
      cvs.width = 900;
      cvs.height = 128;
      const ctx = cvs.getContext("2d");
      ctx.clearRect(0, 0, cvs.width, cvs.height);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 60px Courier New";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, cvs.width / 2, cvs.height / 2);

      const img = ctx.getImageData(0, 0, cvs.width, cvs.height).data;
      const pts = [];
      for (let y = 0; y < cvs.height; y += 2) {
        for (let x = 0; x < cvs.width; x += 2) {
          const i = (y * cvs.width + x) * 4;
          if (img[i + 3] > 128) {
            const px = (x - cvs.width / 2) * 0.15;
            const py = (cvs.height / 2 - y) * 0.15;
            pts.push(px, py, 0);
          }
        }
      }

      const arr = new Float32Array(CONFIG.particleCount * 3);
      const count = pts.length / 3;
      for (let i = 0; i < CONFIG.particleCount; i++) {
        const src = (i % count) * 3;
        arr[i * 3] = pts[src];
        arr[i * 3 + 1] = pts[src + 1];
        arr[i * 3 + 2] = pts[src + 2];
      }
      return arr;
    };

    const SHAPES = [
      {
        name: " PEC Hacks 2.0 ",
        generator: () => generateTextPoints(" PEC Hacks 2.0 "),
      },
      {
        name: " PEC Hacks 3.0 ",
        generator: () => generateTextPoints(" PEC Hacks 3.0 "),
      },
    ];

    // Create star texture
    const createStarTexture = () => {
      const size = 64;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext("2d");
      const gradient = context.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2
      );
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(0.2, "rgba(255,255,255,0.8)");
      gradient.addColorStop(0.5, "rgba(255,255,255,0.3)");
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, size, size);
      return new THREE.CanvasTexture(canvas);
    };

    // Create starfield
    const createStarfield = () => {
      const starVertices = [];
      const starSizes = [];
      const starColors = [];
      const starGeometry = new THREE.BufferGeometry();

      for (let i = 0; i < CONFIG.starCount; i++) {
        tempVec.set(
          THREE.MathUtils.randFloatSpread(400),
          THREE.MathUtils.randFloatSpread(400),
          THREE.MathUtils.randFloatSpread(400)
        );
        if (tempVec.length() < 100)
          tempVec.setLength(100 + Math.random() * 300);
        starVertices.push(tempVec.x, tempVec.y, tempVec.z);
        starSizes.push(Math.random() * 0.15 + 0.05);
        const color = new THREE.Color();
        if (Math.random() < 0.1) {
          color.setHSL(Math.random(), 0.7, 0.65);
        } else {
          color.setHSL(0.6, Math.random() * 0.1, 0.8 + Math.random() * 0.2);
        }
        starColors.push(color.r, color.g, color.b);
      }

      starGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(starVertices, 3)
      );
      starGeometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(starColors, 3)
      );
      starGeometry.setAttribute(
        "size",
        new THREE.Float32BufferAttribute(starSizes, 1)
      );

      const starMaterial = new THREE.ShaderMaterial({
        uniforms: { pointTexture: { value: createStarTexture() } },
        vertexShader: `
          attribute float size;
          varying vec3 vColor;
          varying float vSize;
          void main() {
            vColor = color;
            vSize = size;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (400.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform sampler2D pointTexture;
          varying vec3 vColor;
          varying float vSize;
          void main() {
            float alpha = texture2D(pointTexture, gl_PointCoord).a;
            if (alpha < 0.1) discard;
            gl_FragColor = vec4(vColor, alpha * 0.9);
          }
        `,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
        vertexColors: true,
      });

      scene.add(new THREE.Points(starGeometry, starMaterial));
    };

    // Update color array
    const updateColorArray = (colors, positionsArray) => {
      const colorScheme = COLOR_SCHEMES[CONFIG.colorScheme];
      const center = new THREE.Vector3(0, 0, 0);
      const maxRadius = CONFIG.shapeSize * 1.1;

      for (let i = 0; i < CONFIG.particleCount; i++) {
        const i3 = i * 3;
        tempVec.fromArray(positionsArray, i3);
        const dist = tempVec.distanceTo(center);
        let hue;

        if (CONFIG.colorScheme === "rainbow") {
          const normX = (tempVec.x / maxRadius + 1) / 2;
          const normY = (tempVec.y / maxRadius + 1) / 2;
          const normZ = (tempVec.z / maxRadius + 1) / 2;
          hue = (normX * 120 + normY * 120 + normZ * 120) % 360;
        } else {
          hue = THREE.MathUtils.mapLinear(
            dist,
            0,
            maxRadius,
            colorScheme.startHue,
            colorScheme.endHue
          );
        }

        const noiseValue =
          (noise3D(tempVec.x * 0.2, tempVec.y * 0.2, tempVec.z * 0.2) + 1) *
          0.5;
        const saturation = THREE.MathUtils.clamp(
          colorScheme.saturation * (0.9 + noiseValue * 0.2),
          0,
          1
        );
        const lightness = THREE.MathUtils.clamp(
          colorScheme.lightness * (0.85 + noiseValue * 0.3),
          0.1,
          0.9
        );
        const color = new THREE.Color().setHSL(
          hue / 360,
          saturation,
          lightness
        );
        color.toArray(colors, i3);
      }
    };

    // Update colors
    const updateColors = () => {
      const colors = particlesGeometry.attributes.color.array;
      updateColorArray(colors, particlesGeometry.attributes.position.array);
      particlesGeometry.attributes.color.needsUpdate = true;
    };

    // Setup particle system
    const setupParticleSystem = () => {
      targetPositions = SHAPES.map((shape) => shape.generator());
      currentPositions = new Float32Array(targetPositions[0]);
      sourcePositions = new Float32Array(targetPositions[0]);
      swarmPositions = new Float32Array(CONFIG.particleCount * 3);

      particlesGeometry = new THREE.BufferGeometry();
      particlesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(currentPositions, 3)
      );

      particleSizes = new Float32Array(CONFIG.particleCount);
      particleOpacities = new Float32Array(CONFIG.particleCount);
      particleEffectStrengths = new Float32Array(CONFIG.particleCount);

      for (let i = 0; i < CONFIG.particleCount; i++) {
        particleSizes[i] = THREE.MathUtils.randFloat(
          CONFIG.particleSizeRange[0],
          CONFIG.particleSizeRange[1]
        );
        particleOpacities[i] = 1.0;
        particleEffectStrengths[i] = 0.0;
      }

      particlesGeometry.setAttribute(
        "size",
        new THREE.BufferAttribute(particleSizes, 1)
      );
      particlesGeometry.setAttribute(
        "opacity",
        new THREE.BufferAttribute(particleOpacities, 1)
      );
      particlesGeometry.setAttribute(
        "aEffectStrength",
        new THREE.BufferAttribute(particleEffectStrengths, 1)
      );

      const colors = new Float32Array(CONFIG.particleCount * 3);
      updateColorArray(colors, currentPositions);
      particlesGeometry.setAttribute(
        "color",
        new THREE.BufferAttribute(colors, 3)
      );

      particlesMaterial = new THREE.ShaderMaterial({
        uniforms: {
          pointTexture: { value: createStarTexture() },
        },
        vertexShader: `
          attribute float size;
          attribute float opacity;
          attribute float aEffectStrength;
          varying vec3 vColor;
          varying float vOpacity;
          varying float vEffectStrength;

          void main() {
            vColor = color;
            vOpacity = opacity;
            vEffectStrength = aEffectStrength;

            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

            float sizeScale = 1.0 - vEffectStrength * ${CONFIG.morphSizeFactor.toFixed(
              2
            )};
            gl_PointSize = size * sizeScale * (400.0 / -mvPosition.z);

            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform sampler2D pointTexture;
          varying vec3 vColor;
          varying float vOpacity;
          varying float vEffectStrength;

          void main() {
            float alpha = texture2D(pointTexture, gl_PointCoord).a;
            if (alpha < 0.05) discard;

            vec3 finalColor = vColor * (1.0 + vEffectStrength * ${CONFIG.morphBrightnessFactor.toFixed(
              2
            )});

            gl_FragColor = vec4(finalColor, alpha * vOpacity);
          }
        `,
        blending: THREE.AdditiveBlending,
        depthTest: true,
        depthWrite: false,
        transparent: true,
        vertexColors: true,
      });

      particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particleSystem);
    };

    // Setup post processing
    const setupPostProcessing = () => {
      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        CONFIG.bloomStrength,
        CONFIG.bloomRadius,
        CONFIG.bloomThreshold
      );
      composer.addPass(bloomPass);
    };

    // Trigger morph animation
    const triggerMorph = () => {
      if (isMorphing) return;
      isMorphing = true;
      controls.autoRotate = false;
      infoRef.current.innerText = "Morphing...";
      infoRef.current.style.textShadow = "0 0 8px rgba(255, 150, 50, 0.9)";

      sourcePositions.set(currentPositions);
      const nextShapeIndex = (currentShapeIndex + 1) % SHAPES.length;
      const nextTargetPositions = targetPositions[nextShapeIndex];
      const centerOffsetAmount = CONFIG.shapeSize * CONFIG.swarmDistanceFactor;

      for (let i = 0; i < CONFIG.particleCount; i++) {
        const i3 = i * 3;
        sourceVec.fromArray(sourcePositions, i3);
        targetVec.fromArray(nextTargetPositions, i3);
        swarmVec.lerpVectors(sourceVec, targetVec, 0.5);
        const offsetDir = tempVec
          .set(
            noise3D(i * 0.05, 10, 10),
            noise3D(20, i * 0.05, 20),
            noise3D(30, 30, i * 0.05)
          )
          .normalize();
        const distFactor =
          sourceVec.distanceTo(targetVec) * 0.1 + centerOffsetAmount;
        swarmVec.addScaledVector(
          offsetDir,
          distFactor * (0.5 + Math.random() * 0.8)
        );
        swarmPositions[i3] = swarmVec.x;
        swarmPositions[i3 + 1] = swarmVec.y;
        swarmPositions[i3 + 2] = swarmVec.z;
      }

      currentShapeIndex = nextShapeIndex;
      morphState.progress = 0;

      if (morphTimeline) morphTimeline.pause();

      morphTimeline = anime({
        targets: morphState,
        progress: 1,
        duration: CONFIG.morphDuration,
        easing: "cubicBezier(0.4, 0.0, 0.2, 1.0)",
        complete: () => {
          infoRef.current.innerText = `Shape: ${SHAPES[currentShapeIndex].name} (Click to morph)`;
          infoRef.current.style.textShadow = "0 0 5px rgba(0, 128, 255, 0.8)";
          currentPositions.set(targetPositions[currentShapeIndex]);
          particlesGeometry.attributes.position.needsUpdate = true;
          particleEffectStrengths.fill(0.0);
          particlesGeometry.attributes.aEffectStrength.needsUpdate = true;
          sourcePositions.set(targetPositions[currentShapeIndex]);
          updateColors();
          isMorphing = false;
          controls.autoRotate = true;
        },
      });
    };

    // Update morph animation
    const updateMorphAnimation = (
      positions,
      effectStrengths,
      elapsedTime,
      deltaTime
    ) => {
      const t = morphState.progress;
      const targets = targetPositions[currentShapeIndex];
      const effectStrength = Math.sin(t * Math.PI);
      const currentSwirl = effectStrength * CONFIG.swirlFactor * deltaTime * 50;
      const currentNoise = effectStrength * CONFIG.noiseMaxStrength;

      for (let i = 0; i < CONFIG.particleCount; i++) {
        const i3 = i * 3;
        sourceVec.fromArray(sourcePositions, i3);
        swarmVec.fromArray(swarmPositions, i3);
        targetVec.fromArray(targets, i3);

        const t_inv = 1.0 - t;
        const t_inv_sq = t_inv * t_inv;
        const t_sq = t * t;
        bezPos.copy(sourceVec).multiplyScalar(t_inv_sq);
        bezPos.addScaledVector(swarmVec, 2.0 * t_inv * t);
        bezPos.addScaledVector(targetVec, t_sq);

        if (currentSwirl > 0.01) {
          tempVec.subVectors(bezPos, sourceVec);
          swirlAxis
            .set(
              noise3D(i * 0.02, elapsedTime * 0.1, 0),
              noise3D(0, i * 0.02, elapsedTime * 0.1 + 5),
              noise3D(elapsedTime * 0.1 + 10, 0, i * 0.02)
            )
            .normalize();
          tempVec.applyAxisAngle(
            swirlAxis,
            currentSwirl * (0.5 + Math.random() * 0.5)
          );
          bezPos.copy(sourceVec).add(tempVec);
        }

        if (currentNoise > 0.01) {
          const noiseTime = elapsedTime * CONFIG.noiseTimeScale;
          noiseOffset.set(
            noise4D(
              bezPos.x * CONFIG.noiseFrequency,
              bezPos.y * CONFIG.noiseFrequency,
              bezPos.z * CONFIG.noiseFrequency,
              noiseTime
            ),
            noise4D(
              bezPos.x * CONFIG.noiseFrequency + 100,
              bezPos.y * CONFIG.noiseFrequency + 100,
              bezPos.z * CONFIG.noiseFrequency + 100,
              noiseTime
            ),
            noise4D(
              bezPos.x * CONFIG.noiseFrequency + 200,
              bezPos.y * CONFIG.noiseFrequency + 200,
              bezPos.z * CONFIG.noiseFrequency + 200,
              noiseTime
            )
          );
          bezPos.addScaledVector(noiseOffset, currentNoise);
        }

        positions[i3] = bezPos.x;
        positions[i3 + 1] = bezPos.y;
        positions[i3 + 2] = bezPos.z;
        effectStrengths[i] = effectStrength;
      }

      particlesGeometry.attributes.aEffectStrength.needsUpdate = true;
    };

    // Update idle animation
    const updateIdleAnimation = (
      positions,
      effectStrengths,
      elapsedTime,
      deltaTime
    ) => {
      const breathScale = 1.0 + Math.sin(elapsedTime * 0.5) * 0.015;
      const timeScaled = elapsedTime * CONFIG.idleFlowSpeed;
      const freq = 0.1;
      let needsEffectStrengthReset = false;

      for (let i = 0; i < CONFIG.particleCount; i++) {
        const i3 = i * 3;
        sourceVec.fromArray(sourcePositions, i3);
        tempVec.copy(sourceVec).multiplyScalar(breathScale);
        flowVec.set(
          noise4D(
            tempVec.x * freq,
            tempVec.y * freq,
            tempVec.z * freq,
            timeScaled
          ),
          noise4D(
            tempVec.x * freq + 10,
            tempVec.y * freq + 10,
            tempVec.z * freq + 10,
            timeScaled
          ),
          noise4D(
            tempVec.x * freq + 20,
            tempVec.y * freq + 20,
            tempVec.z * freq + 20,
            timeScaled
          )
        );
        tempVec.addScaledVector(flowVec, CONFIG.idleFlowStrength);
        currentVec.fromArray(positions, i3);
        currentVec.lerp(tempVec, 0.05);
        positions[i3] = currentVec.x;
        positions[i3 + 1] = currentVec.y;
        positions[i3 + 2] = currentVec.z;

        if (effectStrengths[i] !== 0.0) {
          effectStrengths[i] = 0.0;
          needsEffectStrengthReset = true;
        }
      }

      if (needsEffectStrengthReset) {
        particlesGeometry.attributes.aEffectStrength.needsUpdate = true;
      }
    };

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (!isInitialized) return;

      const elapsedTime = clock.getElapsedTime();
      const deltaTime = clock.getDelta();
      controls.update();

      const positions = particlesGeometry.attributes.position.array;
      const effectStrengths =
        particlesGeometry.attributes.aEffectStrength.array;

      if (isMorphing) {
        updateMorphAnimation(
          positions,
          effectStrengths,
          elapsedTime,
          deltaTime
        );
      } else {
        updateIdleAnimation(positions, effectStrengths, elapsedTime, deltaTime);
      }

      particlesGeometry.attributes.position.needsUpdate = true;
      if (
        isMorphing ||
        particlesGeometry.attributes.aEffectStrength.needsUpdate
      ) {
        particlesGeometry.attributes.aEffectStrength.needsUpdate = true;
      }

      composer.render(deltaTime);
    };

    // Canvas click handler
    const handleCanvasClick = (event) => {
      if (event.target.closest("#controls")) return;
      triggerMorph();
    };

    // Window resize handler
    const handleWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };

    // Initialize the scene
    const init = () => {
      let progress = 0;
      const updateProgress = (increment) => {
        progress += increment;
        progressRef.current.style.width = `${Math.min(100, progress)}%`;
        if (progress >= 100) {
          setTimeout(() => {
            loadingRef.current.style.opacity = "0";
            setTimeout(() => {
              loadingRef.current.style.display = "none";
            }, 600);
          }, 200);
        }
      };

      clock = new THREE.Clock();
      noise3D = createNoise3D(() => Math.random());
      noise4D = createNoise4D(() => Math.random());
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x000308, 0.03);
      updateProgress(5);

      camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(0, 8, 28);
      camera.lookAt(scene.position);
      updateProgress(5);

      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      updateProgress(10);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.minDistance = 5;
      controls.maxDistance = 80;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.3;
      updateProgress(5);

      scene.add(new THREE.AmbientLight(0x404060));
      const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
      dirLight1.position.set(15, 20, 10);
      scene.add(dirLight1);
      const dirLight2 = new THREE.DirectionalLight(0x88aaff, 0.9);
      dirLight2.position.set(-15, -10, -15);
      scene.add(dirLight2);
      updateProgress(10);

      setupPostProcessing();
      updateProgress(10);
      createStarfield();
      updateProgress(15);
      setupParticleSystem();
      updateProgress(25);

      window.addEventListener("resize", handleWindowResize);
      canvasRef.current.addEventListener("click", handleCanvasClick);
      document
        .getElementById("shape-btn")
        .addEventListener("click", triggerMorph);
      document.querySelectorAll(".color-option").forEach((option) => {
        option.addEventListener("click", (e) => {
          document
            .querySelectorAll(".color-option")
            .forEach((o) => o.classList.remove("active"));
          e.target.classList.add("active");
          CONFIG.colorScheme = e.target.dataset.scheme;
          updateColors();
        });
      });
      document
        .querySelector(`.color-option[data-scheme="${CONFIG.colorScheme}"]`)
        .classList.add("active");
      updateProgress(15);

      isInitialized = true;
      animate();
    };

    init();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleWindowResize);
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("click", handleCanvasClick);
      }
      if (morphTimeline) {
        morphTimeline.pause();
      }
      // Additional cleanup for Three.js resources if needed
    };
  }, []);

  return (
    <>
      <div id="loading" ref={loadingRef}>
        <span>Initializing Particles...</span>
        <div id="progress-container">
          <div id="progress" ref={progressRef}></div>
        </div>
      </div>

      <div id="ui">
        <div id="info" ref={infoRef}>
          Shape: Sphere (Click to morph)
        </div>
      </div>

      <div id="controls">
        <button id="shape-btn">Change Shape</button>

        <div id="color-picker">
          <div
            className="color-option"
            data-scheme="fire"
            style={{
              background: "linear-gradient(to bottom right, #ff4500, #ffcc00)",
            }}
          ></div>
          <div
            className="color-option"
            data-scheme="neon"
            style={{
              background: "linear-gradient(to bottom right, #ff00ff, #00ffff)",
            }}
          ></div>
          <div
            className="color-option"
            data-scheme="nature"
            style={{
              background: "linear-gradient(to bottom right, #00ff00, #66ffcc)",
            }}
          ></div>
          <div
            className="color-option"
            data-scheme="rainbow"
            style={{
              background:
                "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)",
            }}
          ></div>
        </div>
      </div>

      <canvas id="webglCanvas" ref={canvasRef}></canvas>
    </>
  );
};

export default ParticleAnimation;
