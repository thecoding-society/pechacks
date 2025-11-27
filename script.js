// All your existing JavaScript code goes here
// Navbar functionality
const navbarsMain = document.getElementById("navbarsMain");
const navbarsMenuBtn = document.getElementById("navbarsMenuBtn");
const navbarsMobile = document.getElementById("navbarsMobile");
const navbarsCloseBtn = document.getElementById("navbarsCloseBtn");

// Get all navigation links
const navLinks = document.querySelectorAll(".navbars-link");
const mobileNavLinks = document.querySelectorAll(".navbars-mobile-link");
const sections = document.querySelectorAll("section");

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbarsMain.classList.add("scrolled");
  } else {
    navbarsMain.classList.remove("scrolled");
  }

  // Update active section
  updateActiveSection();
});

// Update active section based on scroll position
function updateActiveSection() {
  let current = "";
  const scrollPosition = window.scrollY + 100; // Offset for better detection

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  // Update desktop navigation
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });

  // Update mobile navigation
  mobileNavLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

// Mobile menu toggle
function navbarsOpenMobile() {
  navbarsMobile.classList.add("active");
  document.body.style.overflow = "hidden";
}

function navbarsCloseMobile() {
  navbarsMobile.classList.remove("active");
  document.body.style.overflow = "auto";
}

navbarsMenuBtn.addEventListener("click", navbarsOpenMobile);
navbarsCloseBtn.addEventListener("click", navbarsCloseMobile);

// Close mobile nav when clicking outside
navbarsMobile.addEventListener("click", (e) => {
  if (e.target === navbarsMobile) {
    navbarsCloseMobile();
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const navbarHeight = navbarsMain.offsetHeight;
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset -
        navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // Update active state immediately
      setTimeout(updateActiveSection, 100);

      // Close mobile nav if open
      navbarsCloseMobile();
    }
  });
});

// Close mobile nav on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    navbarsCloseMobile();
  }
});

// Close mobile nav on window resize (if needed)
window.addEventListener("resize", () => {
  if (window.innerWidth > 900) {
    navbarsCloseMobile();
  }
});

// Initialize active section on page load
document.addEventListener("DOMContentLoaded", () => {
  updateActiveSection();
});

// Update active section when page loads with hash in URL
window.addEventListener("load", () => {
  if (window.location.hash) {
    setTimeout(updateActiveSection, 100);
  }
});

// starfield background starts
function starfieldInit() {
  const canvas = document.getElementById("starfieldCanvas");
  const ctx = canvas.getContext("2d");

  const starfieldResizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  starfieldResizeCanvas();

  const starfieldStarCount = 200;
  const starfieldStars = Array.from({ length: starfieldStarCount }).map(() => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    z: Math.random() * canvas.width,
    speed: Math.random() * 2 + 1,
  }));

  const starfieldAnimate = () => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < starfieldStarCount; i++) {
      let star = starfieldStars[i];
      star.z -= star.speed;

      if (star.z <= 0) {
        star.z = canvas.width;
        star.x = Math.random() * canvas.width;
        star.y = Math.random() * canvas.height;
        star.speed = Math.random() * 2 + 1;
      }

      const scale = 500 / star.z;
      const x = (star.x - canvas.width / 2) * scale + canvas.width / 2;
      const y = (star.y - canvas.height / 2) * scale + canvas.height / 2;

      if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
        const size = (1 - star.z / canvas.width) * 2;
        const opacity = (1 - star.z / canvas.width) * 0.8;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      }
    }

    requestAnimationFrame(starfieldAnimate);
  };

  starfieldAnimate();

  window.addEventListener("resize", starfieldResizeCanvas);
}

document.addEventListener("DOMContentLoaded", starfieldInit);

