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

    // Click handler for entire document
    document.addEventListener("click", function(e) {
        if (window.matchMedia("(pointer: coarse)").matches) return;
        
        clickCount++;
        clearTimeout(clickTimeout);
        clickTimeout = setTimeout(() => clickCount = 0, 1000);

        if (clickCount >= 7) {
            container.classList.add('visible');
            clickCount = 0;
            setTimeout(() => container.classList.remove('visible'), 10000);
        }
    });
});