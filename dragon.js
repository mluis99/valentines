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
        const maxAttempts = window.innerWidth <= 768 ? 1500 : 1000; // Increased attempts
        const placedPositions = [];
        
        // Get actual rendered size of balls
        const sampleBall = dragonballs[0];
        const ballWidth = sampleBall.offsetWidth;
        const ballHeight = sampleBall.offsetHeight;
        const minimumDistance = Math.max(ballWidth, ballHeight) * 1.8; // Dynamic spacing

        // Get viewport dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        dragonballs.forEach((ball, i) => {
            let placed = false;
            let attempts = 0;
            let bestPosition = null;
            let leastCollisions = Infinity;

            while (attempts < maxAttempts && !placed) {
                const randomSpace = spaces[Math.floor(Math.random() * spaces.length)];
                let randomX = randomSpace.x + Math.random() * (randomSpace.width - ballWidth);
                let randomY = randomSpace.y + Math.random() * (randomSpace.height - ballHeight);

                // Ensure positions stay within viewport
                randomX = Math.max(0, Math.min(randomX, viewportWidth - ballWidth));
                randomY = Math.max(0, Math.min(randomY, viewportHeight - ballHeight));

                // Calculate true distance from other balls
                let collisions = 0;
                placedPositions.forEach(pos => {
                    const dx = pos.x - randomX;
                    const dy = pos.y - randomY;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < minimumDistance) collisions++;
                });

                // Track best possible position
                if (collisions < leastCollisions) {
                    leastCollisions = collisions;
                    bestPosition = { x: randomX, y: randomY };
                }

                if (collisions === 0 && !isCollision(ball)) {
                    placedPositions.push({ x: randomX, y: randomY });
                    ball.style.left = `${randomX}px`;
                    ball.style.top = `${randomY}px`;
                    placed = true;
                }

                attempts++;
            }

            if (!placed && bestPosition) {
                // Use best position with least collisions
                placedPositions.push(bestPosition);
                ball.style.left = `${bestPosition.x}px`;
                ball.style.top = `${bestPosition.y}px`;
            }
        });

        // Final adjustment pass to eliminate overlaps
        placedPositions.forEach((pos, i) => {
            const ball = dragonballs[i];
            let currentX = parseFloat(ball.style.left);
            let currentY = parseFloat(ball.style.top);
            
            placedPositions.forEach((otherPos, j) => {
                if (i === j) return;
                const dx = otherPos.x - currentX;
                const dy = otherPos.y - currentY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < minimumDistance) {
                    const adjustX = (dx / distance) * (minimumDistance - distance);
                    const adjustY = (dy / distance) * (minimumDistance - distance);
                    currentX -= adjustX * 0.5;
                    currentY -= adjustY * 0.5;
                }
            });

            // Keep within viewport
            currentX = Math.max(0, Math.min(currentX, viewportWidth - ballWidth));
            currentY = Math.max(0, Math.min(currentY, viewportHeight - ballHeight));

            ball.style.left = `${currentX}px`;
            ball.style.top = `${currentY}px`;
            placedPositions[i] = { x: currentX, y: currentY };
        });
    }

    // Enhanced collision detection
    function isCollision(ball) {
        const ballRect = ball.getBoundingClientRect();
        const elements = document.querySelectorAll('.gallery img, .love-letter, .dragonball-container');

        return Array.from(elements).some(el => {
            if (el === ball || el.contains(ball)) return false;
            const elRect = el.getBoundingClientRect();
            return (
                ballRect.left < elRect.right &&
                ballRect.right > elRect.left &&
                ballRect.top < elRect.bottom &&
                ballRect.bottom > elRect.top
            );
        });
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
                wishMessageContainer.style.position = 'fixed';
                wishMessageContainer.style.top = '50%';
                wishMessageContainer.style.left = '50%';
                wishMessageContainer.style.transform = 'translate(-50%, -50%)';
                wishMessageContainer.style.zIndex = '10000'; // Ensure it's above everything else
                wishMessageContainer.style.textAlign = 'center'; // Center the content
    
                // Add Shenron image above the wish message
                const shenronImg = document.createElement('img');
                shenronImg.src = 'images/shenron.png';
                shenronImg.alt = 'Shenron';
                shenronImg.style.maxWidth = 'min(90vw, 600px)'; // Responsive width
                shenronImg.style.height = 'auto'; // Maintain aspect ratio
                shenronImg.style.display = 'block';
                shenronImg.style.margin = '0 auto 20px'; // Center horizontally and add bottom margin to create space for the message
                wishMessageContainer.appendChild(shenronImg);
    
                // Add the wish message text below the Shenron image
                const wishMessage = document.createElement('div');
                wishMessage.className = 'wish-message';
                wishMessage.style.fontSize = 'clamp(1.5rem, 5vw, 3rem)'; // Responsive font size
                wishMessage.style.color = 'gold';
                wishMessage.style.textAlign = 'center';
                wishMessage.style.textShadow = '3px 3px 12px rgba(0, 0, 0, 0.9)';
                wishMessage.style.padding = '15px 25px';
                wishMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
                wishMessage.style.borderRadius = '10px';
                wishMessage.style.border = '5px solid gold';
                wishMessage.textContent = 'Your wish has been fulfilled; Luis will love Azalia eternally.';
                wishMessageContainer.appendChild(wishMessage);
    
                document.body.appendChild(wishMessageContainer);
    
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