//cursor code starts
class TargetCursor {
  constructor(options = {}) {
    this.targetSelector = options.targetSelector || ".cursor-target";
    this.spinDuration = options.spinDuration || 2;
    this.hideDefaultCursor = options.hideDefaultCursor !== false;

    this.constants = {
      borderWidth: 3,
      cornerSize: 12,
      parallaxStrength: 0.00005,
    };

    this.activeTarget = null;
    this.currentTargetMove = null;
    this.currentLeaveHandler = null;
    this.isAnimatingToTarget = false;
    this.resumeTimeout = null;
    this.spinTl = null;

    this.init();
  }

  init() {
    this.createCursor();
    this.setupEventListeners();

    if (this.hideDefaultCursor) {
      document.body.style.cursor = "none";
    }
  }

  createCursor() {
    this.cursorWrapper = document.createElement("div");
    this.cursorWrapper.className = "target-cursor-wrapper";

    this.dot = document.createElement("div");
    this.dot.className = "target-cursor-dot";
    this.cursorWrapper.appendChild(this.dot);

    const corners = [
      { className: "target-cursor-corner corner-tl" },
      { className: "target-cursor-corner corner-tr" },
      { className: "target-cursor-corner corner-br" },
      { className: "target-cursor-corner corner-bl" },
    ];

    corners.forEach((corner) => {
      const cornerEl = document.createElement("div");
      cornerEl.className = corner.className;
      this.cursorWrapper.appendChild(cornerEl);
    });

    document.body.appendChild(this.cursorWrapper);
    this.corners = this.cursorWrapper.querySelectorAll(".target-cursor-corner");

    gsap.set(this.cursorWrapper, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    this.createSpinTimeline();
  }

  createSpinTimeline() {
    if (this.spinTl) {
      this.spinTl.kill();
    }

    this.spinTl = gsap.timeline({ repeat: -1 }).to(this.cursorWrapper, {
      rotation: "+=360",
      duration: this.spinDuration,
      ease: "none",
    });
  }

  moveCursor(x, y) {
    if (!this.cursorWrapper) return;

    gsap.to(this.cursorWrapper, {
      x,
      y,
      duration: 0.1,
      ease: "power3.out",
    });
  }

  cleanupTarget(target) {
    if (this.currentTargetMove) {
      target.removeEventListener("mousemove", this.currentTargetMove);
    }
    if (this.currentLeaveHandler) {
      target.removeEventListener("mouseleave", this.currentLeaveHandler);
    }
    this.currentTargetMove = null;
    this.currentLeaveHandler = null;
  }

  setupEventListeners() {
    this.moveHandler = (e) => this.moveCursor(e.clientX, e.clientY);
    window.addEventListener("mousemove", this.moveHandler);

    this.scrollHandler = () => {
      if (!this.activeTarget || !this.cursorWrapper) return;

      const mouseX = gsap.getProperty(this.cursorWrapper, "x");
      const mouseY = gsap.getProperty(this.cursorWrapper, "y");

      const elementUnderMouse = document.elementFromPoint(mouseX, mouseY);
      const isStillOverTarget =
        elementUnderMouse &&
        (elementUnderMouse === this.activeTarget ||
          elementUnderMouse.closest(this.targetSelector) === this.activeTarget);

      if (!isStillOverTarget) {
        if (this.currentLeaveHandler) {
          this.currentLeaveHandler();
        }
      }
    };

    window.addEventListener("scroll", this.scrollHandler, { passive: true });

    this.mouseDownHandler = () => {
      if (!this.dot) return;
      gsap.to(this.dot, { scale: 0.7, duration: 0.3 });
      gsap.to(this.cursorWrapper, { scale: 0.9, duration: 0.2 });
    };

    this.mouseUpHandler = () => {
      if (!this.dot) return;
      gsap.to(this.dot, { scale: 1, duration: 0.3 });
      gsap.to(this.cursorWrapper, { scale: 1, duration: 0.2 });
    };

    window.addEventListener("mousedown", this.mouseDownHandler);
    window.addEventListener("mouseup", this.mouseUpHandler);

    this.enterHandler = (e) => {
      const directTarget = e.target;

      const allTargets = [];
      let current = directTarget;
      while (current && current !== document.body) {
        if (current.matches(this.targetSelector)) {
          allTargets.push(current);
        }
        current = current.parentElement;
      }

      const target = allTargets[0] || null;
      if (!target || !this.cursorWrapper || !this.corners) return;

      if (this.activeTarget === target) return;

      if (this.activeTarget) {
        this.cleanupTarget(this.activeTarget);
      }

      if (this.resumeTimeout) {
        clearTimeout(this.resumeTimeout);
        this.resumeTimeout = null;
      }

      this.activeTarget = target;
      const corners = Array.from(this.corners);
      corners.forEach((corner) => {
        gsap.killTweensOf(corner);
      });

      gsap.killTweensOf(this.cursorWrapper, "rotation");
      this.spinTl?.pause();

      gsap.set(this.cursorWrapper, { rotation: 0 });

      const updateCorners = (mouseX, mouseY) => {
        const rect = target.getBoundingClientRect();
        const cursorRect = this.cursorWrapper.getBoundingClientRect();

        const cursorCenterX = cursorRect.left + cursorRect.width / 2;
        const cursorCenterY = cursorRect.top + cursorRect.height / 2;

        const [tlc, trc, brc, blc] = Array.from(this.corners);

        const { borderWidth, cornerSize, parallaxStrength } = this.constants;

        let tlOffset = {
          x: rect.left - cursorCenterX - borderWidth,
          y: rect.top - cursorCenterY - borderWidth,
        };
        let trOffset = {
          x: rect.right - cursorCenterX + borderWidth - cornerSize,
          y: rect.top - cursorCenterY - borderWidth,
        };
        let brOffset = {
          x: rect.right - cursorCenterX + borderWidth - cornerSize,
          y: rect.bottom - cursorCenterY + borderWidth - cornerSize,
        };
        let blOffset = {
          x: rect.left - cursorCenterX - borderWidth,
          y: rect.bottom - cursorCenterY + borderWidth - cornerSize,
        };

        if (mouseX !== undefined && mouseY !== undefined) {
          const targetCenterX = rect.left + rect.width / 2;
          const targetCenterY = rect.top + rect.height / 2;
          const mouseOffsetX = (mouseX - targetCenterX) * parallaxStrength;
          const mouseOffsetY = (mouseY - targetCenterY) * parallaxStrength;

          tlOffset.x += mouseOffsetX;
          tlOffset.y += mouseOffsetY;
          trOffset.x += mouseOffsetX;
          trOffset.y += mouseOffsetY;
          brOffset.x += mouseOffsetX;
          brOffset.y += mouseOffsetY;
          blOffset.x += mouseOffsetX;
          blOffset.y += mouseOffsetY;
        }

        const tl = gsap.timeline();
        const corners = [tlc, trc, brc, blc];
        const offsets = [tlOffset, trOffset, brOffset, blOffset];

        corners.forEach((corner, index) => {
          tl.to(
            corner,
            {
              x: offsets[index].x,
              y: offsets[index].y,
              duration: 0.2,
              ease: "power2.out",
            },
            0
          );
        });
      };

      this.isAnimatingToTarget = true;
      updateCorners();

      setTimeout(() => {
        this.isAnimatingToTarget = false;
      }, 1);

      let moveThrottle = null;
      const targetMove = (ev) => {
        if (moveThrottle || this.isAnimatingToTarget) return;
        moveThrottle = requestAnimationFrame(() => {
          const mouseEvent = ev;
          updateCorners(mouseEvent.clientX, mouseEvent.clientY);
          moveThrottle = null;
        });
      };

      const leaveHandler = () => {
        this.activeTarget = null;
        this.isAnimatingToTarget = false;

        if (this.corners) {
          const corners = Array.from(this.corners);
          gsap.killTweensOf(corners);

          const { cornerSize } = this.constants;
          const positions = [
            { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: cornerSize * 0.5 },
            { x: -cornerSize * 1.5, y: cornerSize * 0.5 },
          ];

          const tl = gsap.timeline();
          corners.forEach((corner, index) => {
            tl.to(
              corner,
              {
                x: positions[index].x,
                y: positions[index].y,
                duration: 0.3,
                ease: "power3.out",
              },
              0
            );
          });
        }

        this.resumeTimeout = setTimeout(() => {
          if (!this.activeTarget && this.cursorWrapper && this.spinTl) {
            const currentRotation = gsap.getProperty(
              this.cursorWrapper,
              "rotation"
            );
            const normalizedRotation = currentRotation % 360;

            this.spinTl.kill();
            this.spinTl = gsap.timeline({ repeat: -1 }).to(this.cursorWrapper, {
              rotation: "+=360",
              duration: this.spinDuration,
              ease: "none",
            });

            gsap.to(this.cursorWrapper, {
              rotation: normalizedRotation + 360,
              duration: this.spinDuration * (1 - normalizedRotation / 360),
              ease: "none",
              onComplete: () => {
                this.spinTl?.restart();
              },
            });
          }
          this.resumeTimeout = null;
        }, 50);

        this.cleanupTarget(target);
      };

      this.currentTargetMove = targetMove;
      this.currentLeaveHandler = leaveHandler;

      target.addEventListener("mousemove", targetMove);
      target.addEventListener("mouseleave", leaveHandler);
    };

    window.addEventListener("mouseover", this.enterHandler, { passive: true });
  }

  destroy() {
    window.removeEventListener("mousemove", this.moveHandler);
    window.removeEventListener("mouseover", this.enterHandler);
    window.removeEventListener("scroll", this.scrollHandler);
    window.removeEventListener("mousedown", this.mouseDownHandler);
    window.removeEventListener("mouseup", this.mouseUpHandler);

    if (this.activeTarget) {
      this.cleanupTarget(this.activeTarget);
    }

    this.spinTl?.kill();

    if (this.cursorWrapper) {
      this.cursorWrapper.remove();
    }

    document.body.style.cursor = "";
  }
}

// Initialize the cursor when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const cursor = new TargetCursor({
    targetSelector: ".cursor-target",
    spinDuration: 2,
    hideDefaultCursor: true,
  });
});
// cursor code ends

