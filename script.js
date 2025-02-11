let audioPlayed = false;
const audioElement = document.getElementById("valentineAudio");

// Initialize audio to prevent autoplay issues
audioElement.volume = 0.7;

function showLoveMessage() {
    // Always create hearts/flowers on click
    createHeartsAndFlowers();
    
    // Play audio only once
    if(!audioPlayed) {
        audioElement.play();
        audioPlayed = true;
        document.getElementById("audioText").innerText = "Pause Music";
    }
}

function createHeartsAndFlowers() {
    for(let i = 0; i < 30; i++) {
        createHeart();
        createFlower();
    }
}

function toggleAudio() {
    if(audioElement.paused) {
        audioElement.play();
        document.getElementById("audioText").innerText = "Pause Music";
    } else {
        audioElement.pause();
        document.getElementById("audioText").innerText = "Play Music";
    }
}

// Update audio element initialization in script
document.getElementById("valentineAudio").addEventListener('ended', function() {
    document.getElementById("audioText").innerText = "Play Music";
});