// Use the categories + tieBreaker from questions.js
// e.g. tieBreaker = { question: "...", answer: 38000000 }

let teamAScore = 0;
let teamBScore = 0;
let teamAName = "Team A";
let teamBName = "Team B";

let currentQuestion = null;
let currentAnswer = null;
let currentValue = 0;
let currentMedia = null;
let currentTeam = 1; // 1 => Team A, 2 => Team B

let timerInterval = null;
let timeLeft = 60;

// DOM refs
const startScreen = document.getElementById('start-screen');
const topBar = document.getElementById('top-bar');
const startGameBtn = document.getElementById('start-game-btn');
const teamAInput = document.getElementById('teamA-input');
const teamBInput = document.getElementById('teamB-input');

const boardContainer = document.getElementById('board-container');
const board = document.getElementById('jeopardy-board');

const turnIndicator = document.getElementById('turn-indicator');

const questionModal = document.getElementById('question-modal');
const mediaContainer = document.getElementById('media-container');
const showQuestionBtn = document.getElementById('show-question-btn');
const questionText = document.getElementById('question-text');

const timeRemainingEl = document.getElementById('time-remaining');
const timesUp = document.getElementById('times-up');

const revealAnswerBtn = document.getElementById('reveal-answer-btn');
const answerText = document.getElementById('answer-text');

const correctBtn = document.getElementById('correct-btn');
const stolenBtn = document.getElementById('stolen-btn');
const wrongBtn = document.getElementById('wrong-btn');

const tieBreakerModal = document.getElementById('tie-breaker-modal');
const tieBreakerQuestionEl = document.getElementById('tie-breaker-question');
const tieTeamAGuessInput = document.getElementById('tie-team-a-guess');
const tieTeamBGuessInput = document.getElementById('tie-team-b-guess');
const tieSubmitBtn = document.getElementById('tie-submit-btn');
const tieTeamALabel = document.getElementById('tie-team-a-label');
const tieTeamBLabel = document.getElementById('tie-team-b-label');
const tieShowAnswerBtn = document.getElementById('tie-show-btn');
const tieAnswer = document.getElementById('tie-answer-text');

const winnerScreen = document.getElementById('winner-screen');
const winnerText = document.getElementById('winner-text');

const teamAScoreEl = document.getElementById('team-a-score');
const teamBScoreEl = document.getElementById('team-b-score');
const teamANameEl = document.getElementById('team-a-name');
const teamBNameEl = document.getElementById('team-b-name');

var initialClick = true;

document.body.addEventListener('click', () => {
	if (initialClick) {
		startScreen.style.display = 'flex';
		topBar.style.display = 'flex';
		initialClick = false;
	}
})

// START
startGameBtn.addEventListener('click', () => {
  teamAName = teamAInput.value.trim() || "Team A";
  teamBName = teamBInput.value.trim() || "Team B";

  teamANameEl.textContent = teamAName;
  teamBNameEl.textContent = teamBName;

  startScreen.style.display = 'none';
  boardContainer.style.display = 'block';

  currentTeam = 1;
  updateTurnIndicator();
  document.getElementById('title').style.display = 'none';
  buildBoard();
});

function buildBoard() {
  board.innerHTML = '';
  const numCategories = categories.length;
  board.style.gridTemplateColumns = `repeat(${numCategories}, 1fr)`;

  // Category headers
  categories.forEach(cat => {
    const header = document.createElement('div');
    header.classList.add('category-header');
    header.textContent = cat.name;
    board.appendChild(header);
  });

  // 5 questions per category
  for (let row = 0; row < 5; row++) {
    categories.forEach((cat, colIndex) => {
      const q = cat.questions[row];
      const cell = document.createElement('div');
      cell.classList.add('question-cell');
      cell.textContent = `$${q.value}`;
      cell.addEventListener('click', () => showQuestion(colIndex, row));
      board.appendChild(cell);
    });
  }
}

