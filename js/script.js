document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Set active nav link based on current page
    const currentLocation = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (currentLocation.includes(href) && href !== 'index.html') {
            item.classList.add('active');
        } else if (currentLocation.endsWith('/') && href === 'index.html') {
            item.classList.add('active');
        }
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            }
        });
    });
    
    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.course-card, .section-title, .testimonial-card, .story-card, .value-item, .journey-step, .test-card, .video-card, .performer-card, .batch-card, .webinar-card, .reveal, .reveal-left, .reveal-right, h1, h2, h3, .cta-btn, .hero-image, .hero-badge');
        
        elements.forEach((element, index) => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight * 0.85;
            
            if (elementPosition < screenPosition) {
                // Add staggered delay for cards
                if (element.classList.contains('course-card') || 
                    element.classList.contains('testimonial-card') || 
                    element.classList.contains('value-item') ||
                    element.classList.contains('test-card') ||
                    element.classList.contains('video-card') ||
                    element.classList.contains('performer-card') ||
                    element.classList.contains('batch-card') ||
                    element.classList.contains('webinar-card')) {
                    setTimeout(() => {
                        element.classList.add('animate');
                        element.classList.add('active'); // For reveal animations
                    }, index * 100);
                } else {
                    element.classList.add('animate');
                    element.classList.add('active'); // For reveal animations
                }
            }
        });
    };
    
    // Run animation check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on page load
    setTimeout(animateOnScroll, 300);
    
    // Add hover animations for buttons
    const buttons = document.querySelectorAll('.btn, .cta-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Add ripple effect to buttons
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Implement smooth scroll for all elements
    const smoothScrollElements = document.querySelectorAll('h1, h2, h3, p, img, .cta-btn, .section-icon');
    smoothScrollElements.forEach((element, index) => {
        // Add reveal classes based on element type
        if (element.tagName === 'IMG' || element.classList.contains('section-icon')) {
            element.classList.add('reveal-right');
        } else if (element.classList.contains('cta-btn')) {
            element.classList.add('reveal');
        } else {
            element.classList.add('reveal-left');
        }
    });
    
    // Tab functionality for test series
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Carousel functionality
    const carousel = document.querySelector('.performers-carousel');
    const carouselCards = document.querySelectorAll('.performer-card');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    const dots = document.querySelectorAll('.dot');
    
    if (carousel && carouselCards.length > 0) {
        let currentIndex = 0;
        const cardWidth = carouselCards[0].offsetWidth + 24; // Card width + gap
        
        // Update carousel position
        const updateCarousel = () => {
            carousel.scrollTo({
                left: currentIndex * cardWidth,
                behavior: 'smooth'
            });
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        };
        
        // Previous button
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateCarousel();
                }
            });
        }
        
        // Next button
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentIndex < carouselCards.length - 1) {
                    currentIndex++;
                    updateCarousel();
                }
            });
        }
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
            });
        });
    }
    
    // Countdown timer
    const countdownElements = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };
    
    if (countdownElements.days && countdownElements.hours && countdownElements.minutes && countdownElements.seconds) {
        // Set the target date (5 days from now)
        const now = new Date();
        const targetDate = new Date(now);
        targetDate.setDate(now.getDate() + 5);
        targetDate.setHours(now.getHours() + 12);
        targetDate.setMinutes(now.getMinutes() + 45);
        targetDate.setSeconds(now.getSeconds() + 30);
        
        const updateCountdown = () => {
            const currentTime = new Date();
            const difference = targetDate - currentTime;
            
            if (difference <= 0) {
                clearInterval(interval);
                return;
            }
            
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            
            countdownElements.days.textContent = days.toString().padStart(2, '0');
            countdownElements.hours.textContent = hours.toString().padStart(2, '0');
            countdownElements.minutes.textContent = minutes.toString().padStart(2, '0');
            countdownElements.seconds.textContent = seconds.toString().padStart(2, '0');
        };
        
        // Initial update
        updateCountdown();
        
        // Update every second
        const interval = setInterval(updateCountdown, 1000);
    }
    
    // Learning journey steps interaction
    const journeySteps = document.querySelectorAll('.journey-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const progressFill = document.querySelector('.progress-fill');
    
    if (journeySteps.length > 0 && progressSteps.length > 0 && progressFill) {
        journeySteps.forEach((step, index) => {
            step.addEventListener('click', () => {
                // Remove active class from all steps
                journeySteps.forEach(s => s.classList.remove('active'));
                progressSteps.forEach(s => s.classList.remove('active'));
                
                // Add active class to clicked step and all previous steps
                for (let i = 0; i <= index; i++) {
                    journeySteps[i].classList.add('active');
                    progressSteps[i].classList.add('active');
                }
                
                // Update progress bar
                const progressWidth = ((index + 1) / journeySteps.length) * 100;
                progressFill.style.width = `${progressWidth}%`;
            });
        });
    }
    
    // Add animation classes on page load
    setTimeout(function() {
        document.querySelectorAll('.animate-on-load').forEach(function(element, index) {
            setTimeout(function() {
                element.classList.add('show');
            }, index * 200);
        });
        
        // Initial animation for hero section elements
        const heroElements = document.querySelectorAll('.hero h1, .hero p, .hero-badge, .cta-group, .hero-image');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('active');
            }, 300 + (index * 150));
        });
    }, 300);
    
    // Add subtle hover animation to WhatsApp button
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        whatsappFloat.innerHTML = `
            <a href="https://wa.me/91XXXXXXXXXX" target="_blank" class="whatsapp-link">
                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/whatsapp.svg" alt="WhatsApp" class="whatsapp-icon">
                <span class="whatsapp-text">WhatsApp वर संपर्क करा</span>
            </a>
        `;
    }
});