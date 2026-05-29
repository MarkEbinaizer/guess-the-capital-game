// A list of countries, their capitals, and four answer choices.
// Keeping the data in one place makes it easy to add more questions later.
const questions = [
  { country: "India", capital: "New Delhi", options: ["New Delhi", "Mumbai", "Kolkata", "Chennai"] },
  { country: "United States", capital: "Washington, D.C.", options: ["Washington, D.C.", "New York", "Los Angeles", "Chicago"] },
  { country: "Canada", capital: "Ottawa", options: ["Toronto", "Vancouver", "Ottawa", "Montreal"] },
  { country: "United Kingdom", capital: "London", options: ["London", "Manchester", "Birmingham", "Liverpool"] },
  { country: "France", capital: "Paris", options: ["Lyon", "Marseille", "Nice", "Paris"] },
  { country: "Germany", capital: "Berlin", options: ["Munich", "Berlin", "Hamburg", "Frankfurt"] },
  { country: "Italy", capital: "Rome", options: ["Milan", "Naples", "Rome", "Venice"] },
  { country: "Spain", capital: "Madrid", options: ["Barcelona", "Madrid", "Seville", "Valencia"] },
  { country: "Portugal", capital: "Lisbon", options: ["Lisbon", "Porto", "Faro", "Coimbra"] },
  { country: "Brazil", capital: "Brasilia", options: ["Rio de Janeiro", "Sao Paulo", "Brasilia", "Salvador"] },
  { country: "Argentina", capital: "Buenos Aires", options: ["Cordoba", "Rosario", "Mendoza", "Buenos Aires"] },
  { country: "Mexico", capital: "Mexico City", options: ["Guadalajara", "Cancun", "Mexico City", "Monterrey"] },
  { country: "Japan", capital: "Tokyo", options: ["Kyoto", "Osaka", "Tokyo", "Nagoya"] },
  { country: "China", capital: "Beijing", options: ["Shanghai", "Beijing", "Shenzhen", "Guangzhou"] },
  { country: "South Korea", capital: "Seoul", options: ["Busan", "Seoul", "Incheon", "Daegu"] },
  { country: "Australia", capital: "Canberra", options: ["Sydney", "Melbourne", "Canberra", "Brisbane"] },
  { country: "New Zealand", capital: "Wellington", options: ["Auckland", "Christchurch", "Wellington", "Hamilton"] },
  { country: "South Africa", capital: "Pretoria", options: ["Cape Town", "Johannesburg", "Pretoria", "Durban"] },
  { country: "Egypt", capital: "Cairo", options: ["Alexandria", "Giza", "Luxor", "Cairo"] },
  { country: "Kenya", capital: "Nairobi", options: ["Mombasa", "Nairobi", "Kisumu", "Nakuru"] },
  { country: "Nigeria", capital: "Abuja", options: ["Lagos", "Kano", "Abuja", "Ibadan"] },
  { country: "Saudi Arabia", capital: "Riyadh", options: ["Jeddah", "Mecca", "Medina", "Riyadh"] },
  { country: "United Arab Emirates", capital: "Abu Dhabi", options: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman"] },
  { country: "Thailand", capital: "Bangkok", options: ["Phuket", "Chiang Mai", "Bangkok", "Pattaya"] },
  { country: "Indonesia", capital: "Jakarta", options: ["Bali", "Jakarta", "Bandung", "Surabaya"] },
  { country: "Malaysia", capital: "Kuala Lumpur", options: ["George Town", "Johor Bahru", "Kuala Lumpur", "Malacca"] },
  { country: "Singapore", capital: "Singapore", options: ["Singapore", "Jurong", "Tampines", "Woodlands"] },
  { country: "Russia", capital: "Moscow", options: ["Saint Petersburg", "Moscow", "Kazan", "Sochi"] },
  { country: "Turkey", capital: "Ankara", options: ["Istanbul", "Izmir", "Ankara", "Bursa"] },
  { country: "Greece", capital: "Athens", options: ["Athens", "Thessaloniki", "Patras", "Heraklion"] },
  { country: "Netherlands", capital: "Amsterdam", options: ["Rotterdam", "The Hague", "Utrecht", "Amsterdam"] },
  { country: "Switzerland", capital: "Bern", options: ["Zurich", "Geneva", "Bern", "Basel"] },
  { country: "Sweden", capital: "Stockholm", options: ["Gothenburg", "Malmo", "Stockholm", "Uppsala"] },
  { country: "Norway", capital: "Oslo", options: ["Bergen", "Oslo", "Trondheim", "Stavanger"] },
  { country: "Ireland", capital: "Dublin", options: ["Cork", "Galway", "Dublin", "Limerick"] },
  { country: "Poland", capital: "Warsaw", options: ["Krakow", "Gdansk", "Warsaw", "Lodz"] }
];

const totalQuestions = 10;

const gameScreen = document.getElementById("gameScreen");
const finalScreen = document.getElementById("finalScreen");
const countryName = document.getElementById("countryName");
const answerButtons = document.getElementById("answerButtons");
const scoreText = document.getElementById("score");
const questionCounter = document.getElementById("questionCounter");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("nextButton");
const finalScore = document.getElementById("finalScore");
const finalMessage = document.getElementById("finalMessage");
const playAgainButton = document.getElementById("playAgainButton");

let currentQuestion = null;
let lastQuestionIndex = -1;
let score = 0;
let questionNumber = 0;
let answered = false;
let autoNextTimer = null;

function startGame() {
  score = 0;
  questionNumber = 0;
  lastQuestionIndex = -1;
  scoreText.textContent = score;
  gameScreen.classList.remove("hidden");
  finalScreen.classList.add("hidden");
  showQuestion();
}

function showQuestion() {
  clearTimeout(autoNextTimer);
  answered = false;
  nextButton.disabled = true;
  nextButton.textContent = "Next Question";
  feedback.textContent = "Choose an answer";
  feedback.className = "feedback";
  answerButtons.innerHTML = "";

  questionNumber++;
  questionCounter.textContent = `Question ${questionNumber} of ${totalQuestions}`;

  const questionIndex = getRandomQuestionIndex();
  currentQuestion = questions[questionIndex];
  lastQuestionIndex = questionIndex;

  countryName.textContent = currentQuestion.country;

  // Shuffle the options so the correct answer is not always in the same place.
  const shuffledOptions = shuffleArray(currentQuestion.options);

  shuffledOptions.forEach(function(option) {
    const button = document.createElement("button");
    button.textContent = option;
    button.className = "answer-button";
    button.addEventListener("click", function() {
      checkAnswer(button, option);
    });
    answerButtons.appendChild(button);
  });
}

function getRandomQuestionIndex() {
  let randomIndex = Math.floor(Math.random() * questions.length);

  // If possible, choose again when the same question appears twice in a row.
  while (questions.length > 1 && randomIndex === lastQuestionIndex) {
    randomIndex = Math.floor(Math.random() * questions.length);
  }

  return randomIndex;
}

function checkAnswer(selectedButton, selectedAnswer) {
  if (answered) {
    return;
  }

  answered = true;
  nextButton.disabled = false;

  const isCorrect = selectedAnswer === currentQuestion.capital;

  if (isCorrect) {
    score++;
    scoreText.textContent = score;
    selectedButton.classList.add("correct");
    feedback.textContent = "Correct!";
    feedback.classList.add("correct");
  } else {
    selectedButton.classList.add("wrong");
    feedback.textContent = `Correct answer: ${currentQuestion.capital}`;
    feedback.classList.add("wrong");
    showCorrectAnswer();
  }

  disableAnswerButtons();

  // Move ahead automatically so the game feels smooth.
  autoNextTimer = setTimeout(goToNextStep, 1400);
}

function showCorrectAnswer() {
  const buttons = document.querySelectorAll(".answer-button");

  buttons.forEach(function(button) {
    if (button.textContent === currentQuestion.capital) {
      button.classList.add("correct");
    }
  });
}

function disableAnswerButtons() {
  const buttons = document.querySelectorAll(".answer-button");

  buttons.forEach(function(button) {
    button.disabled = true;
  });
}

function goToNextStep() {
  clearTimeout(autoNextTimer);

  if (questionNumber >= totalQuestions) {
    showFinalScreen();
  } else {
    showQuestion();
  }
}

function showFinalScreen() {
  gameScreen.classList.add("hidden");
  finalScreen.classList.remove("hidden");
  finalScore.textContent = score;

  if (score >= 8) {
    finalMessage.textContent = "Excellent work. You know your capitals well!";
  } else if (score >= 5) {
    finalMessage.textContent = "Nice effort. A little more practice and you will level up fast.";
  } else {
    finalMessage.textContent = "Good start. Replay the game and try to beat your score.";
  }
}

function shuffleArray(array) {
  const newArray = [...array];

  for (let i = newArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const currentItem = newArray[i];
    newArray[i] = newArray[randomIndex];
    newArray[randomIndex] = currentItem;
  }

  return newArray;
}

nextButton.addEventListener("click", goToNextStep);
playAgainButton.addEventListener("click", startGame);

startGame();
