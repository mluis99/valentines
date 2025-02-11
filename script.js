function createHeartsAndFlowers() {
    // Create more elements for better visibility
    for(let i = 0; i < 40; i++) {
        createHeart();
        createFlower();
    }
}

function createFlower() {
    const flowers = ['🌸', '🌺', '🌷', '💮', '🏵️', '🌻', '🌼'];
    const flower = document.createElement("div");
    flower.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];
    flower.classList.add("floating-flower");
    
    // Mobile-friendly positioning
    flower.style.left = Math.random() * window.innerWidth + "px";
    flower.style.fontSize = (Math.random() * 3 + 2) + "em";
    flower.style.animationDuration = (Math.random() * 4 + 3) + "s";
    flower.style.zIndex = "1";
    
    document.body.appendChild(flower);

    setTimeout(() => flower.remove(), 7000);
}

function createHeart() {
    const hearts = ['❤️', '💕', '💞', '💓', '💗', '💖', '💘'];
    const heart = document.createElement("div");
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.classList.add("floating-heart");
    
    // Better mobile positioning
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.fontSize = (Math.random() * 3 + 2) + "em";
    heart.style.animationDuration = (Math.random() * 3 + 2) + "s";
    heart.style.zIndex = "1";
    
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 5000);
}

// Initialize with viewport-based positioning
window.addEventListener('resize', () => {
    clearInterval(heartInterval);
    heartInterval = setInterval(createHeart, 100);
});