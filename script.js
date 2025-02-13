let audioPlayed = false;
const audioElement = document.getElementById("valentineAudio");
let currentHeartSlide = 0;
let touchStartX = 0;
let touchEndX = 0;
const swipeThreshold = 30;
let touchStartTime = 0;
let slideInterval;
let autoPlayActive = true;
let autoPlayTimeout;


// Initialize audio
function initAudio() {
  audioElement.volume = 0.7;
  audioElement.preload = "auto";
}

// Heart Slideshow Functionality
function initHeartSlideshow() {
  const slides = document.querySelectorAll('.heart-slide');
  const dotsContainer = document.querySelector('.heart-dots');
  const slideshow = document.querySelector('.heart-slideshow');
  let slideWidth = slideshow.offsetWidth;

  // Create navigation dots
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('heart-dot');
    dot.addEventListener('click', () => showHeartSlide(index));
    dotsContainer.appendChild(dot);
  });

  // Auto-play functionality
  function startAutoPlay() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
      if (autoPlayActive) {
      currentHeartSlide = (currentHeartSlide + 1) % slides.length;
      showHeartSlide(currentHeartSlide);
      }
    }, 4000);
  }
  startAutoPlay();

  // Touch handlers
slideshow.addEventListener('touchstart', (e) => {
  autoPlayActive = false;
  touchStartX = e.touches[0].clientX;
  touchStartTime = Date.now();
  clearInterval(slideInterval);
  slideshow.classList.add('swiping'); // Add a CSS class for smooth transitions
});

slideshow.addEventListener('touchmove', (e) => {
  if (!autoPlayActive) {
    touchEndX = e.touches[0].clientX;
    const diff = touchStartX - touchEndX;
    const slideWidth = slideshow.offsetWidth;
    // Limit movement to 30% of slide width during swipe
    slideshow.style.transform = `translateX(${-diff / slideWidth * 30}%)`;
  }
});

slideshow.addEventListener('touchend', () => {
  if (!autoPlayActive) {
    const diff = touchStartX - touchEndX;
    const velocity = Math.abs(diff) / (Date.now() - touchStartTime);
    const slideWidth = slideshow.offsetWidth;
    const swipeDistance = Math.abs(diff);

    // Stricter threshold: 20% of slide width or high velocity
    if (swipeDistance > slideWidth * 0.2 || velocity > 0.5) {
      currentHeartSlide += diff > 0 ? 1 : -1;
      currentHeartSlide = (currentHeartSlide + slides.length) % slides.length;
    }
    
    // Smoothly reset the transform
    slideshow.style.transform = 'translateX(0)';
    showHeartSlide(currentHeartSlide);
    
    // Clear any existing auto-play timeout before starting a new one
    if (autoPlayTimeout) clearTimeout(autoPlayTimeout);
    autoPlayTimeout = setTimeout(() => {
      autoPlayActive = true;
      startAutoPlay();
      slideshow.classList.remove('swiping');
    }, 5000);
  }
});

  // Initialize first slide
  showHeartSlide(0);
}

function showHeartSlide(index) {
  const slides = document.querySelectorAll('.heart-slide');
  const dots = document.querySelectorAll('.heart-dot');
  
  // Validate index
  index = (index + slides.length) % slides.length;
  
  console.log("Showing Slide Index:", index); // Debug log
  
  // Update slides
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add('active');
      slide.style.zIndex = 2; // Bring the active slide to the front
    } else {
      slide.classList.remove('active');
      slide.style.zIndex = 1; // Send other slides to the back
    }
  });
  
  // Update dots
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  
  currentHeartSlide = index;
}

// Love message and effects
function showLoveMessage() {  
  createHeartsAndFlowers();
  
  if (!audioPlayed) {
    audioElement.play()
      .then(() => {
        audioPlayed = true;
        document.getElementById("audioText").innerText = "Pause Music";
      })
      .catch(error => {
        console.log("Audio play failed:", error);
        alert("Please click anywhere first to allow audio!");
      });
  }
  
  if (window.innerWidth <= 600) {
    document.body.style.overflow = "hidden";
  }
}

// Audio controls
function toggleAudio() {
  const musicGif = document.getElementById("musicGif");
  if (audioElement.paused) {
    audioElement.play().catch(err => console.log("Playback error:", err));
    document.getElementById("audioText").innerText = "Pause Music";
    musicGif.classList.add("visible");
  } else {
    audioElement.pause();
    document.getElementById("audioText").innerText = "Play Music";
    musicGif.classList.remove("visible");
  }
}

