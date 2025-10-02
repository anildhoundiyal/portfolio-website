// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initThemeToggle();
    initMobileMenu();
    initTypingAnimation();
    initSmoothScrolling();
    initScrollAnimations();
    initContactForm();
    initParticleSystem();
    initSkillAnimations();
    initGradientAnimations();
    initFloatingElements();
    initNavbarScroll();
    initHoverEffects();
});

// Theme Toggle (Dark/Light gradient variations)
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add loading animation
        themeToggle.classList.add('loading');
        
        // Animate gradient transition
        document.body.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        
        setTimeout(() => {
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            themeToggle.classList.remove('loading');
        }, 300);
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-palette');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-palette');
        }
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate menu items
        if (navMenu.classList.contains('active')) {
            animateMenuItems();
        }
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    function animateMenuItems() {
        const menuItems = document.querySelectorAll('.nav-item');
        menuItems.forEach((item, index) => {
            item.style.animation = `slideInRight 0.3s ease forwards ${index * 0.1}s`;
        });
    }
}

// Enhanced Typing Animation with Multiple Job Titles and Different Colors
function initTypingAnimation() {
    const typingText = document.getElementById('typing-text');
    const jobTitles = [
        { 
            text: 'Java Developer', 
            gradient: 'linear-gradient(135deg, #F97316, #DC2626)' 
        },
        { 
            text: 'UI/UX Designer', 
            gradient: 'linear-gradient(135deg, #8B5CF6, #EC4899)' 
        },
        { 
            text: 'Web Developer', 
            gradient: 'linear-gradient(135deg, #3B82F6, #06B6D4)' 
        },
        { 
            text: 'Full Stack Developer', 
            gradient: 'linear-gradient(135deg, #10B981, #0D9488)' 
        },
        { 
            text: 'Software Engineer', 
            gradient: 'linear-gradient(135deg, #6366F1, #8B5CF6)' 
        },
        { 
            text: 'Backend Developer', 
            gradient: 'linear-gradient(135deg, #EF4444, #F97316)' 
        }
    ];
    
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;
    
    function typeAnimation() {
        const currentTitleObj = jobTitles[titleIndex];
        const currentText = currentTitleObj.text;
        
        // Update gradient color for current job title
        typingText.style.background = currentTitleObj.gradient;
        typingText.style.webkitBackgroundClip = 'text';
        typingText.style.backgroundClip = 'text';
        typingText.style.webkitTextFillColor = 'transparent';
        
        // Add subtle glow effect matching the gradient
        typingText.style.filter = 'drop-shadow(0 0 8px rgba(124, 58, 237, 0.3))';
        
        if (isWaiting) {
            setTimeout(() => {
                isWaiting = false;
                isDeleting = true;
                typeAnimation();
            }, 2500); // Wait 2.5 seconds before starting to delete
            return;
        }
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % jobTitles.length;
            }
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentText.length) {
                isWaiting = true;
            }
        }
        
        // Variable typing speed for more natural feel
        const speed = isDeleting ? 
            (Math.random() * 50 + 75) : // 75-125ms for deleting
            (Math.random() * 100 + 100); // 100-200ms for typing
            
        setTimeout(typeAnimation, speed);
    }
    
    // Start the animation
    typeAnimation();
}

// Fixed Smooth Scrolling Navigation with Active State
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerOffset = 100;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navToggle = document.getElementById('nav-toggle');
                const navMenu = document.getElementById('nav-menu');
                if (navMenu.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
                
                updateActiveNavLink(targetId);
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', throttle(updateActiveNavLinkOnScroll, 100));
    
    function updateActiveNavLink(activeId) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    }
    
    function updateActiveNavLinkOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                updateActiveNavLink(sectionId);
            }
        });
    }
}

// Advanced Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Fade in animations
    const fadeElements = document.querySelectorAll('.hobby-card, .skill-card, .project-card, .contact-card');
    fadeElements.forEach(el => el.classList.add('fade-in'));
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(el => fadeObserver.observe(el));
    
    // Staggered animations for grids
    const gridContainers = document.querySelectorAll('.hobbies-grid, .skills-grid, .projects-grid');
    gridContainers.forEach(container => {
        const gridObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll('.hobby-card, .skill-card, .project-card');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);
        
        gridObserver.observe(container);
    });
}