function showQuestion(categoryIndex, questionIndex) {
  const questionObj = categories[categoryIndex].questions[questionIndex];
  if (questionObj.used) return;

  questionObj.used = true;
  currentQuestion = questionObj.question;
  currentAnswer = questionObj.answer;
  currentValue = questionObj.value;
  currentMedia = questionObj.media || null;

  // Gray out cell
  const cellIndex = categories.length + questionIndex * categories.length + categoryIndex;
  board.children[cellIndex].classList.add('used');

  resetModal();
  loadMedia(currentMedia);
  questionModal.style.display = 'flex';

  if (currentMedia) {
    showQuestionBtn.style.display = 'inline-block';
    questionText.style.display = 'none';
  } else {
    showQuestionBtn.style.display = 'none';
    questionText.style.display = 'block';
    questionText.textContent = currentQuestion;
    startTimer(60);
  }
  questionModal.focus();
}

function loadMedia(media) {
  mediaContainer.innerHTML = '';
  if (!media) return;
  if (media.type === 'image') {
    const img = document.createElement('img');
    img.src = media.src;
    mediaContainer.appendChild(img);
  } else if (media.type === 'audio') {
    const audio = document.createElement('audio');
    audio.controls = true;
    audio.src = media.src;
    mediaContainer.appendChild(audio);
  } else if (media.type === 'video') {
    const video = document.createElement('video');
    video.controls = true;
    video.width = 400;
    video.src = media.src;
    mediaContainer.appendChild(video);
  }
}

// Show question
showQuestionBtn.addEventListener('click', () => {
  showQuestionBtn.style.display = 'none';
  questionText.style.display = 'block';
  questionText.textContent = currentQuestion;
  startTimer(60);
});

// Answer reveal
var showFn = () => {
	stopTimer();
    answerText.textContent = currentAnswer;
    answerText.style.display = 'block';
}
revealAnswerBtn.addEventListener('click', () => showFn());

// Correct / Stolen / Wrong
var correctFn = () => {
  if (currentTeam === 1) {
    teamAScore += currentValue;
  } else {
    teamBScore += currentValue;
  }
  updateScores();
  endQuestion();
};
correctBtn.addEventListener('click', () => correctFn());

var stolenFn = () => {
  if (currentTeam === 1) {
    teamBScore += currentValue;
  } else {
    teamAScore += currentValue;
  }
  updateScores();
  endQuestion();
}

stolenBtn.addEventListener('click', () => stolenFn());
questionModal.addEventListener('keydown', (e) => {
	if (e.key == 's'){
		stolenFn();
	}
	else if (e.key == 'c'){
		correctFn();
	}
	else if (e.key == 'a'){
		showFn();
	}
	else if (e.key == 'w'){
		wrongFn();
	}
})
var wrongFn = () => {
	endQuestion();
}
wrongBtn.addEventListener('click', () => wrongFn());

function endQuestion() {
  currentTeam = (currentTeam === 1) ? 2 : 1;
  updateTurnIndicator();
  closeQuestionModal();

  if (allQuestionsUsed()) {
    checkForTieOrWinner();
  }
}

function closeQuestionModal() {
  stopTimer();
  questionModal.style.display = 'none';
}

function resetModal() {
  answerText.style.display = 'none';
  answerText.textContent = '';
  timesUp.style.display = 'none';
  timeRemainingEl.textContent = '60';
  showQuestionBtn.style.display = 'none';
  questionText.style.display = 'none';
  mediaContainer.innerHTML = '';
}

