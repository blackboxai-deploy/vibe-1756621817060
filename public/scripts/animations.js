// LUMIÈRE - Animations and Interactive Effects

class LumiereAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupParallaxEffects();
        this.setupHoverEffects();
        this.setupSmoothScrolling();
        this.setupLoadingAnimations();
    }

    setupScrollAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll(
            '.section-header, .product-card, .feature, .contact-item, .about-text'
        );
        
        animateElements.forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }

    setupParallaxEffects() {
        // Subtle parallax for hero image
        const heroImage = document.querySelector('.hero-img');
        
        if (heroImage) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                
                if (rate > -100) { // Limit the effect
                    heroImage.style.transform = `translateY(${rate}px)`;
                }
            });
        }

        // Parallax for about section image
        const aboutImage = document.querySelector('.about-img');
        
        if (aboutImage) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const aboutSection = document.getElementById('about');
                
                if (aboutSection) {
                    const aboutOffset = aboutSection.offsetTop;
                    const rate = (scrolled - aboutOffset) * -0.3;
                    
                    if (scrolled > aboutOffset - window.innerHeight && rate > -200) {
                        aboutImage.style.transform = `translateY(${rate}px)`;
                    }
                }
            });
        }
    }

    setupHoverEffects() {
        // Product card hover effects
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const image = card.querySelector('.product-img');
            const info = card.querySelector('.product-info');
            
            card.addEventListener('mouseenter', () => {
                if (image) {
                    image.style.transform = 'scale(1.05)';
                }
                if (info) {
                    info.style.transform = 'translateY(-5px)';
                }
                card.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', () => {
                if (image) {
                    image.style.transform = 'scale(1)';
                }
                if (info) {
                    info.style.transform = 'translateY(0)';
                }
                card.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
            });
        });

        // Button hover effects
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
            });
        });

        // Navigation hover effects
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateY(-2px)';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateY(0)';
            });
        });
    }

    setupSmoothScrolling() {
        // Smooth scroll for navigation links
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupLoadingAnimations() {
        // Stagger animation for product grid
        const productGrid = document.getElementById('productGrid');
        
        if (productGrid) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const cards = entry.target.querySelectorAll('.product-card');
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('fade-in-up');
                            }, index * 100);
                        });
                    }
                });
            });
            
            observer.observe(productGrid);
        }

        // Header scroll effect
        this.setupHeaderScrollEffect();
        
        // Image lazy loading with fade in
        this.setupImageLazyLoading();
    }

    setupHeaderScrollEffect() {
        const header = document.querySelector('.header');
        let lastScrollTop = 0;
        
        if (header) {
            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollTop > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                
                // Hide header when scrolling down, show when scrolling up
                if (scrollTop > lastScrollTop && scrollTop > 200) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
                
                lastScrollTop = scrollTop;
            });
        }
    }

    setupImageLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    img.addEventListener('load', () => {
                        img.classList.add('image-loaded');
                    });
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            img.classList.add('image-loading');
            imageObserver.observe(img);
        });
    }

    // Utility methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let lastFunc;
        let lastRan;
        return function() {
            const context = this;
            const args = arguments;
            if (!lastRan) {
                func.apply(context, args);
                lastRan = Date.now();
            } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(function() {
                    if ((Date.now() - lastRan) >= limit) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    }
                }, limit - (Date.now() - lastRan));
            }
        }
    }

    // Public methods
    animateElement(element, animation) {
        if (element) {
            element.classList.add(animation);
        }
    }

    removeAnimation(element, animation) {
        if (element) {
            element.classList.remove(animation);
        }
    }

    fadeIn(element, duration = 300) {
        if (element) {
            element.style.opacity = '0';
            element.style.display = 'block';
            element.style.transition = `opacity ${duration}ms ease-in-out`;
            
            setTimeout(() => {
                element.style.opacity = '1';
            }, 10);
        }
    }

    fadeOut(element, duration = 300) {
        if (element) {
            element.style.opacity = '1';
            element.style.transition = `opacity ${duration}ms ease-in-out`;
            element.style.opacity = '0';
            
            setTimeout(() => {
                element.style.display = 'none';
            }, duration);
        }
    }

    slideUp(element, duration = 300) {
        if (element) {
            element.style.height = element.offsetHeight + 'px';
            element.style.transition = `height ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out`;
            element.style.height = '0';
            element.style.opacity = '0';
            element.style.overflow = 'hidden';
            
            setTimeout(() => {
                element.style.display = 'none';
            }, duration);
        }
    }

    slideDown(element, duration = 300) {
        if (element) {
            element.style.display = 'block';
            element.style.height = '0';
            element.style.opacity = '0';
            element.style.overflow = 'hidden';
            
            const height = element.scrollHeight;
            element.style.transition = `height ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out`;
            
            setTimeout(() => {
                element.style.height = height + 'px';
                element.style.opacity = '1';
            }, 10);
            
            setTimeout(() => {
                element.style.height = '';
                element.style.overflow = '';
                element.style.transition = '';
            }, duration);
        }
    }
}

// Additional CSS animations via JavaScript
function addCustomStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Animation Classes */
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .image-loading {
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
        }
        
        .image-loaded {
            opacity: 1;
        }
        
        .header.scrolled {
            background-color: rgba(255, 255, 255, 0.98);
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
            .animate-on-scroll,
            .fade-in-up,
            .image-loading,
            .header {
                transition: none !important;
                animation: none !important;
            }
        }
        
        /* Performance optimization */
        .product-card,
        .hero-img,
        .about-img {
            will-change: transform;
        }
        
        .product-card:hover {
            will-change: auto;
        }
    `;
    document.head.appendChild(style);
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    addCustomStyles();
    window.lumiereAnimations = new LumiereAnimations();
    console.log('LUMIÈRE Animations initialized');
});

// Handle resize events
window.addEventListener('resize', 
    window.lumiereAnimations ? 
    window.lumiereAnimations.debounce(() => {
        // Re-calculate positions on resize
        console.log('Window resized, recalculating animations');
    }, 250) : 
    () => {}
);

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LumiereAnimations;
}