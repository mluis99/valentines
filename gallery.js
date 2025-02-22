// Mobile Gallery Slideshow
function initMobileSlideshow() {
  const slideshow = document.querySelector('.mobile-slideshow');
  if (!slideshow) return;

  const slides = slideshow.querySelectorAll('.slide');
  const counter = slideshow.querySelector('.slide-counter');
  const prevBtn = slideshow.querySelector('#prev-slide');
  const nextBtn = slideshow.querySelector('#next-slide');
  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
    if (counter) counter.textContent = `${index + 1} / ${slides.length}`;
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    });
  }

  let touchStart = 0;
  slideshow.addEventListener('touchstart', e => {
    touchStart = e.touches[0].clientX;
  });

  slideshow.addEventListener('touchend', e => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchEnd - touchStart;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0 && prevBtn) prevBtn.click();
      else if (diff < 0 && nextBtn) nextBtn.click();
    }
  });

  showSlide(0);
  console.log('Mobile slideshow initialized with', slides.length, 'slides');
}

// Initialize slideshow when DOM is loaded
// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Let script.js initialize first
  requestAnimationFrame(() => {
    // Initialize slideshow
    initMobileSlideshow();
    console.log('Mobile slideshow initialized from gallery.js');

    // Ensure menu is properly initialized
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    
    if (hamburger && navLinks) {
      console.log('Menu elements found in gallery.js');
      // Force menu to closed state initially
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    } else {
      console.error('Menu elements not found in gallery.js');
    }
  });
});
