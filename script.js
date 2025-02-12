let audioPlayed = false;
const audioElement = document.getElementById("valentineAudio");

function initAudio() {
  audioElement.volume = 0.7;
  audioElement.preload = "auto";
  audioElement.addEventListener('canplaythrough', () => {
    console.log("Audio ready to play fully");
  });
}

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
}

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
    // Remove sparkle after animation ends
    setTimeout(() => sparkle.remove(), 1500);
  }
}

const notes = [
  "YOU'RE MY EVERYTHING 💖", 
  "THAT'S US! 💞",
  "LOVE YOU TO THE MOON 🌙",
  "FOREVER YOURS 🌹",
  "I MOO YOU 🐄 💖"
];

function createLoveNote() {
  const note = document.createElement("div");
  note.classList.add("love-note");
  note.innerHTML = notes[Math.floor(Math.random() * notes.length)];
  note.style.left = Math.random() * 85 + "vw";
  note.style.fontSize = (Math.random() * 0.5 + 1.8) + "em";
  note.style.animationDuration = (Math.random() * 2 + 8) + "s";
  document.body.appendChild(note);
  setTimeout(() => note.remove(), 10000);
}

window.addEventListener('load', () => {
  addSparkles();
  setInterval(createLoveNote, 2500);
});

// Prevent unwanted zooming
document.addEventListener('dblclick', e => e.preventDefault());
document.addEventListener('touchstart', e => {
  if (e.touches.length > 1) e.preventDefault();
}, { passive: false });
