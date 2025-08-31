// LUMIÈRE - Main JavaScript Functions

// Global utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Account for fixed header
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Mobile navigation handling
class NavigationManager {
    constructor() {
        this.navToggle = document.querySelector('.nav-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        if (this.navToggle && this.navMenu) {
            this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Close mobile menu when clicking on links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    this.closeMobileMenu();
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navToggle.contains(e.target) && !this.navMenu.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        this.navToggle.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    closeMobileMenu() {
        this.navToggle.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
}

// Contact form handling
class ContactFormManager {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());

        // Validate form
        if (this.validateForm(data)) {
            this.showSuccess();
            this.form.reset();
            
            // Track form submission
            this.trackFormSubmission(data);
            
            // In a real application, you would send this data to your server
            console.log('Form submission:', data);
        }
    }

    validateForm(data) {
        const errors = [];

        // Required fields validation
        if (!data.name || data.name.trim().length < 2) {
            errors.push('Please enter your full name');
        }

        if (!data.email || !this.isValidEmail(data.email)) {
            errors.push('Please enter a valid email address');
        }

        if (!data.service) {
            errors.push('Please select a service');
        }

        // Display errors or return success
        if (errors.length > 0) {
            this.showErrors(errors);
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showErrors(errors) {
        // Remove existing error messages
        this.clearMessages();

        // Create error container
        const errorContainer = document.createElement('div');
        errorContainer.className = 'form-errors';
        errorContainer.innerHTML = `
            <div class="error-message">
                <p><strong>Please correct the following:</strong></p>
                <ul>
                    ${errors.map(error => `<li>${error}</li>`).join('')}
                </ul>
            </div>
        `;

        // Insert before form
        this.form.parentNode.insertBefore(errorContainer, this.form);

        // Scroll to errors
        errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    showSuccess() {
        // Remove existing messages
        this.clearMessages();

        // Create success message
        const successContainer = document.createElement('div');
        successContainer.className = 'form-success';
        successContainer.innerHTML = `
            <div class="success-message">
                <p><strong>Thank you!</strong> Your consultation request has been received. We'll contact you within 24 hours to schedule your appointment.</p>
            </div>
        `;

        // Insert before form
        this.form.parentNode.insertBefore(successContainer, this.form);

        // Scroll to success message
        successContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Remove success message after 5 seconds
        setTimeout(() => {
            successContainer.remove();
        }, 5000);
    }

    clearMessages() {
        const existingErrors = document.querySelector('.form-errors');
        const existingSuccess = document.querySelector('.form-success');
        
        if (existingErrors) existingErrors.remove();
        if (existingSuccess) existingSuccess.remove();
    }

    trackFormSubmission(data) {
        // Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                event_category: 'contact',
                event_label: data.service,
                value: 1
            });
        }
    }
}

// Page loading and initialization
class PageManager {
    constructor() {
        this.init();
    }

    init() {
        // Show page after initial load
        document.body.classList.add('loaded');

        // Initialize components
        this.setupLazyLoading();
        this.setupScrollProgress();
        this.setupBackToTop();
        this.setupKeyboardNavigation();
        this.setupAnalytics();
    }

    setupLazyLoading() {
        // Basic lazy loading for images without native support
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
            });
        }
    }

    setupScrollProgress() {
        // Scroll progress indicator
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
        document.body.appendChild(progressBar);

        const progressBarFill = progressBar.querySelector('.scroll-progress-bar');

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            progressBarFill.style.width = scrollPercent + '%';
        });
    }

    setupBackToTop() {
        // Back to top button
        const backToTop = document.createElement('button');
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '↑';
        backToTop.setAttribute('aria-label', 'Back to top');
        document.body.appendChild(backToTop);

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
    }

    setupKeyboardNavigation() {
        // Enhanced keyboard navigation
        document.addEventListener('keydown', (e) => {
            // Close modal with Escape
            if (e.key === 'Escape') {
                const modal = document.getElementById('productModal');
                if (modal && modal.style.display === 'block') {
                    if (window.productManager) {
                        window.productManager.closeProductModal();
                    }
                }
                
                // Close chat with Escape
                if (window.lumiereChatbot && window.lumiereChatbot.isOpen) {
                    window.lumiereChatbot.closeChat();
                }
            }

            // Navigate through products with arrow keys
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                const focusedElement = document.activeElement;
                if (focusedElement.classList.contains('product-card')) {
                    const cards = Array.from(document.querySelectorAll('.product-card'));
                    const currentIndex = cards.indexOf(focusedElement);
                    
                    let newIndex;
                    if (e.key === 'ArrowRight') {
                        newIndex = (currentIndex + 1) % cards.length;
                    } else {
                        newIndex = (currentIndex - 1 + cards.length) % cards.length;
                    }
                    
                    cards[newIndex].focus();
                    e.preventDefault();
                }
            }
        });
    }

    setupAnalytics() {
        // Basic analytics tracking
        this.trackPageLoad();
        this.trackUserInteractions();
        this.trackScrollDepth();
    }

    trackPageLoad() {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_view', {
                page_title: document.title,
                page_location: window.location.href
            });
        }
    }

    trackUserInteractions() {
        // Track button clicks
        const buttons = document.querySelectorAll('button, .btn-primary, .btn-secondary');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'click', {
                        event_category: 'button',
                        event_label: button.textContent || button.getAttribute('aria-label') || 'unknown'
                    });
                }
            });
        });

        // Track external links
        const externalLinks = document.querySelectorAll('a[href^="http"]');
        externalLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'click', {
                        event_category: 'external_link',
                        event_label: link.href
                    });
                }
            });
        });
    }

    trackScrollDepth() {
        let maxScroll = 0;
        const milestones = [25, 50, 75, 100];
        const tracked = [];

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = Math.round((scrollTop / docHeight) * 100);
            
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                
                milestones.forEach(milestone => {
                    if (scrollPercent >= milestone && !tracked.includes(milestone)) {
                        tracked.push(milestone);
                        
                        if (typeof gtag !== 'undefined') {
                            gtag('event', 'scroll', {
                                event_category: 'engagement',
                                event_label: `${milestone}%`,
                                value: milestone
                            });
                        }
                    }
                });
            }
        });
    }
}

