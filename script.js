let hasClicked = false;
let audioPlayed = false;

function showLoveMessage() {
    const message = document.getElementById("message");
    message.style.display = "block";
    message.innerHTML = "I love you so much! 🌹💖";
    
    // Play audio on first click
    if(!audioPlayed) {
        const audio = document.getElementById("valentineAudio");
        audio.play();
        audioPlayed = true;
    }

    // Initial heart explosion
    if(!hasClicked) {
        for(let i = 0; i < 100; i++) {
            createHeart();
            createFlower();
        }
        hasClicked = true;
        
        // Stop automatic heart creation
        clearInterval(heartInterval);
    }
}

function createFlower() {
    const flowers = ['🌸', '🌺', '🌷', '💮', '🏵️', '🌻', '🌼'];
    const flower = document.createElement("div");
    flower.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];
    flower.classList.add("floating-flower");
    
    flower.style.left = Math.random() * 100 + "vw";
    flower.style.fontSize = (Math.random() * 3 + 2) + "em";
    flower.style.animationDuration = (Math.random() * 4 + 3) + "s";
    document.body.appendChild(flower);

    setTimeout(() => flower.remove(), 6000);
}

// Update heart creation function
function createHeart() {
    const hearts = ['❤️', '💕', '💞', '💓', '💗', '💖', '💘'];
    const heart = document.createElement("div");
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.classList.add("floating-heart");
    
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (Math.random() * 3 + 2) + "em";
    heart.style.animationDuration = (Math.random() * 3 + 2) + "s";
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 5000);
}

// Initial background hearts (will be cleared after first click)
const heartInterval = setInterval(createHeart, 100);