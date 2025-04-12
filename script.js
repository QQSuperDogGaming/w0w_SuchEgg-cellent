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

// Initially hide the buttons
yesButton.style.display = "none";
noButton.style.display = "none";

// Preload sounds to ensure they can be played instantly
const crackSound = new Audio('assets/sounds/crack.mp3');
const sillySound = new Audio('assets/sounds/silly_sound.mp3');
const chickenSound = new Audio('assets/sounds/chicken.mp3');

// Handle click event to reveal the egg texture
egg.addEventListener("click", revealEgg);

function revealEgg() {
  const eggTextures = [
    { src: "assets/images/egg1.png", rarity: "Common" },  // Egg1 - Common
    { src: "assets/images/egg2.png", rarity: "Rare" },    // Egg2 - Rare
    { src: "assets/images/egg3.gif", rarity: "Legendary" } // Egg3 - Legendary
  ];

  const randomEgg = eggTextures[Math.floor(Math.random() * eggTextures.length)];
  egg.src = randomEgg.src; // Set the egg texture
  eggText.innerText = `Shake it to crack open! Rarity: ${randomEgg.rarity}`;
  egg.removeEventListener("click", revealEgg); // Remove the click event after revealing egg texture
  startShaking(); // Start shaking the egg
}

// Simulate the shake action with intervals
function startShaking() {
  if (!isShaking) {
    isShaking = true;
    shakeCount = 0;
    eggText.innerText = "Shake the screen!";
    simulateShake(); // Start shaking simulation
  }
}

// Simulate the shake effect
function simulateShake() {
  if (isShaking && shakeCount <= 20) {
    shakeCount++;
    setTimeout(() => {
      if (shakeCount <= 5) {
        egg.src = egg.src; // Keep it the same for now
        playCrackSound(); // Play crack sound when egg starts cracking
      } else if (shakeCount > 5 && shakeCount < 15) {
        // Change to half-cracked egg
        const halfCrackedEggTextures = [
          "assets/images/half_cracked_egg1.png", // Half-cracked egg texture 1
          "assets/images/half_cracked_egg2.png", // Half-cracked egg texture 2
          "assets/images/half_cracked_egg3.png"  // Half-cracked egg texture 3
        ];
        const randomHalfCrackedEgg = halfCrackedEggTextures[Math.floor(Math.random() * halfCrackedEggTextures.length)];
        egg.src = randomHalfCrackedEgg;
        eggText.innerText = "The egg is cracking!";
      } else if (shakeCount >= 15) {
        // Change to one of the opened egg textures
        const openedEggTextures = [
          "assets/images/opened_egg1.png", // Opened egg texture 1
          "assets/images/opened_egg2.png", // Opened egg texture 2
          "assets/images/opened_egg3.png"  // Opened egg texture 3
        ];
        const randomOpenedEgg = openedEggTextures[Math.floor(Math.random() * openedEggTextures.length)];
        egg.src = randomOpenedEgg;
        eggText.innerText = "Egg opened! Will you be my egg, the chicken to my jockey, hoppy Easter!";
        showButtons(); // Show the Yes/No buttons after the egg opens
        isEggOpen = true;
      }
      simulateShake(); // Continue simulating the shake
    }, 300); // Adjust the interval to control how fast the shake effect occurs
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
