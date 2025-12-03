/*
   Sweet Delights Bakery - JavaScript File
   This file contains all the interactive functionality for our website
*/

// Wait for the page to load completely before running JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE MENU TOGGLE =====
    // This makes the navigation menu work on mobile devices
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // ===== IMAGE SLIDER FUNCTIONALITY =====
    // Get all the slider elements
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Only run slider code if slider exists on the page
    if (slides.length > 0) {
        let currentSlide = 0; // Start with the first slide
        
        // Function to show a specific slide
        function showSlide(slideIndex) {
            // Hide all slides first
            slides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            // If we go past the last slide, go back to the first one
            if (slideIndex >= slides.length) {
                currentSlide = 0;
            }
            // If we go before the first slide, go to the last one
            else if (slideIndex < 0) {
                currentSlide = slides.length - 1;
            }
            else {
                currentSlide = slideIndex;
            }
            
            // Show the current slide
            slides[currentSlide].classList.add('active');
        }
        
        // Function to go to the next slide
        function nextSlide() {
            showSlide(currentSlide + 1);
        }
        
        // Function to go to the previous slide
        function prevSlide() {
            showSlide(currentSlide - 1);
        }
        
        // Add click events to the buttons
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }
        
        // Auto-slide every 5 seconds
        setInterval(nextSlide, 5000);
    }

    // ===== CONTACT FORM VALIDATION =====
    // Get the contact form
    const contactForm = document.getElementById('contactForm');
    
    // Only run form validation if the form exists on the page
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Stop the form from submitting normally
            
            // Clear any previous error messages
            clearErrors();
            
            // Get all form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            
            let isValid = true; // Track if the form is valid
            
            // Validate name - must be at least 2 characters
            if (name.length < 2) {
                showError('nameError', 'Please enter your full name (at least 2 characters)');
                isValid = false;
            }
            
            // Validate email - must be a valid email format
            if (!isValidEmail(email)) {
                showError('emailError', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate phone - must be at least 10 digits
            if (!isValidPhone(phone)) {
                showError('phoneError', 'Please enter a valid phone number (at least 10 digits)');
                isValid = false;
            }
            
            // Validate subject - must be selected
            if (subject === '') {
                showError('subjectError', 'Please select a subject');
                isValid = false;
            }
            
            // Validate message - must be at least 10 characters
            if (message.length < 10) {
                showError('messageError', 'Please enter a message (at least 10 characters)');
                isValid = false;
            }
            
            // If all validations pass, submit the form
            if (isValid) {
                showSuccess();
                contactForm.reset(); // Clear the form
            }
        });
    }
    
    // Function to validate email format
    function isValidEmail(email) {
        // This pattern checks if the email has the format: something@something.something
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
    
    // Function to validate phone number
    function isValidPhone(phone) {
        // Remove all non-digit characters
        const cleanPhone = phone.replace(/\D/g, '');
        // Check if we have at least 10 digits
        return cleanPhone.length >= 10;
    }
    
    // Function to show an error message
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
    
    // Function to clear all error messages
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
        });
    }
    
    // Function to show success message
    function showSuccess() {
        const successElement = document.getElementById('formSuccess');
        if (successElement) {
            successElement.textContent = 'Thank you for your message! We will get back to you soon.';
            successElement.style.display = 'block';
            
            // Hide the success message after 5 seconds
            setTimeout(function() {
                successElement.style.display = 'none';
            }, 5000);
        }
    }

    // ===== SMOOTH SCROLLING FOR LINKS =====
    // This makes clicking on links scroll smoothly to the target
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== ADD ANIMATION ON SCROLL =====
    // This adds a fade-in effect when elements come into view
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Apply animation to feature cards, product cards, etc.
    const animatedElements = document.querySelectorAll('.feature-card, .product-card, .value-card, .team-member');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });

    // ===== CONSOLE MESSAGE =====
    // This is just a friendly message in the browser console
    console.log('Sweet Delights Bakery website loaded successfully! 🍰');
});
