let currentMeme = 1;

const egg = document.getElementById('egg');
const memeText = document.getElementById('memeText');
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');

noButton.addEventListener('mouseover', () => {
  noButton.classList.add('no-move');
  playChickenSound();
});

noButton.addEventListener('click', () => {
  playChickenSound();
  changeMeme('hoppy');
});

yesButton.addEventListener('click', () => {
  playYesSound();
  changeMeme('egg-cellent');
});

function changeMeme(type) {
  switch (type) {
    case 'hoppy':
      memeText.innerText = 'Hoppy Easter!';
      // Add bunny hopping animation or any changes for this meme
      egg.style.backgroundImage = "url('bunny_egg.png')";
      break;
    case 'egg-cellent':
      memeText.innerText = 'Egg-cellent!';
      // Add egg-cracking animation or any changes for this meme
      egg.style.backgroundImage = "url('cracked_egg.png')";
      break;
    default:
      memeText.innerText = 'Will you be my egg for Easter?';
      egg.style.backgroundImage = "url('egg.png')";
  }
}

function playChickenSound() {
  const chickenSound = new Audio('chicken.mp3');  // Replace with your own sound file
  chickenSound.play();
}

function playYesSound() {
  const yesSound = new Audio('silly_sound.mp3');  // Replace with your own sound file
  yesSound.play();
}
