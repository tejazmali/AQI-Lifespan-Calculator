/**
 * Global Animation Utilities for Airtox
 * Handles scroll-based animations and interactive effects
 */

// Intersection Observer for scroll reveal animations
function initScrollReveal() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: Unobserve after animation to improve performance
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all elements with 'reveal' class
  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });
}

// Animated Number Counter
function animateCounter(element, target, duration = 2000, suffix = '') {
  const start = 0;
  const increment = target / (duration / 16); // 60fps
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = Math.round(target) + suffix;
      clearInterval(timer);
    } else {
      element.textContent = Math.round(current) + suffix;
    }
  }, 16);
}

// Smooth scroll to element
function smoothScrollTo(elementId, offset = 0) {
  const element = document.getElementById(elementId);
  if (element) {
    const y = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

// Add ripple effect to button
function addRippleEffect(button) {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple-effect');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
}

// Add parallax effect to elements
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  window.addEventListener('scroll', () => {
    parallaxElements.forEach(el => {
      const speed = el.dataset.parallax || 0.5;
      const yPos = -(window.pageYOffset * speed);
      el.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// Staggered animation for lists
function staggerAnimation(selector, delay = 100) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el, index) => {
    el.style.animationDelay = `${index * delay}ms`;
    el.classList.add('animate');
  });
}

// Add hover tilt effect
function addTiltEffect(element) {
  element.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  });
  
  element.addEventListener('mouseleave', () => {
    element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  });
}

// Typewriter effect
function typewriterEffect(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Initialize all animations on page load
document.addEventListener('DOMContentLoaded', function() {
  // Initialize scroll reveal
  initScrollReveal();
  
  // Initialize parallax if elements exist
  if (document.querySelector('[data-parallax]')) {
    initParallax();
  }
  
  // Add ripple effect to buttons with class 'ripple-btn'
  document.querySelectorAll('.ripple-btn').forEach(btn => {
    addRippleEffect(btn);
  });
  
  // Add tilt effect to cards with class 'tilt-card'
  document.querySelectorAll('.tilt-card').forEach(card => {
    addTiltEffect(card);
  });
});

// CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
  .ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    animateCounter,
    smoothScrollTo,
    addRippleEffect,
    addTiltEffect,
    typewriterEffect,
    staggerAnimation
  };
}