// Contact Form with Enhanced Feedback
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const message = formData.get('message').trim();
        
        // Validate form
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Animate submit button
        const submitBtn = contactForm.querySelector('.btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.style.background = 'linear-gradient(135deg, #10B981, #06B6D4)';
        
        // Create Gmail compose URL
        const gmailSubject = `Portfolio Contact from ${name}`;
        const gmailBody = `Hello Anil,\n\nYou have received a new message from your portfolio website:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nBest regards,\n${name}`;
        
        const gmailUrl = `https://mail.google.com/mail/u/0/?view=cm&tf=1&to=anildhoundiyal12345@gmail.com&su=${encodeURIComponent(gmailSubject)}&body=${encodeURIComponent(gmailBody)}`;
        
        setTimeout(() => {
            window.open(gmailUrl, '_blank');
            showNotification('Gmail opened with your message! Thank you for reaching out.', 'success');
            
            // Reset form and button
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
        }, 1000);
    });
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Enhanced Particle System for Hero Background
function initParticleSystem() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    // Clear existing particles
    particlesContainer.innerHTML = '';
    
    const particleCount = window.innerWidth > 768 ? 80 : 40;
    
    // Add particle animation CSS if not exists
    if (!document.getElementById('particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            .particle {
                position: absolute;
                border-radius: 50%;
                pointer-events: none;
                opacity: 0;
            }
            
            @keyframes particleFloat {
                0% {
                    transform: translateY(100vh) translateX(0px) rotate(0deg) scale(0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                    transform: translateY(90vh) translateX(20px) rotate(36deg) scale(1);
                }
                90% {
                    opacity: 1;
                    transform: translateY(10vh) translateX(-20px) rotate(324deg) scale(1);
                }
                100% {
                    transform: translateY(-10vh) translateX(0px) rotate(360deg) scale(0);
                    opacity: 0;
                }
            }
            
            @keyframes particleGlow {
                0%, 100% {
                    box-shadow: 0 0 5px rgba(124, 58, 237, 0.3);
                }
                50% {
                    box-shadow: 0 0 20px rgba(124, 58, 237, 0.8), 0 0 30px rgba(59, 130, 246, 0.4);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(i);
    }
    
    function createParticle(index) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 6 + 2;
        const x = Math.random() * window.innerWidth;
        const delay = Math.random() * 20;
        const duration = 15 + Math.random() * 10;
        
        // Enhanced color palette matching the new job title gradients
        const colors = [
            'rgba(249, 115, 22, 0.6)', // Java Developer orange
            'rgba(139, 92, 246, 0.6)', // UI/UX Designer purple
            'rgba(59, 130, 246, 0.6)', // Web Developer blue
            'rgba(16, 185, 129, 0.6)', // Full Stack green
            'rgba(99, 102, 241, 0.6)', // Software Engineer indigo
            'rgba(239, 68, 68, 0.6)'   // Backend Developer red
        ];
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            left: ${x}px;
            top: 100vh;
            animation: 
                particleFloat ${duration}s infinite linear ${-delay}s,
                particleGlow 3s infinite ease-in-out ${-delay * 0.5}s;
        `;
        
        particlesContainer.appendChild(particle);
        
        // Remove and recreate particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                createParticle(index);
            }
        }, (duration - delay) * 1000);
    }
}

// Skill Progress Circle Animations
function initSkillAnimations() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressCircle = entry.target.querySelector('.progress-circle');
                const progressBar = entry.target.querySelector('.progress-bar');
                const progressText = entry.target.querySelector('.progress-text');
                
                if (progressCircle && progressBar) {
                    const progress = progressCircle.getAttribute('data-progress');
                    const circumference = 2 * Math.PI * 45; // radius = 45
                    const offset = circumference - (progress / 100) * circumference;
                    
                    // Animate progress bar
                    setTimeout(() => {
                        progressBar.style.strokeDashoffset = offset;
                    }, 500);
                    
                    // Animate progress text
                    animateProgressText(progressText, progress);
                }
            }
        });
    }, { threshold: 0.5 });
    
    skillCards.forEach(card => skillObserver.observe(card));
    
    function animateProgressText(element, target) {
        let current = 0;
        const increment = target / 50; // 50 steps for smooth animation
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.round(current) + '%';
        }, 20);
    }
}

// Gradient Background Animations
function initGradientAnimations() {
    const gradientElements = document.querySelectorAll('[class*="gradient-bg"]');
    
    gradientElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = element.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            element.style.backgroundPosition = `${x}% ${y}%`;
        });
        
        element.addEventListener('mouseleave', function() {
            element.style.backgroundPosition = '50% 50%';
        });
    });
}

// Floating Elements Animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.float-element');
    
    floatingElements.forEach((element, index) => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.boxShadow = '0 0 20px rgba(124, 58, 237, 0.6)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '';
        });
    });
}

// Enhanced Hover Effects
function initHoverEffects() {
    // Hobby cards interactive effects
    const hobbyCards = document.querySelectorAll('.hobby-card');
    hobbyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.hobby-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.3) rotateY(180deg)';
                icon.style.textShadow = '0 0 20px rgba(124, 58, 237, 0.8)';
            }
            
            // Enhanced glow effect
            this.style.boxShadow = '0 0 40px rgba(124, 58, 237, 0.6), 0 0 80px rgba(59, 130, 246, 0.3)';
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.hobby-icon i');
            if (icon) {
                icon.style.transform = 'scale(1) rotateY(0deg)';
                icon.style.textShadow = '';
            }
            this.style.boxShadow = '';
            this.style.transform = '';
        });
    });
    
    // Project cards enhanced hover
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.project-overlay');
            const techTags = this.querySelectorAll('.tech-tag');
            const icon = this.querySelector('.project-icon i');
            
            if (overlay) {
                overlay.style.opacity = '0.95';
            }
            
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.textShadow = '0 0 30px rgba(255, 255, 255, 0.8)';
            }
            
            techTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'scale(1.1) translateY(-3px)';
                    tag.style.boxShadow = '0 8px 25px rgba(124, 58, 237, 0.4)';
                    tag.style.background = 'rgba(255, 255, 255, 0.2)';
                }, index * 50);
            });
            
            this.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.project-overlay');
            const techTags = this.querySelectorAll('.tech-tag');
            const icon = this.querySelector('.project-icon i');
            
            if (overlay) {
                overlay.style.opacity = '0.8';
            }
            
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.textShadow = '';
            }
            
            techTags.forEach(tag => {
                tag.style.transform = 'scale(1) translateY(0)';
                tag.style.boxShadow = '';
                tag.style.background = '';
            });
            
            this.style.boxShadow = '';
        });
    });
    
    // Enhanced button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            if (this.classList.contains('gradient-btn')) {
                this.style.boxShadow = '0 15px 35px rgba(124, 58, 237, 0.6), 0 5px 15px rgba(59, 130, 246, 0.4)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

// Enhanced Navbar Scroll Effects
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.scrollY;
        
        if (scrolled > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.3)';
            navbar.style.backdropFilter = 'blur(25px)';
            navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.1)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = 'none';
        }
        
        // Parallax effect for hero elements
        if (scrolled < window.innerHeight) {
            const heroContent = document.querySelector('.hero-content');
            const floatingShapes = document.querySelectorAll('.floating-shape');
            
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
            
            floatingShapes.forEach((shape, index) => {
                const speed = 0.1 + (index * 0.05);
                shape.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }
    }, 16));
}

// Enhanced Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    const gradients = {
        success: 'linear-gradient(135deg, #10B981, #06B6D4)',
        error: 'linear-gradient(135deg, #EF4444, #DC2626)',
        info: 'linear-gradient(135deg, #3B82F6, #8B5CF6)'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="fas ${type === 'success' ? 'fa-check' : type === 'error' ? 'fa-exclamation-triangle' : 'fa-info'}"></i>
            </div>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${gradients[type]};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 15px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 1rem;
    `;
    
    const icon = notification.querySelector('.notification-icon');
    icon.style.cssText = `
        font-size: 1.2rem;
        opacity: 0.9;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        opacity: 0.7;
        transition: opacity 0.2s ease;
    `;
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.opacity = '1';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.opacity = '0.7';
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // Auto remove
    const autoRemove = setTimeout(() => {
        removeNotification();
    }, 5000);
    
    // Close button functionality
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeNotification();
    });
    
    function removeNotification() {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    }
}

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    // Toggle theme with Ctrl/Cmd + Shift + T
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        document.getElementById('theme-toggle').click();
    }
    
    // Close mobile menu with Escape
    if (e.key === 'Escape') {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Utility Functions
function throttle(func, wait) {
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

function debounce(func, wait) {
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

// Mouse Following Gradient Effect
document.addEventListener('mousemove', throttle(function(e) {
    let cursor = document.querySelector('.cursor-glow');
    if (!cursor) {
        cursor = document.createElement('div');
        cursor.className = 'cursor-glow';
        cursor.style.cssText = `
            position: fixed;
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            transition: all 0.1s ease;
            mix-blend-mode: screen;
        `;
        document.body.appendChild(cursor);
    }
    
    cursor.style.left = (e.clientX - 150) + 'px';
    cursor.style.top = (e.clientY - 150) + 'px';
}, 16));

// Performance optimization
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (reduceMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-normal', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');
}

// Resize handler for responsive adjustments
let resizeTimer;
window.addEventListener('resize', debounce(() => {
    const isMobile = window.innerWidth <= 768;
    const navMenu = document.getElementById('nav-menu');
    
    if (!isMobile && navMenu.classList.contains('active')) {
        document.getElementById('nav-toggle').classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Reinitialize particles on resize
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        initParticleSystem();
    }
}, 250));

// Loading state management
document.addEventListener('DOMContentLoaded', function() {
    // Add loaded class for CSS animations
    setTimeout(() => {
        document.body.classList.add('loaded');
        
        // Trigger hero animations
        const heroElements = document.querySelectorAll('.animate-up');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 500);
});

// Error handling for external resources
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'LINK' && e.target.rel === 'stylesheet') {
        console.warn('Failed to load stylesheet:', e.target.href);
    }
});

console.log('🎨 Java Developer Portfolio Loaded Successfully! ✨');