//Home section starts
// Countdown timer
function updateHomeTimer() {
  // Set the future date
  const future = Date.parse("Dec 27, 2025 07:00:00");
  const now = new Date();
  const diff = future - now;

  // If the difference is negative, the event has passed
  if (diff <= 0) {
    document.querySelector(".home-timer").innerHTML = `
                                                          <div class="home-timer-unit">
                                                              <div class="home-timer-value">00</div>
                                                              <div class="home-timer-label">Event Started</div>
                                                          </div>
                                                      `;
    return;
  }

  // Calculate time components
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  // Update the display
  document.getElementById("homeDays").textContent = days
    .toString()
    .padStart(2, "0");
  document.getElementById("homeHours").textContent = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("homeMinutes").textContent = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("homeSeconds").textContent = seconds
    .toString()
    .padStart(2, "0");
}

// Glitch effect cycle
function startGlitchCycle() {
  const glitchElement = document.getElementById("glitchElement");

  // Initial delay of 2 seconds before first glitch
  setTimeout(() => {
    // Add glitch effect
    glitchElement.classList.add("glitch-active");

    // Remove glitch after 2 seconds
    setTimeout(() => {
      glitchElement.classList.remove("glitch-active");

      // Restart the cycle after 2 seconds of normal display
      setTimeout(startGlitchCycle, 2000);
    }, 2000);
  }, 2000);
}

