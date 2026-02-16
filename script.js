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

    // Modern Carousel Implementation
    const carousel = document.querySelector('.modern-carousel');
    if (carousel) {
        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(track.querySelectorAll('.carousel-slide'));
        const dotsContainer = carousel.querySelector('.carousel-dots');
        const prevBtn = carousel.querySelector('.carousel-btn-prev');
        const nextBtn = carousel.querySelector('.carousel-btn-next');
        const autoplayBtn = carousel.querySelector('.carousel-autoplay-toggle');

        if (track && slides.length > 0) {
            let currentIndex = 0;
            let isAutoPlaying = true;
            let autoplayInterval = null;
            let startX = 0;
            let currentX = 0;
            let isDragging = false;

            // Create dots
            function createDots() {
                slides.forEach((_, index) => {
                    const dot = document.createElement('button');
                    dot.classList.add('carousel-dot');
                    dot.setAttribute('aria-label', `Aller à la diapositive ${index + 1}`);
                    if (index === 0) dot.classList.add('active');
                    dot.addEventListener('click', () => goToSlide(index));
                    dotsContainer.appendChild(dot);
                });
            }

            // Update dots
            function updateDots() {
                const dots = Array.from(dotsContainer.querySelectorAll('.carousel-dot'));
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentIndex);
                });
            }

            // Go to specific slide
            function goToSlide(index) {
                if (index < 0) index = slides.length - 1;
                if (index >= slides.length) index = 0;

                currentIndex = index;
                const translateX = -currentIndex * 100;
                track.style.transform = `translate3d(${translateX}%, 0, 0)`;
                updateDots();
            }

            // Next slide
            function nextSlide() {
                goToSlide(currentIndex + 1);
            }

            // Previous slide
            function prevSlide() {
                goToSlide(currentIndex - 1);
            }

            // Auto-play functionality
            function startAutoplay() {
                if (autoplayInterval) return;
                isAutoPlaying = true;
                autoplayBtn.innerHTML = '<i class="fas fa-pause"></i>';
                autoplayBtn.classList.remove('paused');
                autoplayInterval = setInterval(nextSlide, 4000);
            }

            function stopAutoplay() {
                if (autoplayInterval) {
                    clearInterval(autoplayInterval);
                    autoplayInterval = null;
                }
                isAutoPlaying = false;
                autoplayBtn.innerHTML = '<i class="fas fa-play"></i>';
                autoplayBtn.classList.add('paused');
            }

            function toggleAutoplay() {
                if (isAutoPlaying) {
                    stopAutoplay();
                } else {
                    startAutoplay();
                }
            }

            // Touch/Mouse events for swipe
            function handleStart(e) {
                isDragging = true;
                startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
                track.style.transition = 'none';
            }

            function handleMove(e) {
                if (!isDragging) return;
                e.preventDefault();
                currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
                const diff = currentX - startX;
                const translateX = -currentIndex * 100 + (diff / track.offsetWidth * 100);
                track.style.transform = `translate3d(${translateX}%, 0, 0)`;
            }

            function handleEnd(e) {
                if (!isDragging) return;
                isDragging = false;
                track.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

                const diff = currentX - startX;
                const threshold = track.offsetWidth * 0.15;

                if (diff > threshold) {
                    prevSlide();
                } else if (diff < -threshold) {
                    nextSlide();
                } else {
                    goToSlide(currentIndex);
                }
            }

            // Keyboard navigation
            function handleKeyboard(e) {
                if (e.key === 'ArrowLeft') {
                    prevSlide();
                    stopAutoplay();
                } else if (e.key === 'ArrowRight') {
                    nextSlide();
                    stopAutoplay();
                }
            }

            // Event listeners setup
            createDots();

            if (prevBtn) prevBtn.addEventListener('click', () => {
                prevSlide();
                stopAutoplay();
            });

            if (nextBtn) nextBtn.addEventListener('click', () => {
                nextSlide();
                stopAutoplay();
            });

            if (autoplayBtn) autoplayBtn.addEventListener('click', toggleAutoplay);

            // Touch events
            track.addEventListener('touchstart', handleStart, { passive: true });
            track.addEventListener('touchmove', handleMove, { passive: false });
            track.addEventListener('touchend', handleEnd, { passive: true });

            // Mouse events
            track.addEventListener('mousedown', handleStart);
            track.addEventListener('mousemove', handleMove);
            track.addEventListener('mouseup', handleEnd);
            track.addEventListener('mouseleave', () => {
                if (isDragging) handleEnd();
            });

            // Keyboard navigation
            document.addEventListener('keydown', handleKeyboard);

            // Pause autoplay on hover
            carousel.addEventListener('mouseenter', () => {
                if (isAutoPlaying) {
                    clearInterval(autoplayInterval);
                    autoplayInterval = null;
                }
            });

            carousel.addEventListener('mouseleave', () => {
                if (isAutoPlaying && !autoplayInterval) {
                    autoplayInterval = setInterval(nextSlide, 4000);
                }
            });

            // Start autoplay
            startAutoplay();

            // Pause when tab is not visible
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    if (autoplayInterval) {
                        clearInterval(autoplayInterval);
                        autoplayInterval = null;
                    }
                } else if (isAutoPlaying) {
                    startAutoplay();
                }
            });
        }
    }
});
