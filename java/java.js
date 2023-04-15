const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;

/**
 * Start the game by hiding the start button and shuffling the questions
 */
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

/**
 * Start the game by hiding the start button and shuffling the questions
 */
function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

/**
 * Set the next question
 */
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

/**
 * Show the question and its answers
 * @param {Object} question 
 */
function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

/**
 * Reset the state of the game
 */
function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

/**
 * Select an answer and set the status class
 * @param {Event} e 
 */
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
  }
}

/**
 * Set the status class
 * @param {HTMLElement} element 
 * @param {Boolean} correct 
 */
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

/**
 * Clear the status class
 * @param {HTMLElement} element 
 */
function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

const questions = [
  {
    question: 'Nhạc sĩ nào là người sáng tác ca khúc "Cây đàn sinh viên" ?',
    answers: [
      { text: 'Trịnh Công Sơn', correct: false },
      { text: 'Bảo Chấn', correct: false },
      { text:' Quốc An', correct: true},
      {text: 'Trần Tiến ', correct: false}
    ]
  },
  {
    question: 'Loại cá nào bé hơn cả? ?',
    answers: [
        {text :' Voi', correct: false},
        {text: ' Bống', correct: true},
        {text :' Heo', correct: false},
        {text :' Mập', correct: false}
    ]
  },
  {
    question: 'Sầu riêng Cái Mơn là đặc sản của tỉnh nào?',
    answers: [
      { text: 'Tiền Giang', correct: false },
      { text: 'Cà Mau', correct: false },
      { text: 'Bến Tre', correct: true },
      { text: 'Đồng Tháp', correct: false }
    ]
  },
  {
    question: 'Cướp biển còn được gọi là gì?',
    answers: [
      { text: 'Hải tặc', correct: true},
      { text: 'Lâm tặc', correct: false },
      { text: 'Tin tặc', correct: false },
      { text: 'Đạo tặc', correct: false }
    ]
  },
 
];
