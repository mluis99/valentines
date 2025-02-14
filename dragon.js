document.addEventListener('DOMContentLoaded', () => {
    let clickCount = 0;
    let clickTimeout;
    const container = document.createElement('div');
    container.className = 'dragonball-container';
    
    const dragonBallImages = [];
    
    // Create all 7 dragon balls, but set them as invisible initially
    for (let i = 1; i <= 7; i++) {
        const img = document.createElement('img');
        img.src = `dragonballs/dragonball-${i}.png`;
        img.alt = `Dragon Ball ${i}`;
        img.classList.add('dragonball');
        img.style.opacity = 0; // Invisible at first
        img.dataset.found = false; // Keep track if it's been clicked
        dragonBallImages.push(img);
    }
    document.body.appendChild(container);

    // Create the "Find the Dragon Balls!" message
    const findMessage = document.createElement('div');
    findMessage.className = 'find-message';
    findMessage.textContent = 'Find the Dragon Balls!';
    findMessage.style.display = 'none'; // Hidden initially
    document.body.appendChild(findMessage);

    // Create the "Wish Fulfilled" message
    const wishMessage = document.createElement('div');
    wishMessage.className = 'wish-message';
    wishMessage.textContent = 'Your wish has been fulfilled; Luis will love Azalia eternally.';
    wishMessage.style.display = 'none'; // Hidden initially
    document.body.appendChild(wishMessage);

    // Function to scatter the dragon balls randomly on the page
    function scatterDragonBalls() {
        dragonBallImages.forEach((ball, index) => {
            const randomX = Math.random() * (window.innerWidth - 100); // Random X
            const randomY = Math.random() * (window.innerHeight - 100); // Random Y
            ball.style.position = 'absolute';
            ball.style.left = `${randomX}px`;
            ball.style.top = `${randomY}px`;
            ball.style.opacity = 0; // Invisible initially
            ball.style.transition = 'opacity 0.5s ease'; // Smooth transition to visibility
            document.body.appendChild(ball);
        });
    }

    // Click handler for the entire document
    document.addEventListener("click", function(e) {
        if (window.matchMedia("(pointer: coarse)").matches) return;
        
        clickCount++;
        clearTimeout(clickTimeout);
        clickTimeout = setTimeout(() => clickCount = 0, 1000);

        if (clickCount >= 7) {
            findMessage.style.display = 'block'; // Show the "Find the Dragon Balls!" text
            scatterDragonBalls(); // Scatter the balls on the screen
            clickCount = 0;
        }
    });

    // Make the dragon balls clickable, toggling opacity
    dragonBallImages.forEach(ball => {
        ball.addEventListener('click', () => {
            if (ball.dataset.found === 'false') {
                ball.style.opacity = 1; // Make the image solid when clicked
                ball.dataset.found = 'true'; // Mark it as found
                checkAllBallsFound(); // Check if all balls are found
            }
        });
    });

    // Function to check if all dragon balls have been clicked
    function checkAllBallsFound() {
        const allFound = dragonBallImages.every(ball => ball.dataset.found === 'true');
        if (allFound) {
            wishMessage.style.display = 'block'; // Show the "Wish Fulfilled" text
        }
    }
});
