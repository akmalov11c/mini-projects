const homeScreen = document.getElementById("home-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-quiz-btn");
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("quiz-options");
const currentQuestion = document.getElementById("current-question");
const totalQuestions = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScore = document.getElementById("final-score");
const maxScore = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-quiz-btn");
const progressBar = document.getElementById("progress");

const quizData = [
  {
    question: "What is the capital of France?",
    options: [
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
      { text: "Paris", correct: true },
      { text: "Rome", correct: false },
    ],
  },
  {
    question: "What is the largest planet in our solar system?",
    options: [
      { text: "Earth", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Mars", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: [
      { text: "Charles Dickens", correct: false },
      { text: "Jane Austen", correct: false },
      { text: "William Shakespeare", correct: true },
      { text: "Mark Twain", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for water?",
    options: [
      { text: "H2O", correct: true },
      { text: "CO2", correct: false },
      { text: "O2", correct: false },
      { text: "NaCl", correct: false },
    ],
  },
  {
    question: "What is the capital of Japan?",
    options: [
      { text: "Seoul", correct: false },
      { text: "Beijing", correct: false },
      { text: "Tokyo", correct: true },
      { text: "Bangkok", correct: false },
    ],
  },
  {
    question: "What is the currency of Japan?",
    options: [
      { text: "Yen", correct: true },
      { text: "Won", correct: false },
      { text: "Dollar", correct: false },
      { text: "Euro", correct: false },
    ],
  },
  {
    question: "What is the largest mammal?",
    options: [
      { text: "Elephant", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Giraffe", correct: false },
      { text: "Great White Shark", correct: false },
    ],
  },
  {
    question: "What is the main ingredient in guacamole?",
    options: [
      { text: "Tomato", correct: false },
      { text: "Avocado", correct: true },
      { text: "Pepper", correct: false },
      { text: "Onion", correct: false },
    ],
  },
  {
    question: "What is the hardest natural substance on Earth?",
    options: [
      { text: "Gold", correct: false },
      { text: "Diamond", correct: true },
      { text: "Iron", correct: false },
      { text: "Platinum", correct: false },
    ],
  },
  {
    question: "What is the smallest country in the world?",
    options: [
      { text: "Monaco", correct: false },
      { text: "Vatican City", correct: true },
      { text: "San Marino", correct: false },
      { text: "Liechtenstein", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

totalQuestions.textContent = quizData.length;
maxScore.textContent = quizData.length;

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = score;
  homeScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  answerDisabled = false;
  const currentQuizData = quizData[currentQuestionIndex];
  currentQuestion.textContent = currentQuestionIndex + 1;
  const progressPercentage =
    ((currentQuestionIndex + 1) / quizData.length) * 100;
  progressBar.style.width = `${progressPercentage}%`;

  questionElement.textContent = currentQuizData.question;
  optionsContainer.innerHTML = "";

  currentQuizData.options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option.text;
    button.classList.add("option__btn");
    button.dataset.correct = option.correct;
    button.addEventListener("click", selectOption);
    optionsContainer.appendChild(button);
  });
}

function selectOption(event) {
  if (answerDisabled) return;

  answerDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(optionsContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

function showResult() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScore.textContent = score;

  const percentage = Math.round((score / quizData.length) * 100);

  if (percentage === 100) {
    resultMessage.textContent = "Excellent! You scored " + percentage + "%";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Good job! You scored " + percentage + "%";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! You scored " + percentage + "%";
  } else if (percentage >= 40) {
    resultMessage.textContent =
      "You can do better! You scored " + percentage + "%";
  } else {
    resultMessage.textContent = "Keep trying! You scored " + percentage + "%";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}