// Initialize
function initHome() {
  // Set initial timer
  updateHomeTimer();

  // Set up interval for timer
  setInterval(updateHomeTimer, 1000);

  // Start the glitch cycle
  startGlitchCycle();
}

// Start when DOM is loaded
document.addEventListener("DOMContentLoaded", initHome);

//home section ends

//About section starts
// Function to animate counting
function animateCounter(element) {
  const target = parseInt(element.getAttribute("data-target"));
  const duration = 2000; // Animation duration in milliseconds
  const step = Math.ceil(target / (duration / 16)); // Calculate step for 60fps
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    // Format numbers with commas
    element.textContent = current.toLocaleString();
  }, 16);
}

// Function to check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <=
      (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
    rect.bottom >= 0
  );
}

// Track which elements have been animated in the current view
let animatedElements = new Set();

// Initialize counters when page loads
document.addEventListener("DOMContentLoaded", function () {
  const statsSection = document.querySelector(".about-stats-section");

  // Function to handle scroll event
  function handleScroll() {
    if (isInViewport(statsSection)) {
      const counters = document.querySelectorAll(".stat-number");

      counters.forEach((counter) => {
        // Only animate if not already animated in this view
        if (!animatedElements.has(counter)) {
          animateCounter(counter);
          animatedElements.add(counter);
        }
      });
    } else {
      // Reset animation tracking when section is out of view
      animatedElements.clear();
    }
  }

  // Add scroll event listener with throttling
  let scrollTimeout;
  window.addEventListener("scroll", function () {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(function () {
        scrollTimeout = null;
        handleScroll();
      }, 100);
    }
  });

  // Check if section is already in view on page load
  handleScroll();
});
//About section ends

