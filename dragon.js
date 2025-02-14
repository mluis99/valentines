document.addEventListener('DOMContentLoaded', () => {
    let clickCount = 0;
    let clickTimeout;
    let isDragonBallsVisible = false;
    const container = document.createElement('div');
    container.className = 'dragonball-container';
    container.style.display = 'none'; // Hide initially

    // Create dragon balls
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

    // Function to place dragon balls without collisions
    function placeDragonBalls() {
        const spaces = getAvailableSpace();
        const dragonballs = container.querySelectorAll('.dragonball');
        const maxAttempts = 100;
        const placedPositions = [];

        dragonballs.forEach((ball) => {
            let placed = false;
            let attempts = 0;

            while (!placed && attempts < maxAttempts) {
                const randomSpace = spaces[Math.floor(Math.random() * spaces.length)];
                const randomX = randomSpace.x + Math.random() * randomSpace.width;
                const randomY = randomSpace.y + Math.random() * randomSpace.height;

                const maxX = window.innerWidth - 100;
                const maxY = window.innerHeight - 100;

                const posX = Math.min(randomX, maxX);
                const posY = Math.min(randomY, maxY);

                // Check collision with other dragon balls
                const collisionWithBalls = placedPositions.some(pos => 
                    Math.abs(pos.x - posX) < 100 && 
                    Math.abs(pos.y - posY) < 100
                );

                // Temporarily position to check element collision
                ball.style.left = `${posX}px`;
                ball.style.top = `${posY}px`;
                const collisionWithElements = isCollision(ball);

                if (!collisionWithBalls && !collisionWithElements) {
                    ball.style.opacity = '1';
                    placedPositions.push({ x: posX, y: posY });
                    placed = true;
                } else {
                    ball.style.left = '';
                    ball.style.top = '';
                }

                attempts++;
            }

            if (attempts >= maxAttempts) {
                console.warn("Max placement attempts reached.");
            }
        });
    }

    // Collision check with existing elements
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
                return true;
            }
        }
        return false;
    }

    // Track clicked balls
    const clickedDragonBalls = new Set();

    container.addEventListener('click', (e) => {
        if (e.target.classList.contains('dragonball')) {
            const clickedBall = e.target.alt;
            clickedDragonBalls.add(clickedBall);
            e.target.classList.add('clicked');

            if (clickedDragonBalls.size === 7) {
                const wishMessage = document.createElement('div');
                wishMessage.className = 'wish-message';
                wishMessage.textContent = 'Your wish has been fulfilled; Luis will love Azalia eternally.';
                document.body.appendChild(wishMessage);

                // Styling the wish message
                wishMessage.style.fontFamily = '"Dragonball Z", sans-serif';
                wishMessage.style.fontSize = '3rem';
                wishMessage.style.color = 'gold';
                wishMessage.style.textAlign = 'center';
                wishMessage.style.textShadow = '2px 2px 10px rgba(0, 0, 0, 0.7)';
                wishMessage.style.position = 'fixed';
                wishMessage.style.top = '50%';
                wishMessage.style.left = '50%';
                wishMessage.style.transform = 'translate(-50%, -50%)';
                wishMessage.style.zIndex = '10000';

                setTimeout(() => wishMessage.remove(), 3000);
            }
        }
    });

    // 7-click handler to show dragon balls
    document.addEventListener("click", (e) => {
        if (isDragonBallsVisible) return;

        clickCount++;
        clearTimeout(clickTimeout);
        clickTimeout = setTimeout(() => clickCount = 0, 1000);

        if (clickCount >= 7) {
            const findMessage = document.createElement('div');
            findMessage.className = 'find-message';
            findMessage.textContent = 'Find the Dragon Balls!';
            document.body.appendChild(findMessage);
            
            // Styling find message
            findMessage.style.position = 'fixed';
            findMessage.style.top = '50%';
            findMessage.style.left = '50%';
            findMessage.style.transform = 'translate(-50%, -50%)';
            findMessage.style.fontSize = '2rem';
            findMessage.style.color = '#ff0000';
            findMessage.style.textShadow = '2px 2px 5px rgba(0, 0, 0, 0.5)';
            findMessage.style.zIndex = '10000';

            setTimeout(() => findMessage.remove(), 3000);

            // Show and position dragon balls
            container.style.display = 'block';
            placeDragonBalls();
            isDragonBallsVisible = true;
            clickCount = 0;
        }
    });
});
