let audioPlayed = false;
const audioElement = document.getElementById("valentineAudio");

// Improved audio initialization
function initAudio() {
    audioElement.volume = 0.7;
    audioElement.preload = "auto"; // Ensure full file loads
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
                // Show error message to user
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

// Initialize audio properly
initAudio();

function createHeartsAndFlowers() {
    for (let i = 0; i < 30; i++) {
        createHeart();
        createFlower();
    }
}

function createFlower() {
    const flowers = ['🌸', '🌺', '🌷', '💮', '🏵️', '🌻', '🌼', '🌹', '💐'];
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
    const hearts = ['❤️', '💕', '💞', '💓', '💗', '💖', '💘', '🧡', '💛', '💚', '💙', '💜', '💌', '🤍', '🤎'];
    const heart = document.createElement("div");
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.classList.add("floating-heart");
    
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.fontSize = (Math.random() * 3 + 2) + "em";
    heart.style.animationDuration = (Math.random() * 3 + 2) + "s";
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 5000);
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

// Initialize audio
audioElement.volume = 0.7;

// Handle audio end
audioElement.addEventListener('ended', () => {
    document.getElementById("audioText").innerText = "Play Music";
});

// Initial background hearts
heartInterval = setInterval(createHeart, 100);

// Add sparkles around photo frame
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
    }
}

// Add floating love notes
function createLoveNote() {
    const notes = ["Forever Yours 💕", "You're My Everything 🌹", "Love You to the Moon 🌙", "My Heart Beats for You 💓"];
    const note = document.createElement("div");
    note.classList.add("love-note");
    note.innerHTML = notes[Math.floor(Math.random() * notes.length)];
    note.style.left = Math.random() * 90 + "vw";
    note.style.top = Math.random() * 90 + "vh";
    note.style.fontSize = (Math.random() * 1 + 1) + "em";
    note.style.animationDuration = (Math.random() * 5 + 5) + "s";
    document.body.appendChild(note);

    setTimeout(() => note.remove(), 8000);
}

// Initialize when page loads
window.addEventListener('load', () => {
    addSparkles();
    setInterval(createLoveNote, 3000);
    
    // Add floating message
    const bubble = document.createElement("div");
    bubble.classList.add("message-bubble");
    bubble.innerHTML = "That's us! 💞";
    bubble.style.left = "55%";
    bubble.style.top = "40%";
    document.body.appendChild(bubble);
});