function startTimer(seconds) {
  stopTimer();
  timeLeft = seconds;
  timeRemainingEl.textContent = timeLeft;
  timesUp.style.display = 'none';
  timerInterval = setInterval(() => {
    timeLeft--;
    timeRemainingEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      stopTimer();
      timesUp.style.display = 'block';
    }
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function updateScores() {
  teamAScoreEl.textContent = teamAScore;
  teamBScoreEl.textContent = teamBScore;
}

function updateTurnIndicator() {
  if (currentTeam === 1) {
    turnIndicator.textContent = `It's ${teamAName}'s turn!`;
  } else {
    turnIndicator.textContent = `It's ${teamBName}'s turn!`;
  }
}

// Check if all used
function allQuestionsUsed() {
  for (const cat of categories) {
    for (const q of cat.questions) {
      if (!q.used) return false;
    }
  }
  return true;
}

function checkForTieOrWinner() {
  if (teamAScore === teamBScore) {
    showTieBreaker();
  } else {
    showWinnerSplash();
  }
}

/* =======================
   TIE-BREAKER
======================= */
function showTieBreaker() {
  // Display the question
  tieBreakerQuestionEl.textContent = tieBreaker.question;
  tieTeamAGuessInput.value = '';
  tieTeamBGuessInput.value = '';
  tieTeamALabel.textContent = teamAName + "'s Answer";
  tieTeamBLabel.textContent = teamBName + "'s Answer";
  tieBreakerModal.style.display = 'flex';
}

tieShowAnswerBtn.addEventListener('click', () => {
	tieAnswer.style.display = 'block';
	tieAnswer.textContent = tieBreaker.answer;
});

tieSubmitBtn.addEventListener('click', () => {
  // Grab both guesses
  const aGuess = parseInt(tieTeamAGuessInput.value, 10);
  const bGuess = parseInt(tieTeamBGuessInput.value, 10);

  // If invalid guesses, do nothing or handle error
  if (isNaN(aGuess) || isNaN(bGuess)) {
    alert("Please enter valid numbers for both guesses!");
    return;
  }

  // Compare absolute differences to tieBreaker.answer
  const correctNumber = tieBreaker.answer; // e.g., 38000000
  const diffA = Math.abs(correctNumber - aGuess);
  const diffB = Math.abs(correctNumber - bGuess);

  if (diffA < diffB) {
    // Team A closer
    teamAScore++;
  } else if (diffB < diffA) {
    // Team B closer
    teamBScore++;
  } else {
    // Exactly the same difference => up to you how to handle
    // For example, we can do a random pick or ask them to guess again
    alert("It's exactly a tie again! We'll do another tie-breaker question!");
    return; // or showTieBreaker() again
  }

  updateScores();
  tieBreakerModal.style.display = 'none';
  checkIfStillTied();
});

function checkIfStillTied() {
  if (teamAScore === teamBScore) {
    // Another tie, do another guess or a new question
    alert("Still tied! Another guess needed...");
    showTieBreaker();
  } else {
    showWinnerSplash();
  }
}

/* =======================
   WINNER SPLASH
======================= */
function showWinnerSplash() {
  let winnerName = (teamAScore > teamBScore) ? teamAName : teamBName;
  winnerText.textContent = `${winnerName} Wins!`;
  winnerScreen.style.display = 'flex';
  startConfetti();
}

// Clicking the entire winner screen => reset to start
winnerScreen.addEventListener('click', () => {
  winnerScreen.style.display = 'none';
  stopConfetti();
  resetGameToStartScreen();
});

/* =======================
   CONFETTI
======================= */
let confettiElements = [];

function startConfetti() {
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.backgroundColor = randomColor();
    confetti.style.left = Math.random() * 100 + '%';
    const size = Math.floor(Math.random() * 10 + 5) + 'px';
    confetti.style.width = size;
    confetti.style.height = size;
    const duration = Math.random() * 2 + 2; 
    confetti.style.animationDuration = duration + 's';
    document.body.appendChild(confetti);
    confettiElements.push(confetti);

    // Remove after finishing
    setTimeout(() => {
      if (confetti.parentNode) confetti.remove();
    }, duration * 1000);
  }
}

function stopConfetti() {
  confettiElements.forEach(el => {
    if (el.parentNode) el.remove();
  });
  confettiElements = [];
}

function randomColor() {
  const colors = ['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ee82ee'];
  return colors[Math.floor(Math.random() * colors.length)];
}

/* =======================
   RESET GAME
======================= */
function resetGameToStartScreen() {
  teamAScore = 0;
  teamBScore = 0;
  updateScores();

  // Mark all questions as unused
  for (const cat of categories) {
    for (const q of cat.questions) {
      q.used = false;
    }
  }

  boardContainer.style.display = 'none';
  startScreen.style.display = 'flex';
  document.getElementById('title').style.display = 'block';
}
