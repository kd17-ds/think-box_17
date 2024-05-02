// Get references to HTML elements
const submit = document.getElementById("submit");
const questionlist = document.getElementById("questionlist");

// Function to switch between different screens
function switchScreen(curr, next) {
  let currScreen = "screen" + curr;
  let nextScreen = "screen" + next;

  // Hide current screen and show the next screen
  document.getElementById(currScreen).classList.add("hide");
  document.getElementById(nextScreen).classList.remove("hide");
}

// Function to shuffle an array
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

// Array to store quiz questions
const questions = [];
const quizQuestion = document.getElementById("quizQuestion");
let currentQue = 0;
let answers = [null, null, null, null, null, null, null, null, null, null];

// Function to start the quiz
function startQuiz() {
  // Shuffle the array of questions
  shuffle(cricketQuestions);

  // Select the first 10 questions for the quiz
  for (let i = 0; i < 10; i++) {
    questions.push(cricketQuestions[i]);
  }

  // Switch to the quiz screen and display the first question
  switchScreen(1, 2);
  displayQuestion();
  listManage();
}

// Function to display the current quiz question
function displayQuestion() {
  let temp = "";

  // Loop through the options for the current question
  for (let i = 0; i <= 3; i++) {
    if (answers[currentQue] === i) {
      // Display selected option with a check icon
      temp += `<div onclick="setAnswer(${i})"><i class="fa-solid fa-circle-check"></i> ${questions[currentQue].options[i]}</div>`;
    } else {
      // Display unselected option with a regular circle icon
      temp += `<div onclick="setAnswer(${i})"><i class="fa-regular fa-circle"></i> ${questions[currentQue].options[i]}</div>`;
    }
  }

  // Display the current question and options
  quizQuestion.innerHTML = `
  <div class="text"><b>( Q - ${currentQue + 1} )</b> &nbsp; ${
    questions[currentQue].text
  }</div>
  <div class="options">
 ${temp}
  </div>`;
}

// Function to set the selected answer for the current question
function setAnswer(answer) {
  answers[currentQue] = answer;
  displayQuestion();
}

// Function to move to the next question
function nextQue() {
  if (currentQue === 9) {
    // If it's the last question, end the quiz
    endQuiz();
  }
  if (currentQue < 9) {
    // Move to the next question and display it
    currentQue += 1;
    displayQuestion();
  }
  if (currentQue === 9) {
    // Change the button text to "Submit" for the last question
    submit.innerHTML = "Submit";
  } else {
    submit.innerHTML = "Next";
  }
}

// Function to move to the previous question
function prevQue() {
  if (currentQue !== 0) {
    // Move to the previous question and display it
    currentQue -= 1;
    displayQuestion();
  }
  if (currentQue !== 9) {
    // Change the button text to "Next" if it's not the last question
    submit.innerHTML = "Next";
  }
}

// Function to clear the selected answer for the current question
function clearResult() {
  answers[currentQue] = null;
  displayQuestion();
}

// Function to manage the question list on the side
function listManage() {
  for (let i = 1; i < 11; i++) {
    // Create a button for each question in the list
    questionlist.innerHTML += `<div onclick="setQuestion(${
      i - 1
    })" class="qbutton">${i}</div>`;
  }
}

// Function to set the current question based on the question list
function setQuestion(queNo) {
  currentQue = queNo;
  displayQuestion();
  if (currentQue === 9) {
    submit.innerHTML = "Submit";
  } else {
    submit.innerHTML = "Next";
  }
}

// Function to end the quiz and display the results
function endQuiz() {
  // Switch to the results screen
  switchScreen(2, 3);

  // Count the number of correct, incorrect, and unanswered questions
  let correctCount = 0;
  let NaCount = 0;
  let wrongCount = 0;

  // Loop through each question and check the answer
  for (let i = 0; i <= 9; i++) {
    if (answers[i] === questions[i].answer) {
      correctCount = correctCount + 1;
    } else if (answers[i] === null) {
      NaCount = NaCount + 1;
    } else {
      wrongCount = wrongCount + 1;
    }
  }

  // Display the counts in the results screen
  document.getElementById("correct").innerHTML = correctCount;
  document.getElementById("wrong").innerHTML = wrongCount;
  document.getElementById("na").innerHTML = NaCount;

  // Display detailed information about each question in the results
  displayQuizquestion();
}

// Function to display detailed information about each question in the results
function displayQuizquestion() {
  let quizque = document.getElementById("quizquestions");

  // Loop through each question and display user answer and correct answer
  for (let i = 0; i < questions.length; i++) {
    let answerindex = questions[i].answer;
    let useranswer = "-";
    if (answers[i] !== null) {
      useranswer = questions[i].options[answers[i]];
    }

    // Display the question, user answer, and correct answer
    quizque.innerHTML += `<div class="anwerscheck">
        <h1><b>${i + 1}</b> - ${questions[i].text}</h1>
        <p>Your answer :- ${useranswer}</p>
        <p>Correct Answer :- ${questions[i].options[answerindex]}</p>
      </div>`;
  }
}
