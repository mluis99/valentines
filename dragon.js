// dragon.js - Dragon Ball Easter Egg
document.addEventListener('DOMContentLoaded', () => {
    // Only run on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let clickCount = 0;
    let clickTimeout;
    const requiredClicks = 7;
    const clickWindow = 1000; // 1 second

    // Create container
    const container = document.createElement('div');
    container.className = 'dragonball-container';
    
    // Add dragon balls
    for (let i = 1; i <= 7; i++) {
        const img = document.createElement('img');
        img.src = `dragonballs/dragonball-${i}.png`;
        img.alt = `Dragon Ball ${i}`;
        img.classList.add('dragonball');
        container.appendChild(img);
    }
    
    document.body.appendChild(container);

    // Click handler
    function handleClick() {
        clickCount++;
        
        // Reset timeout on each click
        clearTimeout(clickTimeout);
        clickTimeout = setTimeout(() => {
            clickCount = 0;
        }, clickWindow);

        if (clickCount >= requiredClicks) {
            container.classList.add('visible');
            clickCount = 0;
            
            // Auto-hide after 10 seconds
            setTimeout(() => {
                container.classList.remove('visible');
            }, 10000);
        }
    }

    document.addEventListener('click', handleClick);
});