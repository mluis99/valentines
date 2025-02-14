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
    counter.textContent = `${index + 1} / ${slides.length}`;
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });

  let touchStart = 0;
  slideshow.addEventListener('touchstart', e => {
    touchStart = e.touches[0].clientX;
  });

  slideshow.addEventListener('touchend', e => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchEnd - touchStart;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) prevBtn.click();
      else nextBtn.click();
    }
  });

  showSlide(0);
}

// Hamburger Menu
function initHamburgerMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initHamburgerMenu();
  initMobileSlideshow();
});
