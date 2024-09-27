$(document).ready(function () {
    var owl = $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 10,
        nav: true, // Enable navigation arrows
        dots: false, // Disable dots
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true, // This will stop autoplay on hover
        smartSpeed: 1000,
        navText: ["<span>&#8249;</span>", "<span>&#8250;</span>"], // Custom arrow icons
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            800: {
                items: 4 // Ensure 4 items fit within 800px
            }
        }
    });

    // Manually handle hover events
    $('.owl-carousel .item').hover(
        function () { // On mouse over
            owl.trigger('stop.owl.autoplay'); // Stop autoplay
        },
        function () { // On mouse leave
            owl.trigger('play.owl.autoplay'); // Resume autoplay
        }
    );
});




//   Timer

function updateTimer() {
    // Set the future date (change this to Dec 28 if needed)
    future = Date.parse("Dec 28, 2024 8:00:00");
    now = new Date();
    diff = future - now;

    // If the difference is negative, the event has passed
    if (diff <= 0) {
        document.getElementById("timer").innerHTML = "<div>Event has passed</div>";
        return; // Stop further execution
    }

    days = Math.floor(diff / (1000 * 60 * 60 * 24));
    hours = Math.floor(diff / (1000 * 60 * 60));
    mins = Math.floor(diff / (1000 * 60));
    secs = Math.floor(diff / 1000);

    d = days;
    h = hours - days * 24;
    m = mins - hours * 60;
    s = secs - mins * 60;

    document.getElementById("timer").innerHTML =
        "<div>" +
        d +
        "<span> Days</span></div>" +
        "<div>" +
        h +
        "<span> Hours</span></div>" +
        "<div>" +
        m +
        "<span> Minutes</span></div>" +
        "<div>" +
        s +
        "<span> Seconds</span></div>";
}

setInterval(updateTimer, 1000);


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        const offset = 80; // Adjust this value based on your navbar's height

        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    });
});

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
let nav = document.querySelector('nav');

// Scroll event to highlight active link
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('hit');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('hit');
            });
        }
    });
};

// Toggle menu for mobile view
function toggleMenu() {
    nav.classList.toggle('active');
}

// Create the hamburger button dynamically
const header = document.querySelector('header');
const hamburger = document.createElement('div');
hamburger.className = 'hamburger';
hamburger.innerHTML = '<span></span><span></span><span></span>';
hamburger.onclick = toggleMenu;
header.appendChild(hamburger);

// FAQ transition js
// Select all accordion buttons
const accordionButtons = document.querySelectorAll('.accordion-button');

// Loop through all accordion buttons
accordionButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Get the currently opened accordion item (if any)
        const openAccordion = document.querySelector('.accordion-collapse.show');

        // If there's an open accordion and it's not the one that was clicked, close it
        if (openAccordion && openAccordion !== this.nextElementSibling) {
            // Remove the 'show' class and apply smooth transition
            openAccordion.style.height = openAccordion.scrollHeight + 'px';
            window.getComputedStyle(openAccordion).height; // Force reflow
            openAccordion.style.height = '0';

            openAccordion.addEventListener('transitionend', () => {
                openAccordion.classList.remove('show');
                openAccordion.style.height = null;
            }, { once: true });

            // Collapse the previous button
            openAccordion.previousElementSibling.querySelector('.accordion-button').classList.add('collapsed');
        }

        // Toggle the clicked accordion item
        const collapse = this.nextElementSibling;

        if (!collapse.classList.contains('show')) {
            // Expand the new accordion panel
            collapse.classList.add('show');
            collapse.style.height = '0';
            window.getComputedStyle(collapse).height; // Force reflow
            collapse.style.height = collapse.scrollHeight + 'px';

            // Remove inline height after transition ends
            collapse.addEventListener('transitionend', () => {
                collapse.style.height = null;
            }, { once: true });

            // Toggle the collapsed state of the button
            this.classList.remove('collapsed');
        }
    });
});



window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    const heading = document.getElementById('heading-pec'); // "PEC HACKS 2.0" heading

    const headingOffset = heading.offsetTop; // Get the heading's position from the top of the page
    const scrollPosition = window.scrollY; // Current scroll position

    if (scrollPosition > headingOffset) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Script for Timeline

    // Function to update AOS attributes based on screen size
    function updateTimelineAOS() {
        const timelineItems = document.querySelectorAll('.timeline-item');

        // For smaller screens, set all to 'fade-left'
        if (window.innerWidth < 768) {
            timelineItems.forEach((item) => {
                item.setAttribute('data-aos', 'fade-left');
            });
        } else {
            // For larger screens, restore original data-aos values
            timelineItems.forEach((item, index) => {
                if (index % 2 === 0) {
                    item.setAttribute('data-aos', 'fade-right');
                } else {
                    item.setAttribute('data-aos', 'fade-left');
                }
            });
        }
    }

    // Initialize AOS
    AOS.init();

    // Initial update on page load
    updateTimelineAOS();

    // Update AOS on window resize
    window.addEventListener('resize', updateTimelineAOS);