// Initialize everything
window.addEventListener('DOMContentLoaded', () => {
  initAudio();
  initHeartSlideshow();
});

// Hearts and Flowers Animation
function createHeartsAndFlowers() {
  for (let i = 0; i < 30; i++) {
    createHeart();
    createFlower();
  }
}

function createFlower() {
  const flowers = ['🌸', '🌺', '🌷', '💮', '🏵️', '🌻', '🌼'];
  const flower = document.createElement("div");
  flower.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];
  flower.classList.add("floating-flower");
  flower.style.left = Math.random() * window.innerWidth + "px";
  flower.style.fontSize = (Math.random() * 3 + 2) + "em";
  flower.style.animationDuration = (Math.random() * 4 + 3) + "s";
  document.body.appendChild(flower);
  setTimeout(() => flower.remove(), 7000);
}

function createHeart() {
  const hearts = ['❤️', '💕', '💞', '💓', '💗', '💖', '💘'];
  const heart = document.createElement("div");
  heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
  heart.classList.add("floating-heart");
  heart.style.left = Math.random() * window.innerWidth + "px";
  heart.style.fontSize = (Math.random() * 3 + 2) + "em";
  heart.style.animationDuration = (Math.random() * 3 + 2) + "s";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}

// Floating Notes
function createFloatingNote() {
  const messages = [
    "YOU'RE MY EVERYTHING 💖",
    "THAT'S US! 💞",
    "LOVE YOU TO THE MOON 🌙",
    "FOREVER YOURS 🌹",
    "I MOO YOU 🐄 💖"
  ];
  const note = document.createElement("div");
  note.classList.add("floating-note");
  note.innerHTML = messages[Math.floor(Math.random() * messages.length)];

  let leftPos, fontSize;
  if (window.innerWidth <= 600) {
    leftPos = Math.random() * 80 + 10;
    fontSize = (Math.random() * 0.3 + 1.2);
  } else {
    leftPos = Math.random() * 90 + 5;
    fontSize = (Math.random() * 0.5 + 1.8);
  }
  note.style.left = leftPos + "%";
  note.style.fontSize = fontSize + "em";

  const duration = Math.random() * 2 + 8;
  note.style.animationDuration = duration + "s";
  document.body.appendChild(note);
  setTimeout(() => note.remove(), duration * 1000);
}

function addSparkles() {
  const slideshow = document.querySelector('.heart-slideshow'); // ✅ Target the existing element
  const sparkles = ['✨', '🌟', '💫', '⭐'];
  for (let i = 0; i < 8; i++) {
    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");
    sparkle.innerHTML = sparkles[Math.floor(Math.random() * sparkles.length)];
    sparkle.style.left = Math.random() * 100 + "%";
    sparkle.style.top = Math.random() * 100 + "%";
    sparkle.style.animationDelay = Math.random() * 1 + "s";
    slideshow.appendChild(sparkle); // Append to slideshow instead of non-existent photo-frame
    setTimeout(() => sparkle.remove(), 1500);
  }
}

// Continuous animations
window.addEventListener('load', () => {
  setInterval(addSparkles, 2000);
  setInterval(createFloatingNote, 3000);
});

// Interactive Cursor Effect
let cursorSymbols = ["❤️", "💕", "💞", "🌸", "🌺", "🌷"];
let cursorIndex = 0;

function createCursorEffect(e) {
  const cursorEl = document.createElement("div");
  cursorEl.classList.add("cursor-effect");
  cursorEl.innerHTML = cursorSymbols[cursorIndex];
  cursorIndex = (cursorIndex + 1) % cursorSymbols.length;
  cursorEl.style.left = e.clientX + "px";
  cursorEl.style.top = e.clientY + "px";
  document.body.appendChild(cursorEl);
  setTimeout(() => {
    cursorEl.remove();
  }, 800);
}

document.addEventListener("click", createCursorEffect);

// Prevent unwanted zooming
document.addEventListener('dblclick', e => e.preventDefault());
document.addEventListener('touchstart', e => {
  if (e.touches.length > 1) e.preventDefault();
}, { passive: false });

function handleTouch(e) {
  if (!e.touches) return 0;
  const touch = e.touches[0];
  return touch.clientX;
}