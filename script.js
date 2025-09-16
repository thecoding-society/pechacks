// Initialize starfield background
function initStarfield() {
  const canvas = document.getElementById("starfield");
  const ctx = canvas.getContext("2d");

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  resizeCanvas();

  const starCount = 200;
  const stars = Array.from({ length: starCount }).map(() => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    z: Math.random() * canvas.width,
    speed: Math.random() * 2 + 1,
  }));

  const animate = () => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < starCount; i++) {
      let star = stars[i];
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

    requestAnimationFrame(animate);
  };

  animate();

  window.addEventListener("resize", resizeCanvas);
}

// Initialize variables
let currentTime = new Date();
let windowSize = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// DOM Elements
const hudFrame = document.getElementById("hudFrame");
const hudTitle = document.getElementById("hudTitle");
const timeDisplay = document.getElementById("timeDisplay");
const dateDisplay = document.getElementById("dateDisplay");
const midpoints = document.getElementById("midpoints");

// Update time function
function updateTime() {
  currentTime = new Date();
  timeDisplay.textContent = formatTime(currentTime);
}

// Format time function
function formatTime(date) {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

// Update date function
function updateDate() {
  dateDisplay.textContent =
    windowSize.width < 640 ? "DEC 2025" : "DECEMBER 2025";
}

// Handle window resize
function handleResize() {
  windowSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  // Update responsive elements
  updateDate();

  // Show/hide midpoints based on screen size
  if (windowSize.width < 640) {
    midpoints.classList.add("hidden");
  } else {
    midpoints.classList.remove("hidden");
  }

  // Update title size and layout
  if (windowSize.width < 640) {
    hudTitle.style.fontSize = "2.5rem";
  } else if (windowSize.width >= 640 && windowSize.width < 1024) {
    hudTitle.style.fontSize = "4.5rem";
  } else {
    hudTitle.style.fontSize = "6rem";
  }

  // Adjust button layout for different screen sizes
  const buttonRow = document.querySelector(".button-row");
  const buttons = document.querySelectorAll(".space-button");
  const preRegisterBtn = document.querySelector(".space-btn");

  if (windowSize.width < 768) {
    buttonRow.style.flexDirection = "column";
    buttons.forEach((button) => {
      button.style.width = "100%";
    });
    preRegisterBtn.style.width = "100%";
  } else {
    buttonRow.style.flexDirection = "row";
    buttons.forEach((button) => {
      button.style.width = "380px";
    });
    preRegisterBtn.style.width = "780px";
  }
}

// Handle scroll animation
function handleScroll() {
  const scrollY = window.scrollY;

  // Calculate opacity and position values based on scroll
  const titleY = scrollY > 300 ? -200 : scrollY * (-200 / 300);
  const titleOpacity =
    scrollY < 200 ? 1 : scrollY > 300 ? 0 : 1 - (scrollY - 200) / 100;
  const elementsOpacity =
    scrollY < 100 ? 1 : scrollY > 200 ? 0 : 1 - (scrollY - 100) / 100;

  // Apply transformations

  hudTitle.style.opacity = titleOpacity;
  hudFrame.style.opacity = elementsOpacity;
}

// Date and time display
function updateDateTime() {
  const now = new Date();
  const dateOptions = { month: "long", year: "numeric" };
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  document.getElementById("dateDisplay").textContent = now
    .toLocaleDateString("en-US", dateOptions)
    .toUpperCase();
  document.getElementById("timeDisplay").textContent = now.toLocaleTimeString(
    "en-US",
    timeOptions
  );
}

// Countdown timer
function updateTimer() {
  // Set the future date
  const future = Date.parse("Dec 27, 2025 07:00:00");
  const now = new Date();
  const diff = future - now;

  // If the difference is negative, the event has passed
  if (diff <= 0) {
    document.getElementById("timer").innerHTML = `
                    <div class="timer-unit">
                        <div class="timer-value">00</div>
                        <div class="timer-label">Event Started</div>
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
  document.getElementById("days").textContent = days
    .toString()
    .padStart(2, "0");
  document.getElementById("hours").textContent = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").textContent = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").textContent = seconds
    .toString()
    .padStart(2, "0");
}

// Initialize
function init() {
  // Initialize starfield
  initStarfield();

  // Set initial time and date
  updateTime();
  updateDate();
  updateDateTime();
  updateTimer();

  // Set up intervals
  setInterval(updateTime, 1000);
  setInterval(updateDateTime, 1000);
  setInterval(updateTimer, 1000);

  // Set up event listeners
  window.addEventListener("resize", handleResize);
  window.addEventListener("scroll", handleScroll);

  // Initial call to set responsive elements
  handleResize();
}

// Start when DOM is loaded
document.addEventListener("DOMContentLoaded", init);

/*ABOUT SECTION  CODE STARTS*/

// Initialize AOS
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 800,
    once: true,
  });
});

/*DOMAINS SECTION  CODE START HERE*/

// No specific JavaScript is needed for the domain section functionality
// The domain cards use CSS hover effects for interactivity

// If you want to add click functionality to the domain cards:
document.addEventListener("DOMContentLoaded", function () {
  const domainCards = document.querySelectorAll("#domains .cosmic-card");

  domainCards.forEach((card) => {
    card.addEventListener("click", function () {
      // Add your custom click behavior here
      const domainName = this.querySelector("h3").textContent;
      console.log(`Selected domain: ${domainName}`);
      // You could redirect to a domain-specific page or show more details
    });
  });
});

/*PATRONS SECTION  CODE STARTS STAR HERE */

// Set current year in footer
document.getElementById("current-year").textContent = new Date().getFullYear();

// Handle sponsorship deck download
function downloadSponsorshipDeck() {
  // Create a temporary link element
  const link = document.createElement("a");
  link.href = "./assets/Pec Hacks 3.0 Sponsorship Deck.pdf"; // Replace with actual URL
  link.download = "PEC-Hacks-3.0-Sponsorship-Deck.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Alternatively, you could open in a new tab:
  // window.open('https://example.com/path/to/sponsorship-deck.pdf', '_blank');
}


// Layout pattern: 5,4,5,4 repeating for desktop
        const pattern = [5, 4, 5, 4];
        const TOTAL_COLS = 12;
        let row = 0;
        let inRowIndex = 0;

        function applyLayout() {
            const gridItems = document.querySelectorAll('#grid > .hex-container');
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
                    const startCol = leftOffset + 1 + (inRowIndex * 2);
                    item.style.gridColumn = `${startCol} / span 2`;

                    inRowIndex++;
                    if (inRowIndex >= perRow) { row++; inRowIndex = 0; }
                });
            }
        }

        // Apply layout on load and resize
        window.addEventListener('load', applyLayout);
        window.addEventListener('resize', applyLayout);


         // Navbar functionality
        const navbar = document.getElementById('navbar');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileNav = document.getElementById('mobileNav');
        const closeMenu = document.getElementById('closeMenu');
        
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Mobile menu toggle
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        closeMenu.addEventListener('click', closeMobileNav);
        
        function closeMobileNav() {
            mobileNav.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        // Close mobile nav when clicking outside
        mobileNav.addEventListener('click', (e) => {
            if (e.target === mobileNav) {
                closeMobileNav();
            }
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile nav if open
                    closeMobileNav();
                }
            });
        });