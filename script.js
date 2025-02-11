function showLoveMessage() {
    const message = document.getElementById("message");
    message.style.display = "block";
    message.innerText = "You are endlessly loved! 💖🌹✨";
    
    // Add sparkle effect
    for(let i = 0; i < 50; i++) {
        createHeart();
    }
    
    // Add couple emoji
    const couple = document.createElement("div");
    couple.innerHTML = "👩❤️👨";
    couple.classList.add("couple-emoji");
    document.body.appendChild(couple);
}

function createHeart() {
    const hearts = ['❤️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '💖', '💗', '💘'];
    const heart = document.createElement("div");
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.classList.add("floating-heart");
    
    // Random styles
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (Math.random() * 2 + 1.5) + "em";
    heart.style.animationDuration = (Math.random() * 3 + 2) + "s";
    heart.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
    
    document.body.appendChild(heart);

    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Create initial floating hearts
setInterval(createHeart, 300);

// Add some random butterflies
setInterval(() => {
    const butterfly = document.createElement("div");
    butterfly.innerHTML = "🦋";
    butterfly.style.position = "absolute";
    butterfly.style.left = Math.random() * 100 + "vw";
    butterfly.style.fontSize = "2em";
    butterfly.style.animation = `flutter ${Math.random() * 2 + 3}s infinite`;
    document.body.appendChild(butterfly);
    
    setTimeout(() => butterfly.remove(), 5000);
}, 1500);