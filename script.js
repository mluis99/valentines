let audioPlayed = false;
const audioElement = document.getElementById("valentineAudio");
let currentHeartSlide = 0;
let touchStartX = 0;
let touchEndX = 0;
const swipeThreshold = 30;
let touchStartTime = 0;
let slideInterval; // Moved to global scope for better interval control

// Initialize audio
function initAudio() {
  audioElement.volume = 0.7;
  audioElement.preload = "auto";
  audioElement.addEventListener('canplaythrough', () => {
    console.log("Audio ready to play fully");
  });
}

// Heart Slideshow Functionality
function initHeartSlideshow() {
  const slides = document.querySelectorAll('.heart-slide');
  const dotsContainer = document.querySelector('.heart-dots');
  const slideshow = document.querySelector('.heart-slideshow');

  // Create navigation dots
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('heart-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => showHeartSlide(index));
    dotsContainer.appendChild(dot);
  });

  // Auto-advance slides every 4 seconds
  function startSlideInterval() {
    slideInterval = setInterval(() => {
      currentHeartSlide = (currentHeartSlide + 1) % slides.length;
      showHeartSlide(currentHeartSlide);
    }, 4000);
  }
  startSlideInterval();

  // Touch event handlers
  slideshow.addEventListener('touchstart', (e) => {
    touchStartX = handleTouch(e);
    touchStartTime = Date.now();
    clearInterval(slideInterval);
  });

  slideshow.addEventListener('touchmove', (e) => {
    touchEndX = handleTouch(e);
    const diff = touchStartX - touchEndX;
    slideshow.style.transform = `translateX(${-diff * 0.3}px)`;
  });

  slideshow.addEventListener('touchend', () => {
    const diff = touchStartX - touchEndX;
    const velocity = Math.abs(diff) / (Date.now() - touchStartTime);
    
    slideshow.style.transform = 'translateX(0)';
    
    if (Math.abs(diff) >= swipeThreshold || velocity > 0.3) {
      currentHeartSlide += diff > 0 ? 1 : -1;
      currentHeartSlide = (currentHeartSlide + slides.length) % slides.length;
    }
    
    showHeartSlide(currentHeartSlide);
    startSlideInterval(); // Restart interval after interaction
  });

  // Initialize first slide
  showHeartSlide(0);
}

function showHeartSlide(index) {
  const slides = document.querySelectorAll('.heart-slide');
  const dots = document.querySelectorAll('.heart-dot');
  const slideshow = document.querySelector('.heart-slideshow');
  
  // Validate index
  index = (index + slides.length) % slides.length;
  
  slideshow.classList.add('swiping');
  
  // Update slides and dots
  slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
  dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  
  currentHeartSlide = index;
  
  setTimeout(() => {
    slideshow.classList.remove('swiping');
  }, 300);
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
  const frame = document.querySelector('.photo-frame');
  const sparkles = ['✨', '🌟', '💫', '⭐'];
  for (let i = 0; i < 8; i++) {
    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");
    sparkle.innerHTML = sparkles[Math.floor(Math.random() * sparkles.length)];
    sparkle.style.left = Math.random() * 100 + "%";
    sparkle.style.top = Math.random() * 100 + "%";
    sparkle.style.animationDelay = Math.random() * 1 + "s";
    frame.appendChild(sparkle);
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

// Initialize everything
window.addEventListener('DOMContentLoaded', () => {
  initAudio();
  initHeartSlideshow();
});