//Domains section

// DOMAIN CARDS INTERACTIVITY
document.addEventListener("DOMContentLoaded", function () {
  const domainCards = document.querySelectorAll(".pec-domain-card");

  domainCards.forEach((card) => {
    const cardData = card.querySelector(".pec-domain-card__data");

    card.addEventListener("mouseenter", function () {
      // Show data animation
      cardData.style.animation = "pec-show-data 1s forwards";
      cardData.style.opacity = "1";
      cardData.style.transition = "opacity 0.3s";

      // Remove overflow animation
      card.style.animation = "pec-remove-overflow 2s forwards";
    });

    card.addEventListener("mouseleave", function () {
      // Remove data animation
      cardData.style.animation = "pec-remove-data 1s forwards";

      // Show overflow animation
      card.style.animation = "pec-show-overflow 2s forwards";

      // After animation completes, reset opacity with delay
      setTimeout(() => {
        if (!card.matches(":hover")) {
          cardData.style.opacity = "0";
        }
      }, 1000);
    });
  });
});

//domain section ends

//timeline section starts
// Progress bar animation
function initTimelineProgress() {
  const progressBar = document.getElementById("timeline-progressBar");
  const timelineEvents = document.querySelectorAll(".timeline-event");
  const eventMarkers = document.querySelectorAll(".timeline-event-marker");
  const eventDescriptions = document.querySelectorAll(
    ".timeline-event-description"
  );

  // Initially hide the progress bar completely
  progressBar.style.opacity = "0";
  progressBar.style.height = "0%";

  let hasUserScrolled = false;
  let progressBarVisible = false;

  // Track if user has started scrolling
  window.addEventListener("scroll", function () {
    if (!hasUserScrolled) {
      hasUserScrolled = window.pageYOffset > 10;
    }
  });

  window.addEventListener("scroll", function () {
    const timelineComponent = document.querySelector(".timeline-component");
    const timelineRect = timelineComponent.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Only activate if user has actually scrolled AND timeline is in view
    const timelineInView =
      timelineRect.top < windowHeight * 0.8 &&
      timelineRect.bottom > windowHeight * 0.2;

    if (hasUserScrolled && timelineInView) {
      if (!progressBarVisible) {
        // Show progress bar with fade-in effect
        progressBar.style.opacity = "1";
        progressBarVisible = true;
      }

      // Calculate progress based on timeline visibility
      const timelineStart = scrollTop + timelineRect.top;
      const timelineEnd = timelineStart + timelineRect.height;
      const viewportMiddle = scrollTop + windowHeight / 2;

      // Calculate how much of the timeline has been scrolled through
      const timelineScrollStart = timelineStart - windowHeight * 0.3;
      const timelineScrollEnd = timelineEnd - windowHeight * 0.7;
      const scrollRange = timelineScrollEnd - timelineScrollStart;

      if (scrollRange > 0) {
        const currentScroll = Math.max(
          0,
          Math.min(scrollRange, scrollTop - timelineScrollStart)
        );
        const progressPercentage = (currentScroll / scrollRange) * 100;
        progressBar.style.height =
          Math.max(0, Math.min(100, progressPercentage)) + "%";
      }
    } else {
      // Hide progress bar when not in timeline section or if user hasn't scrolled yet
      if (progressBarVisible) {
        progressBar.style.opacity = "0";
        progressBarVisible = false;
      }
      progressBar.style.height = "0%";
    }

    // Update active states based on scroll position
    timelineEvents.forEach((event, index) => {
      const rect = event.getBoundingClientRect();
      const isVisible =
        rect.top < window.innerHeight * 0.7 &&
        rect.bottom > window.innerHeight * 0.3;

      if (isVisible) {
        eventMarkers[index].classList.add("active");
        eventDescriptions[index].classList.add("active");
      } else {
        eventMarkers[index].classList.remove("active");
        eventDescriptions[index].classList.remove("active");
      }
    });
  });

  // Small delay to ensure DOM is fully ready
  setTimeout(() => {
    window.dispatchEvent(new Event("scroll"));
  }, 100);
}

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", function () {
  initTimelineProgress();
});

