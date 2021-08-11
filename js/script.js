const question = document.getElementById("question");
const choices = document.querySelectorAll(".choice-text");
const qCounter = document.getElementById("qCounter");
const scoreEle = document.getElementById("score");
const progressBar = document.querySelector(".progressBar");
const progressBarFull = document.querySelector(".progressBarFull");
const loader = document.querySelector(".loader");

let curentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];
fetch(
        "https://opentdb.com/api.php?amount=15&category=9&difficulty=easy&type=multiple"
    )
    .then((res) => res.json())
    .then((loadedQuestions) => {
        questions = loadedQuestions.results.map((loadedQuestion) => {
            const formatedQuestion = {
                question: loadedQuestion.question,
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formatedQuestion.answer = Math.floor(Math.random() * 3) + 1;
            answerChoices.splice(
                formatedQuestion.answer - 1,
                0,
                loadedQuestion.correct_answer
            );

            answerChoices.forEach((choice, index) => {
                formatedQuestion["choice" + (index + 1)] = choice;
            });
            return formatedQuestion;
        });
        MAX_QUESTIONS = questions.length;
        loader.classList.remove("active");
        startGame();
    })
    .catch((err) => {
        console.error(err);
    });

const CORRECT_BOUNES = 10;
var MAX_QUESTIONS = 0;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        if (!localStorage.getItem("highScore")) {
            localStorage.setItem("highScore", JSON.stringify([]));
        }
        return window.location.assign("./end.html");
    }
    questionCounter++;
    qCounter.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
    progressBarFull.style.width = (questionCounter / MAX_QUESTIONS) * 100 + "%";
    const qIndex = Math.floor(Math.random() * availableQuestions.length);
    curentQuestion = availableQuestions[qIndex];
    question.innerText = curentQuestion.question;
    choices.forEach((choice) => {
        const number = choice.dataset.number;
        choice.innerText = curentQuestion["choice" + number];
    });
    availableQuestions.splice(qIndex, 1);
    acceptingAnswers = true;
};
choices.forEach((ch) => {
    ch.addEventListener("click", (e) => {
        if (!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset.number;
        const classToApply =
            selectedAnswer == curentQuestion.answer ? "correct" : "incorrect";
        if (classToApply == "correct") {
            incrementScore(CORRECT_BOUNES);
        }
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});
incrementScore = (num) => {
    score += num;
    scoreEle.innerText = score;
};