let shakeCount = 0;
let noClickCount = 0;
let isEggOpen = false;
let isShaking = false; // To control when shaking starts and stops
const egg = document.getElementById("egg");
const eggText = document.getElementById("eggText");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const crashPopup = document.getElementById("crashPopup");
const rebootButton = document.getElementById("rebootButton");
const body = document.body;

// Initially hide the buttons
yesButton.style.display = "none";
noButton.style.display = "none";

// Preload sounds to ensure they can be played instantly
const crackSound = new Audio('assets/sounds/crack.mp3');
const sillySound = new Audio('assets/sounds/silly_sound.mp3');
const chickenSound = new Audio('assets/sounds/chicken.mp3');

// Handle shake event with a debounce to prevent too many triggers
window.addEventListener('devicemotion', handleShake);

function handleShake(event) {
  // Throttle the shake detection using setTimeout to avoid warning and multiple triggers
  if (shakeTimeout) clearTimeout(shakeTimeout);
  shakeTimeout = setTimeout(() => {
    if (event.accelerationIncludingGravity.x > 15 || event.accelerationIncludingGravity.y > 15 || event.accelerationIncludingGravity.z > 15) {
      shakeCount++;

      if (!isEggOpen) {
        if (shakeCount > 10 && shakeCount < 30) {
          egg.src = "assets/images/half_cracked_egg.png"; // Half cracked egg after some shaking
          eggText.innerText = "The egg is cracking!";
          playCrackSound(); // Play crack sound when egg starts cracking
        } else if (shakeCount >= 30) {
          egg.src = "assets/images/cracked_egg.png"; // Egg fully cracked after more shaking
          eggText.innerText = "Egg opened! Will you be my egg, the chicken to my jockey, hoppy Easter!";
          showButtons(); // Show the Yes/No buttons after the egg opens
          isEggOpen = true; // Set flag to prevent further cracking
        }
      }
    }
  }, 300); // 300 ms debounce to slow down the shake detection and avoid rapid triggers
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

  if (noClickCount >= 20 && noClickCount <= 30) {  // Set crash rate between 20 to 30 clicks
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
  sillySound.play();
}

// Play chicken sound when "no" is clicked
function playChickenSound() {
  chickenSound.play();
}

// Play crack sound when the egg cracks
function playCrackSound() {
  crackSound.play();
}

// Show crash popup if "no" was clicked too many times (between 20 and 30)
function showCrashPopup() {
  setTimeout(() => {
    crashPopup.style.display = 'block'; // Show crash popup after delay
    body.style.backgroundColor = 'black'; // Turn the background black
  }, 2000);
}

// Reload the page after 5 seconds when the popup is shown
rebootButton.addEventListener('click', () => {
  crashPopup.style.display = 'none';
  body.style.backgroundColor = ''; // Restore original background color
  setTimeout(() => {
    location.reload();
  }, 5000); // Page reload after 5 seconds
});
