// Variable to track number of clicks
let clickCount = 0;

// Function to check if the user is on a mobile device
function isMobile() {
  return window.innerWidth <= 768; // Adjust this width to match your mobile breakpoint
}

// Function to trigger the Dragon Ball Easter Egg
function activateDragonBallEasterEgg() {
  if (!isMobile() && clickCount === 7) { // Only activate on desktop
    // Trigger the Dragon Ball Easter Egg
    alert("You've unlocked the Dragon Ball Easter Egg!");

    // Optionally, create the animation or image sequence
    const dragonBall = document.createElement('img');
    const i = Math.floor(Math.random() * 7) + 1; // Random number from 1 to 7 for the Dragon Ball image
    dragonBall.src = `dragonballs/dragonball-${i}.png`; // Dynamically assign image source
    dragonBall.alt = 'Dragon Ball Easter Egg';
    dragonBall.classList.add('dragon-ball-animation');
    document.body.appendChild(dragonBall);

    // Reset the click counter
    clickCount = 0;
  }
}

// Function to handle click event
document.addEventListener("click", function(e) {
  // Check if the click was on an image in the gallery and it's not on mobile
  if (!isMobile() && e.target.tagName === 'IMG') {
    clickCount++; // Increase click count

    // Check if we reached 7 clicks and activate the Easter egg
    activateDragonBallEasterEgg();
  }
});