//timeline section ends

//workshop section starts
// Workshop Section JavaScript - SIMPLIFIED VERSION
let activeDay = 1;
let isTransitioning = false;

// DOM Elements
const contentArea = document.getElementById("contentArea");
const dayButtons = document.getElementById("dayButtons");

// Initialize
function initWorkshop() {
  renderDayButtons();
  updateActiveDay(activeDay);
  initStarfield();

  // Handle window resize
  window.addEventListener("resize", handleResize);
}

// Render Day Navigation Buttons
function renderDayButtons() {
  dayButtons.innerHTML = "";
  for (let i = 1; i <= 6; i++) {
    const button = document.createElement("button");
    button.className = "workshop-day-button";
    button.textContent = i;
    button.dataset.day = i;

    if (i === activeDay) {
      button.classList.add("workshop-active");
    }

    button.addEventListener("click", () => handleDayChange(i));
    dayButtons.appendChild(button);
  }
}

// Handle Day Change - SIMPLIFIED (no auto-scroll)
function handleDayChange(day) {
  if (day === activeDay || isTransitioning) return;

  isTransitioning = true;
  contentArea.classList.add("workshop-transitioning");

  setTimeout(() => {
    activeDay = day;
    updateActiveDay(day);
    contentArea.classList.remove("workshop-transitioning");

    // Update button states
    document.querySelectorAll(".workshop-day-button").forEach((btn) => {
      btn.classList.toggle(
        "workshop-active",
        parseInt(btn.dataset.day) === day
      );
    });

    isTransitioning = false;
  }, 400);
}

// Update Active Day Content
function updateActiveDay(dayNumber) {
  // Hide all content areas
  document.querySelectorAll(".workshop-content").forEach((content) => {
    content.classList.remove("active");
  });

  // Show the active content area
  const activeContent = document.querySelector(
    `.workshop-content[data-day="${dayNumber}"]`
  );
  if (activeContent) {
    activeContent.classList.add("active");
  }
}

// Navigate Days
function navigateDay(direction) {
  if (direction === "prev" && activeDay > 1) {
    handleDayChange(activeDay - 1);
  } else if (direction === "next" && activeDay < 6) {
    handleDayChange(activeDay + 1);
  }
}

// Keyboard Navigation (optional - keep if you want keyboard support)
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
    e.preventDefault();
    navigateDay("prev");
  } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
    e.preventDefault();
    navigateDay("next");
  }
});

