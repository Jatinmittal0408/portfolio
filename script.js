// ============================================
// DevOps Portfolio - JavaScript Functionality
// Particle System, Animations, & Interactions
// ============================================

// ----- Navigation Functionality -----
class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.menuToggle = document.getElementById('menuToggle');
        this.navMenu = document.getElementById('navMenu');
        this.sections = document.querySelectorAll('section[id]');

        this.init();
    }

    init() {
        // Scroll event for navbar background
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }

            this.highlightActiveSection();
        });

        // Smooth scroll for nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });

                    // Close mobile menu if open
                    this.navMenu.classList.remove('active');
                }
            });
        });

        // Mobile menu toggle
        this.menuToggle.addEventListener('click', () => {
            this.navMenu.classList.toggle('active');
        });
    }

    highlightActiveSection() {
        let current = '';

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        this.navLinks.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }
}

// ----- Scroll Animations -----
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.fade-in');
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        this.init();
    }

    init() {
        this.elements.forEach(el => this.observer.observe(el));
    }
}

// ----- Image Fallback Handler -----
class ImageHandler {
    constructor() {
        this.images = [
            { id: 'profileImage', placeholder: '👨‍💻' },
            { id: 'goldenImage', placeholder: '🔐' },
            { id: 'wazuhImage', placeholder: '🛡️' },
            { id: 'costOptImage', placeholder: '💰' },
            { id: 'terraformImage', placeholder: '☸️' },
            { id: 'argocdImage', placeholder: '🚀' },
            { id: 'cicdImage', placeholder: '⚙️' },
            { id: 'k8sMonitoringImage', placeholder: '📊' }
        ];

        this.init();
    }

    init() {
        this.images.forEach(({ id, placeholder }) => {
            const img = document.getElementById(id);
            if (img) {
                img.addEventListener('error', () => {
                    // Create a placeholder with emoji
                    const parent = img.parentElement;
                    const placeholderDiv = document.createElement('div');
                    placeholderDiv.style.cssText = `
                        width: 100%;
                        height: ${img.classList.contains('project-image') ? '200px' : '400px'};
                        background: linear-gradient(135deg, rgba(0, 217, 255, 0.1), rgba(167, 139, 250, 0.1));
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 4rem;
                        border-radius: ${img.classList.contains('project-image') ? '0' : '1.5rem'};
                    `;
                    placeholderDiv.textContent = placeholder;
                    parent.replaceChild(placeholderDiv, img);
                });
            }
        });
    }
}

// ----- Initialize Everything -----
document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation
    new Navigation();

    // Initialize scroll animations
    new ScrollAnimations();

    // Initialize image handlers
    new ImageHandler();
});

// ----- Smooth Scroll Behavior for All Anchor Links -----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ----- Performance Optimization: Debounce Scroll Events -----
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

// ----- Intro Overlay & Loading -----
window.addEventListener('load', () => {
    const overlay = document.getElementById('intro-overlay');

    if (overlay) {
        setTimeout(() => {
            overlay.classList.add('intro-hidden');
        }, 900);

        setTimeout(() => {
            overlay.style.display = 'none';
        }, 1800);
    }
});
