// Scroll Reveal Animation
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);

// Initial call to reveal elements already in view
reveal();

// Header scroll effect
window.addEventListener("scroll", function() {
    var header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// Smooth scroll for nav links (handled by CSS, but good to have JS fallback or for custom logic)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const nav = document.querySelector('.nav-links');
        const hamburgerIcon = document.querySelector('.hamburger i');
        if (nav.classList.contains('nav-active')) {
            nav.classList.remove('nav-active');
            hamburgerIcon.classList.remove('fa-times');
            hamburgerIcon.classList.add('fa-bars');
        }
    });
});

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav-links');
const hamburgerIcon = document.querySelector('.hamburger i');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    
    // Toggle icon
    if (nav.classList.contains('nav-active')) {
        hamburgerIcon.classList.remove('fa-bars');
        hamburgerIcon.classList.add('fa-times');
    } else {
        hamburgerIcon.classList.remove('fa-times');
        hamburgerIcon.classList.add('fa-bars');
    }
});

// Carousel Logic
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel-container');

    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');
        const items = Array.from(track.children);
        
        if (items.length === 0) return;

        let currentIndex = 0;

        const updateCarousel = () => {
            const itemWidth = items[0].getBoundingClientRect().width;
            // Add the 30px total horizontal margin (15px left + 15px right) defined in CSS
            const step = itemWidth + 30; 
            track.style.transform = `translateX(-${step * currentIndex}px)`;
        };

        const getMaxIndex = () => {
            const trackWidth = carousel.querySelector('.carousel-track-wrapper').getBoundingClientRect().width;
            const itemWidth = items[0].getBoundingClientRect().width + 30;
            const visibleItems = Math.floor(trackWidth / itemWidth) || 1;
            return Math.max(0, items.length - visibleItems);
        };

        nextBtn.addEventListener('click', () => {
            const maxIndex = getMaxIndex();
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        // Update on resize to maintain correct alignment
        window.addEventListener('resize', () => {
            const maxIndex = getMaxIndex();
            if (currentIndex > maxIndex) {
                currentIndex = maxIndex;
            }
            updateCarousel();
        });
    });
});
