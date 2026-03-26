document.addEventListener('DOMContentLoaded', function() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1500);
    }
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
        document.querySelectorAll('.line-animated').forEach(line => {
            const lineTop = line.getBoundingClientRect().top;
            if (lineTop < windowHeight - revealPoint) {
                line.classList.add('active');
            }
        });
        document.querySelectorAll('.section-title').forEach(title => {
            const titleTop = title.getBoundingClientRect().top;
            if (titleTop < windowHeight - revealPoint) {
                title.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
    const heroSection = document.querySelector('.hero, .hero-traiteur');
    
    const parallaxScroll = () => {
        if (heroSection && window.innerWidth > 768) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            heroSection.style.backgroundPositionY = `${rate}px`;
        }
    };
    
    window.addEventListener('scroll', parallaxScroll);
    const backToTopBtn = document.getElementById('back-to-top');
    
    const toggleBackToTop = () => {
        if (backToTopBtn) {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    };
    
    window.addEventListener('scroll', toggleBackToTop);
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    const cursorGlow = document.createElement('div');
    cursorGlow.classList.add('cursor-glow');
    document.body.appendChild(cursorGlow);
    
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursorGlow.style.opacity = '1';
    });
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            document.getElementById('mobile-menu').classList.toggle('hidden');
        });
    }
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        });
    });
    const counters = document.querySelectorAll('.counter');
    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    };
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('counter') && entry.target.textContent === '0') {
                    animateCounter(entry.target);
                }
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    counters.forEach(counter => observer.observe(counter));
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    function filterMenu(category) {
        const menuItems = document.querySelectorAll('.menu-item');

        menuItems.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        const buttons = document.querySelectorAll('#menu button');
        buttons.forEach(button => {
            if (button.textContent.trim().toLowerCase() === category ||
                (category === 'all' && button.textContent.trim().toLowerCase() === 'tous')) {
                button.classList.remove('bg-white', 'text-gray-700');
                button.classList.add('bg-amber-600', 'text-white');
            } else {
                button.classList.remove('bg-amber-600', 'text-white');
                button.classList.add('bg-white', 'text-gray-700');
            }
        });
    }
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const eventType = document.getElementById('event-type').value;
            const date = document.getElementById('date').value;
            const guests = document.getElementById('guests').value;
            const message = document.getElementById('message').value;
            if (!name || !phone || !eventType) {
                alert('Veuillez remplir tous les champs obligatoires (marqués d\'un *).');
                return;
            }
            console.log('Demande de devis soumise:', {
                name,
                phone,
                email,
                eventType,
                date,
                guests,
                message
            });
            alert('Merci pour votre demande de devis ! Nous vous contacterons dans les plus brefs délais pour discuter de votre projet.');
            this.reset();
        });
    }
    const whatsappFloatBtn = document.getElementById('whatsapp-float-btn');
    const whatsappModal = document.getElementById('whatsapp-modal');
    const whatsappBackdrop = document.getElementById('whatsapp-backdrop');
    const whatsappModalClose = document.getElementById('whatsapp-modal-close');
    
    if (whatsappFloatBtn && whatsappModal) {
        
        whatsappFloatBtn.addEventListener('click', (e) => {
            e.preventDefault();
            whatsappModal.classList.remove('hidden');
        });
        
        
        whatsappBackdrop.addEventListener('click', () => {
            whatsappModal.classList.add('hidden');
        });
        
        
        whatsappModalClose.addEventListener('click', () => {
            whatsappModal.classList.add('hidden');
        });
        
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !whatsappModal.classList.contains('hidden')) {
                whatsappModal.classList.add('hidden');
            }
        });
        
        
        const messageItems = whatsappModal.querySelectorAll('.wa-message-item');
        messageItems.forEach(item => {
            item.addEventListener('click', () => {
                setTimeout(() => {
                    whatsappModal.classList.add('hidden');
                }, 100);
            });
        });
    }

});