// Variables
const quiz = document.getElementById('quiz');
const results = document.getElementById('results');
const submit = document.getElementById('submit');
const questions = [
  {
    question: "Question 1. Please specify the statement used to initialize a new repository?",
    answers: {
      a: "git create",
      b: "git init",
      c: "git commit",
      d: "git add"
    },
    correctAnswer: "b"
  },

  {
    question: "Question 2. Which statement syncs from Local Repository to Remote Repository?",
    answers: {
      a: "git update",
      b: "git pull",
      c: "git push",
      d: "All answers are correct"
    },
    correctAnswer: "c"
  },

  {
    question: "Question 3. Which of the following commands git to track all existing changes?",
    answers: {
      a: "git push -am Messages",
      b: "git pull",
      c: "git add",
      d: "git commit -m"
    },
    correctAnswer: "c"
  },

  {
    question: "Question 4. Which of the following statements helps to clone a Repository to your computer?",
    answers: {
      a: "git fork",
      b: "git clone",
      c: "git push",
      d: "git commit"
    },
    correctAnswer: "b"
  },

  {
    question: "Question 5. What is the source code management tool?",
    answers: {
      a: "Git",
      b: "HTML",
      c: "Javascript",
      d: "Css"
    },
    correctAnswer: "a"
  }
];

// Functions
function buildQuiz() {
  // biến để lưu trữ đầu ra HTML
  const output = [];
  // Tạo mỗi câu hỏi
  questions.forEach(
    (currentQuestion, questionNumber) => {
      // biến để lưu trữ danh sách các câu trả lời có thể có
      const answers = [];
      // và cho mỗi câu trả lời có sẵn 
      for (letter in currentQuestion.answers) {
        // thêm một nút radio HTML
        answers.push(
          `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
        );
      }

      // thêm câu hỏi và câu trả lời của nó vào đầu ra
      output.push(
        `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
      );
    }
  );

  // kết hợp danh sách đầu ra thành một chuỗi HTML và đặt nó trên trang
  quiz.innerHTML = output.join('');
}
// Đếm ngược thời gian
let time = 1;
let quizTimeInMinutes = time * 60 * 60;
let quizTime = quizTimeInMinutes / 60;
let counting = document.getElementById("count-down");
function startCountdown() {
  let quizTimer = setInterval(function () {
    if (quizTime <= 0) {
      clearInterval(quizTimer);
      showScores();
    } else {
      quizTime--;
      let sec = Math.floor(quizTime % 60);
      let min = Math.floor(quizTime / 60) % 60;
      counting.innerHTML = `Time ${min}0:${sec}`;
    }
  }, 1000);
}
startCountdown();

function showResults() {
  // thu thập các thùng chứa câu trả lời từ bài kiểm tra
  const answerContainers = quiz.querySelectorAll('.answers');
  // theo dõi câu trả lời của người dùng
  let numCorrect = 0;
  // cho mỗi câu hỏi 
  questions.forEach((currentQuestion, questionNumber) => {
    // tìm câu trả lời đã chọn
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;
    // nếu câu trả lời là đúng
    if (userAnswer === currentQuestion.correctAnswer) {
      // thêm vào số câu trả lời đúng
      numCorrect++;
      // tô màu cho câu trả lời màu xanh lá cây
      answerContainers[questionNumber].style.color = 'green';
    }
    // nếu câu trả lời sai hoặc trống
    else {
      // tô màu đỏ cho câu trả lời
      answerContainers[questionNumber].style.color = 'red';
    }
  });
  // hiển thị số câu trả lời đúng trong tổng số câu
  results.innerHTML = `Complete ${numCorrect} out of ${questions.length} sentences!`;
}
// Chuyển trang cho mỗi câu hỏi
function showSlide(n) {
  slides[currentSlide].classList.remove('active-slide');
  slides[n].classList.add('active-slide');
  currentSlide = n;
  if (currentSlide === 0) {
    previousButton.style.display = 'none';
  }
  else {
    previousButton.style.display = 'inline-block';
  }
  if (currentSlide === slides.length - 1) {
    nextButton.style.display = 'none';
    submit.style.display = 'inline-block';
  }
  else {
    nextButton.style.display = 'inline-block';
    submit.style.display = 'none';
  }
}
// Chuyển tới trang tiếp theo
function showNextSlide() {
  showSlide(currentSlide + 1);
}
// Chuyển về trang trước
function showPreviousSlide() {
  showSlide(currentSlide - 1);
}

buildQuiz();
// Phân trang
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;
// Hiển thị trang trình bày đầu tiên
showSlide(currentSlide);
// Gọi lại các sự kiện
submit.addEventListener('click', showResults);
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);


