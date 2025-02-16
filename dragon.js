document.addEventListener('DOMContentLoaded', () => {
    let clickCount = 0;
    let clickTimeout;
    let isDragonBallsVisible = false;
    const container = document.createElement('div');
    container.className = 'dragonball-container';
    container.style.position = 'absolute'; // Set the position to absolute to control positioning
    container.style.display = 'none'; // Initially hidden

    // Create dragon balls
    for (let i = 1; i <= 7; i++) {
        const img = document.createElement('img');
        img.src = `dragonballs/dragonball-${i}.png`;  // Ensure this path is correct and files exist
        img.alt = `Dragon Ball ${i}`;
        img.classList.add('dragonball');
        img.style.position = 'absolute'; // Each ball is absolutely positioned
        img.style.opacity = '0.3'; // Initially slightly transparent
        container.appendChild(img);
    }
    document.body.appendChild(container);

    const gallery = document.querySelector('.gallery');
    const loveLetter = document.querySelector('.love-letter');

    // Function to calculate available space in the content areas
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

        // Add the entire viewport to the available space
        spaces.push({
            x: 0,
            y: 0,
            width: window.innerWidth,
            height: window.innerHeight
        });

        return spaces;
    }

    // Function to place dragon balls within available space
    function placeDragonBalls() {
        const spaces = getAvailableSpace();
        const dragonballs = container.querySelectorAll('.dragonball');
        const maxAttempts = window.innerWidth <= 768 ? 500 : 300; // More attempts on mobile
        const minimumDistance = window.innerWidth <= 768 ? 80 : 120; // Smaller gap on mobile
        const placedPositions = [];

        dragonballs.forEach((ball, i) => {
            let placed = false;
            let attempts = 0;

            while (!placed && attempts < maxAttempts) {
                const randomSpace = spaces[Math.floor(Math.random() * spaces.length)];
                const randomX = randomSpace.x + Math.random() * randomSpace.width;
                const randomY = randomSpace.y + Math.random() * randomSpace.height;

                const maxX = window.innerWidth - 100;  // Limit ball placement to within screen width
                const maxY = window.innerHeight - 100; // Limit ball placement to within screen height

                const posX = Math.min(randomX, maxX);
                const posY = Math.min(randomY, maxY);

                const ballWidth = ball.offsetWidth;
                const ballHeight = ball.offsetHeight;

                // Ensure that no ball is placed too close to another ball
                const collisionWithBalls = placedPositions.some(pos => 
                    Math.abs(pos.x - posX) < (minimumDistance + ballWidth) && 
                    Math.abs(pos.y - posY) < (minimumDistance + ballHeight)
                );

                // Temporarily position to check element collision
                ball.style.left = `${posX}px`;
                ball.style.top = `${posY}px`;
                const collisionWithElements = isCollision(ball);

                if (!collisionWithBalls && !collisionWithElements) {
                    ball.style.opacity = '0.3'; // Slightly transparent by default
                    placedPositions.push({ x: posX, y: posY });
                    placed = true;
                } else {
                    ball.style.left = '';
                    ball.style.top = '';
                }

                attempts++;
            }

            if (attempts >= maxAttempts) {
                console.warn("Max placement attempts reached for dragon ball ", i + 1);
            }
        });
    }

    // Function to check for collisions with existing elements
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

    // Track clicked dragon balls
    const clickedDragonBalls = new Set();

    function handleDragonBallClick(e) {
        if (e.target.classList.contains('dragonball')) {
            const clickedBall = e.target.alt;
            clickedDragonBalls.add(clickedBall);
            e.target.classList.add('clicked');

            // Make the ball solid after it's clicked
            e.target.style.opacity = '1'; 

            if (clickedDragonBalls.size === 7) {
                const wishMessageContainer = document.createElement('div');
                wishMessageContainer.className = 'wish-message-container';
                // Add Shenron image above the wish message
                const shenronImg = document.createElement('img');
                shenronImg.src = 'images/shenron.png';
                shenronImg.alt = 'Shenron';
                shenronImg.style.display = 'block';
                shenronImg.style.margin = '0 auto';
                wishMessageContainer.appendChild(shenronImg);

                // Add the wish message text
                const wishMessage = document.createElement('div');
                wishMessage.className = 'wish-message';
                wishMessage.textContent = 'Your wish has been fulfilled; Luis will love Azalia eternally.';
                wishMessageContainer.appendChild(wishMessage);

                document.body.appendChild(wishMessageContainer);

                // Styling the wish message
                wishMessage.style.fontFamily = '"Dragonball Z", sans-serif';
                wishMessage.style.fontSize = '3rem';
                wishMessage.style.color = 'gold';
                wishMessage.style.textAlign = 'center';
                wishMessage.style.textShadow = '3px 3px 12px rgba(0, 0, 0, 0.9)';
                wishMessage.style.padding = '20px 40px';
                wishMessage.style.position = 'fixed';
                wishMessage.style.top = '50%';
                wishMessage.style.left = '50%';
                wishMessage.style.transform = 'translate(-50%, -50%)';
                wishMessage.style.zIndex = '10000';
                wishMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
                wishMessage.style.borderRadius = '10px';
                wishMessage.style.border = '5px solid gold';

                setTimeout(() => wishMessageContainer.remove(), 7000); // Stay visible for 7 seconds
            }
        }
    }

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

            // Styling the find message
            findMessage.style.position = 'fixed';
            findMessage.style.top = '50%';
            findMessage.style.left = '50%';
            findMessage.style.transform = 'translate(-50%, -50%)';
            findMessage.style.fontSize = '2rem';
            findMessage.style.color = '#ff0000';
            findMessage.style.textShadow = '2px 2px 5px rgba(0, 0, 0, 0.5)';
            findMessage.style.zIndex = '10000';
            findMessage.style.fontFamily = '"Dragonball Z", sans-serif';
            findMessage.style.padding = '15px 30px';
            findMessage.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            findMessage.style.borderRadius = '10px';
            findMessage.style.border = '3px solid #ff0000';

            setTimeout(() => findMessage.remove(), 4000); // Stay visible for 4 seconds

            // Show the container and position dragon balls
            container.style.display = 'block';
            placeDragonBalls();
            isDragonBallsVisible = true;
            clickCount = 0;
        }
    });

    // Add touch support for mobile devices
    container.addEventListener('click', handleDragonBallClick);
    container.addEventListener('touchend', handleDragonBallClick); // Add touch support
});
