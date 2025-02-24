document.addEventListener("DOMContentLoader", () => {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const timerElement = document.getElementById("time");
    const nextButton = document.getElementById("next-btn");
    const scoreElement = document.getElementById("score");

    let currentQuestionIndex = 0;
    let score = 0;
    let timeleft = 0;
    let timer;
    let questions = [];

    fetch("questions.json")
        .then(response => response.json())
        .then(data => {
            questions = data;
            loadQuestion();
        });

    function startTimer() {
        timeLeft = 10;
        timerElement.textContent = timeLeft;
        timer = setInterval(() => {
            timeLeft --;
            timerElement.textContent = timeLeft;
            if(timeLeft === 0) {
                clearInterval(timer);
                nextQuestion();
            }
        }, 1000);
    }        

    function loadQuestion() {
        clearInterval(timer);
        startTimer();
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        optionsElement.innerHTML = "";

        currentQuestion.options.forEach(option => {
            const li = document.createElement("li");
            li.textCOntent = option;
            li.addEventListener("click", () => selectAnswer(option, currentQuestion.correct));
            optionsElement.appendChild(li);
        });
    }

    function selectAnswer(selected, correct) {
        clearInterval(timer);
        if(selected === correct) {
            score ++;
            scoreElement.textContent = 'Score : ${score}';
        }
        nextQuestion();
    }

    function nextQuestion() {
        currentQuestionIndex ++;
        if(currentQuestionIndex < questions.length) {
            loadQuestion();
        }else {
            questionElement.textContent = "Quiz Completed !";
            optionsElement.innerHTML = "";
            nextButton.style.display = "none";
        }
    }
    nextButton.addEventListener("click", nextQuestion);
});