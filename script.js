// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            document.getElementById('mobile-menu').classList.toggle('hidden');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }

            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // Animation des compteurs
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

    // Observer pour les animations au scroll
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animer les compteurs
                if (entry.target.classList.contains('counter') && entry.target.textContent === '0') {
                    animateCounter(entry.target);
                }

                // Ajouter une classe pour les animations
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);

    // Observer les compteurs
    counters.forEach(counter => observer.observe(counter));

    // Header shadow on scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Menu filtering
    function filterMenu(category) {
        const menuItems = document.querySelectorAll('.menu-item');

        menuItems.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });

        // Update active button styling
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

    // Form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const eventType = document.getElementById('event-type').value;
            const date = document.getElementById('date').value;
            const guests = document.getElementById('guests').value;
            const message = document.getElementById('message').value;

            // Validation basique
            if (!name || !phone || !eventType) {
                alert('Veuillez remplir tous les champs obligatoires (marqués d\'un *).');
                return;
            }

            // Here you would typically send the data to a server
            console.log('Demande de devis soumise:', {
                name,
                phone,
                email,
                eventType,
                date,
                guests,
                message
            });

            // Show success message
            alert('Merci pour votre demande de devis ! Nous vous contacterons dans les plus brefs délais pour discuter de votre projet.');

            // Reset form
            this.reset();
        });
    }

});
