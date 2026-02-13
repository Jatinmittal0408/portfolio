// ============================================
// DevOps Portfolio - JavaScript Functionality
// Particle System, Animations, & Interactions
// ============================================

// Terminal Input Handling
document.addEventListener('DOMContentLoaded', () => {
    const terminalInput = document.getElementById('terminalInput');
    if (terminalInput) {
        terminalInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                const message = this.value;
                const email = 'mittaljatin9090@gmail.com';
                const subject = 'Connect: Portfolio Inquiry';
                const body = encodeURIComponent(message);

                window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;

                // Visual feedback
                const parent = this.parentElement;
                const feedback = document.createElement('div');
                feedback.className = 'terminal-line';
                feedback.innerHTML = `<span class="terminal-prompt">></span> Opening mail client...`;
                parent.parentNode.insertBefore(feedback, parent.nextSibling);

                this.value = '';
            }
        });
    }
});

// ----- Particle Background System -----
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particles-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 80;
        this.connectionDistance = 150;

        this.init();
        this.animate();

        window.addEventListener('resize', () => this.init());
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.particles = [];

        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach((particle, i) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(0, 217, 255, 0.5)';
            this.ctx.fill();

            // Draw connections
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = particle.x - this.particles[j].x;
                const dy = particle.y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.connectionDistance) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    const opacity = (1 - distance / this.connectionDistance) * 0.3;
                    this.ctx.strokeStyle = `rgba(0, 217, 255, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

// ----- Typing Animation -----


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
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
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

// ----- Project Filtering -----
class ProjectFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.projectCards = document.querySelectorAll('.project-card');

        this.init();
    }

    init() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');

                // Update active button
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter projects
                this.projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');

                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

// ----- Image Fallback Handler -----
class ImageHandler {
    constructor() {
        this.images = [
            { id: 'profileImage', placeholder: '👨‍💻' },
            { id: 'costOptImage', placeholder: '💰' },
            { id: 'k8sOptImage', placeholder: '☸️' },
            { id: 'securityImage', placeholder: '🔐' },
            { id: 'migrationImage', placeholder: '☁️' },
            { id: 'cicdImage', placeholder: '🚀' },
            { id: 'monitoringImage', placeholder: '📊' }
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
    // Initialize particle system
    new ParticleSystem();

    // Initialize navigation
    new Navigation();

    // Initialize scroll animations
    new ScrollAnimations();

    // Initialize project filter
    new ProjectFilter();

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

// ----- Add Loading Animation -----
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
