let shakeCount = 0;
let noClickCount = 0;
let isEggOpen = false;
let isShaking = false; // To control when shaking starts and stops
let revealedEgg = ""; // Store the revealed egg for transitions
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
const sillySound = new Audio('assets/sounds/silly_sound.mp3'); // Silly sound on Yes
const chickenSound = new Audio('assets/sounds/chicken.mp3');
const proposalSound = new Audio('assets/sounds/proposal.mp3'); // Preload proposal sound

// Set initial egg state to question mark
egg.src = "assets/images/question_egg.png"; // Show the question mark egg
eggText.innerText = "Click the egg to reveal the mystery!";

// Handle click event to reveal the egg texture
egg.addEventListener("click", revealEgg);

function revealEgg() {
  const eggTextures = [
    { src: "assets/images/egg1.png", rarity: "Common" },  // Egg1 - Common
    { src: "assets/images/egg2.png", rarity: "Rare" },    // Egg2 - Rare
    { src: "assets/images/egg3.png", rarity: "Legendary" } // Egg3 - Legendary
  ];

  const randomEgg = eggTextures[Math.floor(Math.random() * eggTextures.length)];
  egg.src = randomEgg.src; // Set the egg texture
  eggText.innerText = `Shake it to crack open! Rarity: ${randomEgg.rarity}`;
  revealedEgg = randomEgg.src; // Store the revealed egg for later transitions
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

// Simulate the shake effect without long delays
function simulateShake() {
  if (isShaking && shakeCount <= 50) {  // Change to 50 shakes for hatching
    shakeCount++;
    if (shakeCount <= 10) {
      egg.src = revealedEgg; // Keep it the same for now
      playCrackSound(); // Play crack sound when egg starts cracking
    } else if (shakeCount > 10 && shakeCount <= 25) {
      // Transition to half-cracked version immediately
      const halfCrackedEgg = revealedEgg.replace("egg", "half_cracked_egg");
      egg.src = halfCrackedEgg;
      eggText.innerText = "The egg is cracking!";
    } else if (shakeCount > 25 && shakeCount <= 40) {
      // Keep half-cracked egg for a few moments
      egg.src = egg.src;
    } else if (shakeCount > 40) {
      // Transition to opened version of the revealed egg immediately
      const openedEgg = revealedEgg.replace("egg", "opened_egg");
      egg.src = openedEgg;
      eggText.innerText = "Egg opened! Will you be my egg, the chicken to my jockey, hoppy Easter!";
      showButtons(); // Show the Yes/No buttons after the egg opens
      playProposalSound(); // Play proposal sound after egg opens
      isEggOpen = true;
    }
    // Continue simulating the shake without waiting too long
    setTimeout(simulateShake, 100); // Reduced delay to 100ms for smooth transition
  }
}

// Play the silly sound after the Yes button is clicked
function playSillySound() {
  sillySound.play();
}

// Show Yes/No buttons after the egg cracks
function showButtons() {
  yesButton.style.display = "inline-block";  // Make Yes button visible
  noButton.style.display = "inline-block";   // Make No button visible
}

// Handle Yes button click (hides after click)
yesButton.addEventListener('click', () => {
  playSillySound(); // Play the silly sound when "Yes" is clicked
  eggText.innerText = "Egg-cellent, see you hopping soon <3"; // Update the text
  noButton.style.display = "none"; // Hide "no" button after clicking "yes"
  yesButton.style.display = "none"; // Hide "yes" button after clicking

  // Optionally reset the egg or transition to the next part of your game
  setTimeout(() => {
    egg.src = "assets/images/question_egg.png"; // Reset egg to its original state
    eggText.innerText = "Click the egg to reveal the mystery!";
  }, 2000); // Optional delay before resetting the egg (can be removed or customized)
});

// Handle No button click
noButton.addEventListener('click', (e) => {
  e.preventDefault();
  teleportNoButton(); // Teleport "no" button and make chicken sound
  noClickCount++;

  if (noClickCount >= 20 && noClickCount <= 30) {  // Show crash popup after pressing No between 20-30 times
    const randomChance = Math.floor(Math.random() * 10); // Random chance for popup (30% chance)
    if (randomChance < 3) {
      showCrashPopup(); // Show crash popup with the error image
    }
  }
});

// Teleport the "no" button to a random position on the screen
function teleportNoButton() {
  const randomX = Math.random() * 90; // Random X position
  const randomY = Math.random() * 90; // Random Y position
  noButton.style.position = 'absolute'; // Make sure it's absolute
  noButton.style.left = `${randomX}%`;
  noButton.style.top = `${randomY}%`;
  playChickenSound(); // Play the chicken sound when button is clicked
}

// Play chicken sound when "no" is clicked
function playChickenSound() {
  // Increase the pitch of the chicken sound with each "No" click
  chickenSound.playbackRate = 1 + (noClickCount * 0.1); // Increment pitch with each click
  chickenSound.play();
}

// Play crack sound when the egg cracks
function playCrackSound() {
  crackSound.play();
}

// Show crash popup if "no" was clicked too many times (between 20 and 30)
function showCrashPopup() {
  const crashPopupImage = document.createElement('img');
  crashPopupImage.src = 'assets/images/error_popup.png'; // Path to the error popup image
  crashPopupImage.alt = "Error Popup";
  crashPopupImage.style.position = 'absolute';
  crashPopupImage.style.top = '50%';
  crashPopupImage.style.left = '50%';
  crashPopupImage.style.transform = 'translate(-50%, -50%)';
  
  // Set max width and height to make the image smaller
  crashPopupImage.style.maxWidth = '250px'; // Set the max width of the popup to 250px
  crashPopupImage.style.maxHeight = '250px'; // Set the max height of the popup to 250px

  document.body.appendChild(crashPopupImage); // Append the image to the body

  setTimeout(() => {
    location.reload(); // Reload the page after 5 seconds
  }, 5000); // Page reload after 5 seconds
}

// Reload the page after 5 seconds when the popup is shown
rebootButton.addEventListener('click', () => {
  setTimeout(() => {
    location.reload(); // Reload the page
  }, 5000); // Page reload after 5 seconds
});
