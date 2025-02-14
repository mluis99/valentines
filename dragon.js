document.addEventListener('DOMContentLoaded', () => {
    let clickCount = 0;
    let clickTimeout;
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
        let attempts = 0;
        const maxAttempts = 100; // Maximum number of attempts to find a valid position

        dragonballs.forEach(ball => {
            let placed = false;

            while (!placed && attempts < maxAttempts) {
                const randomSpace = spaces[Math.floor(Math.random() * spaces.length)];
                const randomX = randomSpace.x + Math.random() * randomSpace.width;
                const randomY = randomSpace.y + Math.random() * randomSpace.height;

                ball.style.left = `${randomX}px`;
                ball.style.top = `${randomY}px`;
                ball.style.opacity = '1';  // Make the ball visible once positioned
                
                // Check for collision with other elements
                if (!isCollision(ball)) {
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

    // Click handler for the dragon balls
    let dragonBallClicked = 0;
    container.addEventListener('click', (e) => {
        if (e.target.classList.contains('dragonball')) {
            e.target.classList.add('clicked');
            dragonBallClicked++;

            if (dragonBallClicked === 7) {
                const wishMessage = document.createElement('div');
                wishMessage.classList.add('wish-message');
                wishMessage.textContent = 'Your wish has been fulfilled; Luis will love Azalia eternally.';
                document.body.appendChild(wishMessage);
                setTimeout(() => wishMessage.remove(), 3000);
            }
        }
    });

    // Once the user clicks 7 times, show the find message
    document.addEventListener("click", function(e) {
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
            clickCount = 0; // Reset click count
        }
    });
});
