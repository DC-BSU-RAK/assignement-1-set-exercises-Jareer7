// Get elements
const rgbDisplay = document.querySelector('.rgb-display');
const optionsContainer = document.querySelector('.options');
const feedback = document.querySelector('.feedback');
const livesText = document.getElementById('lives');
const scoreText = document.getElementById('score');
const restartBtn = document.getElementById('restart');

// Initial game state
let lives = 3;
let score = 0;
let correctColor = "";

// Generate a random RGB color
function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Start a new round
function newRound() {
  feedback.textContent = "";
  optionsContainer.innerHTML = "";

  correctColor = randomColor();
  rgbDisplay.textContent = correctColor;

  // Add correct color and two random others
  const colors = [correctColor];
  while (colors.length < 3) {
    let color = randomColor();
    if (!colors.includes(color)) colors.push(color);
  }

  // Shuffle the colors
  colors.sort(() => Math.random() - 0.5);

  // Create buttons
  colors.forEach(color => {
    const div = document.createElement('div');
    div.classList.add('option');
    div.style.backgroundColor = color;
    div.addEventListener('click', () => checkAnswer(color));
    optionsContainer.appendChild(div);
  });
}

// Handle color guess
function checkAnswer(selectedColor) {
  if (selectedColor === correctColor) {
    score++;
    feedback.textContent = "🎉 Correct!";
    newRound();
  } else {
    lives--;
    feedback.textContent = "❌ Wrong!";
    livesText.textContent = lives;
    if (lives === 0) {
      gameOver();
    }
  }
  scoreText.textContent = score;
}

// End the game
function gameOver() {
  feedback.textContent = `Game Over! Final Score: ${score}`;
  restartBtn.classList.remove('hidden');
  optionsContainer.innerHTML = "";
}

// Restart game
restartBtn.addEventListener('click', () => {
  lives = 3;
  score = 0;
  livesText.textContent = lives;
  scoreText.textContent = score;
  restartBtn.classList.add('hidden');
  newRound();
});

// Start the game
newRound();
