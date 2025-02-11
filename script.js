let audioPlayed = false;
const audioElement = document.getElementById("valentineAudio");
let heartInterval;

function showLoveMessage() {
    // Always create elements on click
    createHeartsAndFlowers();
    
    // Play audio only once
    if(!audioPlayed) {
        audioElement.play().catch(error => {
            console.log("Audio play failed:", error);
        });
        audioPlayed = true;
        document.getElementById("audioText").innerText = "Pause Music";
    }
}

function createHeartsAndFlowers() {
    for(let i = 0; i < 30; i++) {
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

function toggleAudio() {
    if(audioElement.paused) {
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