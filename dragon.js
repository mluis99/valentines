document.addEventListener('DOMContentLoaded', () => {
    let clickCount = 0;
    let clickTimeout;
    let isDragonBallsVisible = false; // Track if dragon balls have been shown
    const container = document.createElement('div');
    container.className = 'dragonball-container';
    
    // Create all 7 dragon balls
    for (let i = 1; i <= 7; i++) {
        const img = document.createElement('img');
        img.src = `dragonballs/dragonball-${i}.png`;
        img.alt = `Dragon Ball ${i}`;
        img.classList.add('dragonball');
        container.appendChild(img);
    }
    document.body.appendChild(container);

    const gallery = document.querySelector('.gallery');
    const loveLetter = document.querySelector('.love-letter');
    
    // Function to calculate available space
    function getAvailableSpace() {
        const spaces = [];
        const contentAreas = [gallery, loveLetter];

        contentAreas.forEach(area => {
            const areaRect = area.getBoundingClientRect();
            spaces.push({
                x: areaRect.left + window.scrollX,
                y: areaRect.top + window.scrollY,
                width: areaRect.width,
                height: areaRect.height
            });
        });

        return spaces;
    }

    // Function to place dragon balls in empty spaces
    function placeDragonBalls() {
        const spaces = getAvailableSpace();
        const dragonballs = container.querySelectorAll('.dragonball');
        const maxAttempts = 100; // Maximum number of attempts to find a valid position
        const placedPositions = []; // To track the positions of the placed dragon balls

        dragonballs.forEach((ball, index) => {
            let placed = false;
            let attempts = 0;

            while (!placed && attempts < maxAttempts) {
                const randomSpace = spaces[Math.floor(Math.random() * spaces.length)];
                const randomX = randomSpace.x + Math.random() * randomSpace.width;
                const randomY = randomSpace.y + Math.random() * randomSpace.height;

                // Ensure dragon balls stay within viewport bounds
                const maxX = window.innerWidth - 100; // Max x-position, minus ball width
                const maxY = window.innerHeight - 100; // Max y-position, minus ball height

                const posX = Math.min(randomX, maxX);
                const posY = Math.min(randomY, maxY);

                // Check for collision with previously placed dragon balls
                const collision = placedPositions.some(pos => {
                    return (
                        Math.abs(pos.x - posX) < 100 && // Ball width (or buffer area) is 100px
                        Math.abs(pos.y - posY) < 100 // Ball height (or buffer area) is 100px
                    );
                });

                if (!collision) {
                    ball.style.left = `${posX}px`;
                    ball.style.top = `${posY}px`;
                    ball.style.opacity = '1';  // Make the ball visible once positioned
                    placedPositions.push({ x: posX, y: posY }); // Store the position
                    placed = true;
                }

                attempts++;
            }

            if (attempts >= maxAttempts) {
                console.warn("Max attempts reached while placing dragon balls.");
            }
        });
    }

    // Function to check if a dragon ball overlaps any other elements
    function isCollision(ball) {
        const ballRect = ball.getBoundingClientRect();
        const elements = document.querySelectorAll('.gallery img, .love-letter');
        
        for (let el of elements) {
            const elRect = el.getBoundingClientRect();
            if (
                ballRect.left < elRect.right &&
                ballRect.right > elRect.left &&
                ballRect.top < elRect.bottom &&
                ballRect.bottom > elRect.top
            ) {
                return true; // Collision detected
            }
        }
        return false;
    }

    // Track clicked dragon balls using a set
    const clickedDragonBalls = new Set();

    // Click handler for the dragon balls
    container.addEventListener('click', (e) => {
        if (e.target.classList.contains('dragonball')) {
            const clickedBall = e.target.alt; // Get the ball's name (Dragon Ball X)

            // Add the clicked ball to the set
            clickedDragonBalls.add(clickedBall);

            e.target.classList.add('clicked');

            if (clickedDragonBalls.size === 7) {
                // After clicking all 7 distinct dragon balls, display the wish message
                const wishMessage = document.createElement('div');
                wishMessage.classList.add('wish-message');
                wishMessage.textContent = 'Your wish has been fulfilled; Luis will love Azalia eternally.';
                document.body.appendChild(wishMessage);
                
                // Optionally apply the Dragon Ball Z font (or similar) to the wish message
                wishMessage.style.fontFamily = '"Dragonball Z", sans-serif';
                wishMessage.style.fontSize = '3rem';
                wishMessage.style.color = 'gold';
                wishMessage.style.textAlign = 'center';
                wishMessage.style.textShadow = '2px 2px 10px rgba(0, 0, 0, 0.7)';
                
                // Show the wish message for 3 seconds
                setTimeout(() => wishMessage.remove(), 3000);
            }
        }
    });

    // Once the user clicks 7 times, show the find message
    document.addEventListener("click", function(e) {
        if (isDragonBallsVisible) return; // Prevent triggering the "Find the Dragon Balls" logic after scatter

        clickCount++;
        clearTimeout(clickTimeout);
        clickTimeout = setTimeout(() => clickCount = 0, 1000);

        if (clickCount >= 7) {
            const findMessage = document.createElement('div');
            findMessage.classList.add('find-message');
            findMessage.textContent = 'Find the Dragon Balls!';
            document.body.appendChild(findMessage);
            findMessage.style.display = 'block';
            setTimeout(() => findMessage.remove(), 3000);

            // Make the dragon balls appear
            container.style.display = 'block';
            placeDragonBalls();
            isDragonBallsVisible = true; // Mark dragon balls as visible
            clickCount = 0; // Reset click count
        }
    });
});