// Error handling and recovery
class ErrorManager {
    constructor() {
        this.setupErrorHandling();
    }

    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('JavaScript Error:', e.error);
            this.logError('javascript', e.error.message, e.filename, e.lineno);
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled Promise Rejection:', e.reason);
            this.logError('promise', e.reason);
        });
    }

    logError(type, message, filename = '', lineno = 0) {
        // In a real application, you would send this to your error tracking service
        const errorData = {
            type,
            message,
            filename,
            lineno,
            userAgent: navigator.userAgent,
            url: window.location.href,
            timestamp: new Date().toISOString()
        };

        console.log('Error logged:', errorData);

        // Track error with analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'exception', {
                description: message,
                fatal: false
            });
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize managers
    window.navigationManager = new NavigationManager();
    window.contactFormManager = new ContactFormManager();
    window.pageManager = new PageManager();
    window.errorManager = new ErrorManager();

    console.log('LUMIÈRE Main JavaScript initialized');

    // Add custom styles for new components
    addMainStyles();
});

// Custom styles for main components
function addMainStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Loading state */
        body:not(.loaded) {
            overflow: hidden;
        }

        body:not(.loaded) .main {
            opacity: 0;
        }

        body.loaded .main {
            opacity: 1;
            transition: opacity 0.5s ease-in-out;
        }

        /* Menu open state */
        body.menu-open {
            overflow: hidden;
        }

        /* Scroll progress */
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background-color: rgba(212, 165, 116, 0.2);
            z-index: 9999;
        }

        .scroll-progress-bar {
            height: 100%;
            background: linear-gradient(90deg, var(--color-primary-gold), var(--color-light-gold));
            width: 0%;
            transition: width 0.1s ease-out;
        }

        /* Back to top */
        .back-to-top {
            position: fixed;
            bottom: 100px;
            right: var(--spacing-lg);
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, var(--color-primary-gold), var(--color-light-gold));
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.2rem;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
        }

        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }

        .back-to-top:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(212, 165, 116, 0.3);
        }

        /* Form messages */
        .form-errors, .form-success {
            margin-bottom: var(--spacing-lg);
            padding: var(--spacing-md);
            border-radius: var(--border-radius);
            animation: slideInDown 0.3s ease-out;
        }

        .form-errors {
            background-color: #fee;
            border: 1px solid #fcc;
            color: #c66;
        }

        .form-success {
            background-color: #efe;
            border: 1px solid #cfc;
            color: #6c6;
        }

        .error-message, .success-message {
            margin: 0;
        }

        .error-message ul {
            margin: var(--spacing-xs) 0 0 var(--spacing-md);
            padding: 0;
        }

        @keyframes slideInDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Product cards focus */
        .product-card:focus {
            outline: 2px solid var(--color-primary-gold);
            outline-offset: 2px;
        }

        /* Mobile responsiveness for new elements */
        @media (max-width: 768px) {
            .back-to-top {
                bottom: 140px;
                right: var(--spacing-sm);
                width: 45px;
                height: 45px;
                font-size: 1.1rem;
            }
        }
    `;
    document.head.appendChild(style);
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        NavigationManager,
        ContactFormManager,
        PageManager,
        ErrorManager,
        scrollToSection
    };
}