// Starfield Animation
function initStarfield() {
  const canvas = document.getElementById("starfield");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const stars = [];
  const starCount = 80;

  // Initialize stars
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.3 + 0.1,
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach((star) => {
      // Twinkling effect
      star.opacity += (Math.random() - 0.5) * 0.05;
      star.opacity = Math.max(0.2, Math.min(1, star.opacity));

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.fill();

      // Slow drift
      star.y += star.speed * 0.1;
      if (star.y > canvas.height) {
        star.y = 0;
        star.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(animate);
  }

  animate();

  // Handle resize
  window.addEventListener("resize", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  });
}

// Handle window resize
function handleResize() {
  // Center buttons on mobile
  if (window.innerWidth <= 768) {
    document.querySelector(".workshop-day-buttons").style.justifyContent =
      "center";
  }
}

// Initialize on load
window.addEventListener("DOMContentLoaded", initWorkshop);

//workshop section ends

// Gallery Section JavaScript
// Layout pattern: 5,4,5,4 repeating for desktop
const pattern = [5, 4, 5, 4];
const TOTAL_COLS = 12;
let row = 0;
let inRowIndex = 0;

function applyLayout() {
  const gridItems = document.querySelectorAll(".gallery-hex-container");
  const isMobile = window.innerWidth <= 600;

  if (isMobile) {
    // Mobile layout is handled by CSS
    return;
  } else {
    // Desktop layout: 5,4,5,4 pattern
    row = 0;
    inRowIndex = 0;

    gridItems.forEach((item) => {
      const perRow = pattern[row % pattern.length];
      const occupiedCols = perRow * 2;
      const leftOffset = Math.floor((TOTAL_COLS - occupiedCols) / 2);
      const startCol = leftOffset + 1 + inRowIndex * 2;
      item.style.gridColumn = `${startCol} / span 2`;

      inRowIndex++;
      if (inRowIndex >= perRow) {
        row++;
        inRowIndex = 0;
      }
    });
  }
}

// Apply layout on resize
window.addEventListener("resize", applyLayout);

// Initialize gallery layout when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  applyLayout();
});

//full sponser section starts

function viewSponsorshipDeck() {
  // Open the sponsorship deck in a new browser tab for viewing
  window.open("./assets/Pec Hacks 3.0 Sponsorship Deck Final.pdf", "_blank");
}

//full sponser section ends

// Teams Section JavaScript
// Teams Section JavaScript - HOVER FOR DESKTOP, CLICK FOR MOBILE
document.addEventListener("DOMContentLoaded", function () {
  // Function to toggle social menu for each team member
  const teamssShowSocial = (btnId, socialId) => {
    const btn = document.getElementById(btnId);
    const social = document.getElementById(socialId);
    const card = btn.closest(".teamss__card");
    const content = card.querySelector(".teamss__content");

    if (btn && social) {
      // Click event for mobile devices
      const toggleSocialMenu = (e) => {
        e.stopPropagation(); // Prevent event bubbling

        // Toggle the active state
        const isActive = social.classList.contains("teamss-show-social");

        // Close all other open social menus first
        document
          .querySelectorAll(".teamss__social.teamss-show-social")
          .forEach((otherSocial) => {
            if (otherSocial !== social) {
              otherSocial.classList.remove("teamss-show-social");
              const otherBtn =
                otherSocial.previousElementSibling?.querySelector(
                  ".teamss__button"
                );
              if (otherBtn) {
                otherBtn.classList.remove("teamss-show-icon");
              }
              const otherContent = otherSocial.previousElementSibling;
              if (otherContent) {
                otherContent.style.borderRadius = "1.5rem";
              }
            }
          });

        // Toggle current social menu
        social.classList.toggle("teamss-show-social");
        btn.classList.toggle("teamss-show-icon");

        // Update content border radius
        if (content) {
          if (!isActive) {
            content.style.borderRadius = "1.5rem 1.5rem 0 0";
          } else {
            content.style.borderRadius = "1.5rem";
          }
        }
      };

      // Only add click events for mobile devices
      if (window.innerWidth <= 768) {
        btn.addEventListener("click", toggleSocialMenu);

        // Touch event for mobile to ensure proper triggering
        btn.addEventListener("touchend", (e) => {
          e.preventDefault();
          toggleSocialMenu(e);
        });
      }
    }
  };

  // Close social menu when clicking outside (for mobile only)
  function closeAllSocialMenus() {
    document
      .querySelectorAll(".teamss__social.teamss-show-social")
      .forEach((social) => {
        social.classList.remove("teamss-show-social");
        const btn =
          social.previousElementSibling?.querySelector(".teamss__button");
        if (btn) {
          btn.classList.remove("teamss-show-icon");
        }
        const content = social.previousElementSibling;
        if (content) {
          content.style.borderRadius = "1.5rem";
        }
      });
  }

  // Only add outside click listeners for mobile
  if (window.innerWidth <= 768) {
    // Close on outside click
    document.addEventListener("click", (e) => {
      if (
        !e.target.closest(".teamss__card") &&
        !e.target.closest(".teamss__social")
      ) {
        closeAllSocialMenus();
      }
    });

    // Close on outside touch
    document.addEventListener("touchstart", (e) => {
      if (
        !e.target.closest(".teamss__card") &&
        !e.target.closest(".teamss__social")
      ) {
        closeAllSocialMenus();
      }
    });
  }

  // Initialize all profile cards
  for (let i = 1; i <= 13; i++) {
    teamssShowSocial(`teamss-btn-${i}`, `teamss-social-${i}`);
  }

  // Handle window resize to adjust functionality
  window.addEventListener("resize", function () {
    const isNowMobile = window.innerWidth <= 768;

    if (isNowMobile) {
      // Re-initialize with mobile functionality
      for (let i = 1; i <= 13; i++) {
        teamssShowSocial(`teamss-btn-${i}`, `teamss-social-${i}`);
      }
    } else {
      // Close all menus when switching to desktop view
      closeAllSocialMenus();
    }
  });
});

