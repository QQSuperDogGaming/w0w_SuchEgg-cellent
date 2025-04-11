let shakeCount = 0;
let noClickCount = 0;
let isEggOpen = false; // This flag ensures buttons are shown only after the egg opens
const egg = document.getElementById("egg");
const eggText = document.getElementById("eggText");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const crashPopup = document.getElementById("crashPopup");
const rebootButton = document.getElementById("rebootButton");

// Initially hide the buttons
yesButton.style.display = "none";
noButton.style.display = "none";

// Handle shake event
window.addEventListener('devicemotion', handleShake);

function handleShake(event) {
  if (event.accelerationIncludingGravity.x > 15 || event.accelerationIncludingGravity.y > 15 || event.accelerationIncludingGravity.z > 15) {
    shakeCount++;
    if (!isEggOpen) {
      if (shakeCount > 5 && shakeCount < 15) {
        egg.src = "assets/images/half_cracked_egg.png"; // Half cracked egg after some shaking
        eggText.innerText = "The egg is cracking!";
      } else if (shakeCount > 15) {
        egg.src = "assets/images/cracked_egg.png"; // Egg fully cracked after more shaking
        eggText.innerText = "Egg opened! Will you be my egg, the chicken to my jockey, hoppy Easter!";
        showButtons(); // Show the Yes/No buttons after the egg opens
        isEggOpen = true; // Set flag to prevent further cracking
      }
    }
  }
}

// Show Yes/No buttons after the egg cracks
function showButtons() {
  yesButton.style.display = "inline-block";  // Make Yes button visible
  noButton.style.display = "inline-block";   // Make No button visible
}

// Handle Yes button click
yesButton.addEventListener('click', () => {
  playSillySound();
  eggText.innerText = "Egg-cellent, see you hopping soon!";
  noButton.style.display = "none"; // Hide "no" button after clicking "yes"
});

// Handle No button click
noButton.addEventListener('click', (e) => {
  e.preventDefault();
  teleportNoButton(); // Teleport "no" button and make chicken sound
  noClickCount++;

  if (noClickCount >= 40 && noClickCount <= 100) {
    showCrashPopup();
  }
});

// Teleport the "no" button to a random position on the screen
function teleportNoButton() {
  const randomX = Math.random() * 90; // Random X position
  const randomY = Math.random() * 90; // Random Y position
  noButton.style.position = 'absolute'; // Make sure it's absolute
  noButton.style.left = `${randomX}%`;
  noButton.style.top = `${randomY}%`;
  playChickenSound(); // Play chicken sound when button is clicked
}

// Play a silly sound when "yes" is clicked
function playSillySound() {
  const sillySound = new Audio('assets/sounds/silly_sound.mp3');
  sillySound.play();
}

// Play chicken sound when "no" is clicked
function playChickenSound() {
  const chickenSound = new Audio('assets/sounds/chicken.mp3');
  chickenSound.play();
}

// Show crash popup if "no" was clicked too many times
function showCrashPopup() {
  setTimeout(() => {
    crashPopup.style.display = 'block'; // Show crash popup after delay
  }, 2000);
}

// Reload the page after 5 seconds when the popup is shown
rebootButton.addEventListener('click', () => {
  crashPopup.style.display = 'none';
  setTimeout(() => {
    location.reload();
  }, 5000); // Page reload after 5 seconds
});
