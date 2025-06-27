// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    document.getElementById('menu-toggle').addEventListener('click', function() {
        document.getElementById('mobile-menu').classList.toggle('hidden');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            document.getElementById('mobile-menu').classList.add('hidden');
        });
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

    // Slideshow functionality
    let slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) {
      showSlides(slideIndex += n);
    }

    function currentSlide(n) {
      showSlides(slideIndex = n);
    }

    function showSlides(n) {
      let i;
      let slides = document.getElementsByClassName("mySlides");
      let dots = document.getElementsByClassName("dot");
      if (n > slides.length) {slideIndex = 1}    
      if (n < 1) {slideIndex = slides.length}
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex-1].style.display = "block";  
      dots[slideIndex-1].className += " active";
    }

    // Auto-advance slides every 25 seconds
    setInterval(function() {
      plusSlides(1);
    }, 25000);

    // Make functions globally available for onclick handlers
    window.plusSlides = plusSlides;
    window.currentSlide = currentSlide;
});

