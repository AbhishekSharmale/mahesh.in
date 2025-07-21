// Enhanced functionality for Mahesh Sharmale website

document.addEventListener('DOMContentLoaded', function() {
    // Free Test Notification functionality
    const freeTestNotification = document.querySelector('.free-test-notification');
    const notificationCloseBtn = document.querySelector('.notification-close');
    
    if (freeTestNotification && notificationCloseBtn) {
        // Check if notification was closed before
        const notificationClosed = localStorage.getItem('testNotificationClosed');
        
        if (notificationClosed) {
            freeTestNotification.style.display = 'none';
        }
        
        notificationCloseBtn.addEventListener('click', () => {
            freeTestNotification.style.opacity = '0';
            freeTestNotification.style.transform = 'translateY(100px)';
            
            setTimeout(() => {
                freeTestNotification.style.display = 'none';
            }, 500);
            
            // Save to localStorage
            localStorage.setItem('testNotificationClosed', 'true');
        });
        
        // Show notification after a delay
        setTimeout(() => {
            if (!notificationClosed) {
                freeTestNotification.style.display = 'flex';
            }
        }, 2000);
    }
    
    // Success counter animation
    const counterElement = document.querySelector('.counter-number');
    if (counterElement) {
        const finalValue = 1000;
        let currentValue = 0;
        const duration = 2000; // 2 seconds
        const increment = finalValue / (duration / 16); // 60fps
        
        const animateCounter = () => {
            if (currentValue < finalValue) {
                currentValue += increment;
                if (currentValue > finalValue) currentValue = finalValue;
                
                counterElement.textContent = Math.floor(currentValue) + '+';
                requestAnimationFrame(animateCounter);
            }
        };
        
        // Start animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counterElement);
    }
    
    // Add animated background shapes to hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection && !document.querySelector('.animated-shapes')) {
        const heroBackground = document.createElement('div');
        heroBackground.className = 'hero-background';
        
        const animatedShapes = document.createElement('div');
        animatedShapes.className = 'animated-shapes';
        
        // Create shapes
        for (let i = 1; i <= 3; i++) {
            const shape = document.createElement('div');
            shape.className = `shape shape-${i}`;
            animatedShapes.appendChild(shape);
        }
        
        heroBackground.appendChild(animatedShapes);
        heroSection.insertBefore(heroBackground, heroSection.firstChild);
    }
    
    // Add image glow effect
    const heroImage = document.querySelector('.hero-image');
    if (heroImage && !document.querySelector('.image-glow')) {
        const imageGlow = document.createElement('div');
        imageGlow.className = 'image-glow';
        heroImage.insertBefore(imageGlow, heroImage.firstChild);
    }
});