//prizes section starts
document.addEventListener("DOMContentLoaded", () => {
  const techCards = document.querySelectorAll(".nnprize-tech-card");

  const isMobileView = () => window.innerWidth <= 900;

  techCards.forEach((card) => {
    card.addEventListener("click", (event) => {
      if (isMobileView()) {
        event.preventDefault();

        const wasActive = card.classList.contains("nnprize-active-tap");

        techCards.forEach((otherCard) => {
          if (
            otherCard !== card &&
            otherCard.classList.contains("nnprize-active-tap")
          ) {
            otherCard.classList.remove("nnprize-active-tap");
          }
        });

        if (!wasActive) {
          card.classList.add("nnprize-active-tap");
        } else {
          card.classList.remove("nnprize-active-tap");
        }
      }
    });
  });
});
//prizes section ends

//faq section starts
// FAQ Accordion functionality
document.addEventListener("DOMContentLoaded", function () {
  const accordionButtons = document.querySelectorAll(".faqs-accordion-button");

  accordionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const accordionItem = button.parentElement;
      const accordionContent = button.nextElementSibling;

      // Close all other accordion items
      document.querySelectorAll(".faqs-accordion-item").forEach((item) => {
        if (item !== accordionItem && item.classList.contains("active")) {
          item.classList.remove("active");
          item.querySelector(".faqs-accordion-content").style.maxHeight = null;
          item
            .querySelector(".faqs-accordion-button")
            .classList.remove("active");
        }
      });

      // Toggle current accordion item
      accordionItem.classList.toggle("active");
      button.classList.toggle("active");

      if (accordionContent.style.maxHeight) {
        accordionContent.style.maxHeight = null;
      } else {
        accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
      }
    });
  });

  // Open first accordion by default
  // if (accordionButtons.length > 0) {
  //   accordionButtons[0].click();
  // }
});
//faq section ends

// Set current year in footer
document.getElementById("current-year").textContent = new Date().getFullYear();

// Patrons animation script
document.addEventListener("DOMContentLoaded", function () {
  const patronsAnimatedElements = document.querySelectorAll(
    ".patrons-fade-in-up"
  );

  const patronsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running";
          patronsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  // Initially pause animations
  patronsAnimatedElements.forEach((el) => {
    el.style.animationPlayState = "paused";
    patronsObserver.observe(el);
  });

  // Add staggered animation delay for patron cards
  const patronsCards = document.querySelectorAll(".patrons-card");
  patronsCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });
});
