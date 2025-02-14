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
document.addEventListener('DOMContentLoaded', () => {
  // Wait a short moment to ensure script.js has initialized
  setTimeout(() => {
    initMobileSlideshow();
    console.log('Mobile slideshow initialized from gallery.js');
  }, 100);
});
