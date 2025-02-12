let audioPlayed = false;
const audioElement = document.getElementById("valentineAudio");
const slideshowImages = [
  'image1.jpg', // Replace with actual image paths
  'image2.jpg',
  'image3.jpg',
];
let currentSlide = 0;

// Function to initiate the audio settings
function initAudio() {
  audioElement.volume = 0.7;
  audioElement.preload = "auto";
  audioElement.addEventListener('canplaythrough', () => {
    console.log("Audio ready to play fully");
  });
}

// Function to show love message, trigger floating effects, and play audio
function showLoveMessage() {
  // Create floating hearts, flowers, and love notes when the button is clicked
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
  
  // Prevent scrolling on mobile devices after clicking "Click for More Love"
  if (window.innerWidth <= 600) {
    document.body.style.overflow = "hidden";
  }
}

// Function to toggle audio play/pause
function toggleAudio() {
  if (audioElement.paused) {
    audioElement.play();
    document.getElementById("audioText").innerText = "Pause Music";
  } else {
    audioElement.pause();
    document.getElementById("audioText").innerText = "Play Music";
  }
}

initAudio();

// Function to create hearts and flowers
function createHeartsAndFlowers() {
  for (let i = 0; i < 30; i++) {
    createHeart();
    createFlower();
  }
}

// Function to create floating flowers
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

// Function to create floating hearts
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

// Function to create floating love notes
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

  // Adjust left position and font size based on viewport width
  let leftPos, fontSize;
  if (window.innerWidth <= 600) {
    leftPos = Math.random() * 80 + 10; // for mobile
    fontSize = (Math.random() * 0.3 + 1.2);
  } else {
    leftPos = Math.random() * 90 + 5;  // for desktop
    fontSize = (Math.random() * 0.5 + 1.8);
  }
  note.style.left = leftPos + "%";
  note.style.fontSize = fontSize + "em";

  const duration = Math.random() * 2 + 8;
  note.style.animationDuration = duration + "s";
  document.body.appendChild(note);
  setTimeout(() => note.remove(), duration * 1000);
}

// Function to add sparkles
function addSparkles() {
  const frame = document.querySelector('.photo-frame');
  const sparkles = ['✨', '🌟', '💫', '⭐','❤️', '💕', '💞', '🌸', '🌺', '🌷'];
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

// Function for Slideshow
function startSlideshow() {
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slideshowImages.length;
    document.getElementById("slideshow").style.backgroundImage = `url(${slideshowImages[currentSlide]})`;
  }, 5000); // Change image every 5 seconds
}

window.addEventListener('load', () => {
  // Start slideshow
  startSlideshow();
  // Continuously add sparkles every 2 seconds
  setInterval(addSparkles, 2000);
  // Create a floating love note every 3 seconds
  setInterval(createFloatingNote, 3000);
});

// Interactive Cursor Effect: cycle through symbols on click
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
