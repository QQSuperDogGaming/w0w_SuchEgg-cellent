let clickCount = 0; // Count how many times the user clicks the "no" button
let chickenPitch = 1; // Start with normal pitch for the chicken sound

const egg = document.getElementById('egg');
const memeText = document.getElementById('memeText');
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const crashPopup = document.getElementById('crashPopup');
const rebootButton = document.getElementById('rebootButton');

// Event listeners for buttons
noButton.addEventListener('mouseover', () => {
  teleportNoButton(); // Teleport "no" button when mouse hovers
  playChickenSound();
});

noButton.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  teleportNoButton(); // Teleport "no" button when clicked
  playChickenSound();

  clickCount++;

  // Change to half cracked egg after 3 clicks and play crack sound
  if (clickCount >= 3 && clickCount < 5) {
    egg.style.backgroundImage = "url('assets/images/half_cracked_egg.png')";
    playCrackSound(); // Play crack sound when egg cracks
  }

  // If the "no" button has been clicked enough times, show the crash popup
  if (clickCount >= 5) {
    showCrashPopup();
  }
});

yesButton.addEventListener('click', () => {
  playYesSound();
  changeMeme('egg-cellent');
  playEggOpenedSound(); // Play egg opened sound when fully opened
  noButton.style.display = 'none'; // Hide "no" button after clicking "yes"
});

// Show the crash popup
function showCrashPopup() {
  setTimeout(() => {
    crashPopup.style.display = 'block'; // Show the popup after 2 seconds
  }, 2000);
}

function changeMeme(type) {
  switch (type) {
    case 'egg-cellent':
      memeText.innerText = 'Egg-cellent!';
      egg.style.backgroundImage = "url('assets/images/cracked_egg.png')"; // Full cracked egg for "Egg-cellent!"
      break;
    default:
      memeText.innerText = 'Will you be my egg for Easter?';
      egg.style.backgroundImage = "url('assets/images/egg.png')"; // Default egg image
  }
}

function playChickenSound() {
  const chickenSound = new Audio('assets/sounds/chicken.mp3');  // Chicken sound for "no" button
  chickenSound.playbackRate = chickenPitch; // Adjust pitch based on click count
  chickenSound.play();

  // Increase the pitch each time the button is clicked
  chickenPitch += 0.1; // Increase pitch after every click
}

function playYesSound() {
  const yesSound = new Audio('assets/sounds/silly_sound.mp3');  // Silly sound for "yes" button
  yesSound.play();
}

// Play the crack sound
function playCrackSound() {
  const crackSound = new Audio('assets/sounds/crack.mp3'); // Crack sound for half-cracked egg
  crackSound.play();
}

// Play the egg opened sound
function playEggOpenedSound() {
  const eggOpenedSound = new Audio('assets/sounds/egg_opened.mp3'); // Egg opened sound
  eggOpenedSound.play();
}

// Teleport the "no" button to a random position
function teleportNoButton() {
  const randomX = Math.random() * 80; // Random X position
  const randomY = Math.random() * 80; // Random Y position
  noButton.style.position = 'absolute'; // Make sure it's absolute
  noButton.style.left = `${randomX}%`;
  noButton.style.top = `${randomY}%`;
}

// Reboot button (same button for close and reload)
rebootButton.addEventListener('click', () => {
  crashPopup.style.display = 'none';  // Close the popup
  setTimeout(() => {
    location.reload();  // Reload the page after 2 seconds
  }, 2000);  // Delay the reload for 2 seconds
});
