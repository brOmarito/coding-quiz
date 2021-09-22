var quizQuestions = [{
        "question": "Which of the following is not a JavaScript data type?",
        "answers": {
            "Decimal": true,
            "Boolean": false,
            "Object": false,
            "Number": false,
            "String": false
        }
    },
    {
        "question": "Which of the following is a method available from the window object?",
        "answers": {
            "prompt()": true,
            "maximize()": false,
            "attribute()": false,
            "record()": false,
            "playback()": false
        }
    },
    {
        "question": "Which of the following browser methods can be used to start a timer in JavaScript?",
        "answers": {
            "setInterval()": true,
            "setTimer()": false,
            "startTimer()": false,
            "startInterval()": false,
            "createTimer()": false
        }
    },
    {
        "question": "Which of the following can be used to comment out a line in JavaScript?",
        "answers": {
            "// This is a comment": true,
            "*/ This is a comment": false,
            "/ This is a comment": false,
            "% This is a comment": false
        }
    },
    {
        "question": "If <span class=\"code-snippet\">var a = 10</span> and <span class=\"code-snippet\">var b = '10'</span> which of the following would return true?",
        "answers": {
            "a == b": true,
            "a = b": false,
            "a === b": false,
            "a equals b": false
        }
    },
    {
        "question": "Does JavaScript support automatic type conversion?",
        "answers": {
            "Yes": true,
            "No": false
        }
    },
    {
        "question": "What method can be used to convert a string to a number?",
        "answers": {
            "parseInt()": true,
            "parseNumber()": false,
            "toNumber()": false,
            "toInt()": false
        }
    }
];
var timer;
var timerVal;
var questionCounter = 0;
var score;
var resultTimer;

var timerEl = document.querySelector(".quiz-timer");
var quizQuestionEl = document.querySelector(".quiz-question");
var quizAnswersEl = document.querySelector(".quiz-answers");
var getStartedButton = document.querySelector(".get-started-button");
var quizCardEl = document.querySelector(".quiz-card");
var welcomeTextEl = document.querySelector(".quiz-welcome-text");
var displayedAnsw = document.querySelector(".answer-list")
var answerSection = document.querySelector(".answer-section")
var resultEl = document.querySelector(".ans-result");
var scoreForm = document.querySelector("#submit-score");

timerEl.textContent = timerVal;

getStartedButton.addEventListener("click", function (event) {
    console.log('started');
    event.stopPropagation();
    event.preventDefault();
    timerVal = 120;
    score = 0;
    questionCounter = 0
    timerEl.textContent = timerVal;
    displayWelcomeFormat(false);
    timerEl.classList.remove('hidden');
    quizQuestions = shuffleArray(quizQuestions);
    switchCard();
    timer = setInterval(function () {
        timerVal--;
        timerEl.textContent = timerVal;
        if (timerVal === 0) {
            clearInterval(timer);
            showQuizEnd(true);
        }
    }, 1000)
});

displayedAnsw.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    var element = event.target;
    if (element.matches(".answer-button")) {
        checkCorrectAnsw(element.textContent);
    }
});

function acceptHighScoreName(event) {
    event.stopPropagation();
    event.preventDefault();
    handleHighScores(scoreForm.elements["name-field"].value, score)
}

function handleHighScores(name, score) {
    var scoreRecord = {
        name: name,
        score: score
    }
    var highScores = JSON.parse(localStorage.getItem("HighScores"));
    if (highScores) {
        highScores.push(scoreRecord);
    } else {
        highScores = [];
        highScores.push(scoreRecord);
    }
    localStorage.setItem("HighScores", JSON.stringify(highScores));
    displayHighScores(highScores);
}

function displayHighScores(highScoresArray) {
    var sortedArray = highScoresArray.sort((a, b) => b.score - a.score);
    if (sortedArray.length > 5) {
        sortedArray = sortedArray.splice(0, 5);
    }
    var scorelist = document.createElement("ul");
    sortedArray.forEach(scoreRecord => {
        var recordEl = document.createElement("li");
        recordEl.textContent = scoreRecord.name + "  " + scoreRecord.score;
        scorelist.appendChild(recordEl);
    });
    displayedAnsw.innerHTML = scorelist.innerHTML;
    quizQuestionEl.textContent = "High Scores - Just the Top 5!"
    displayedAnsw.classList.remove("hidden");
    scoreForm.classList.add('hidden');
    getStartedButton.classList.remove("hidden");
    getStartedButton.innerHTML = "Try Again!";
}

function checkCorrectAnsw(answText) {
    var currAnswers = quizQuestions[questionCounter].answers;
    var correctAns = currAnswers[answText];
    if (correctAns) {
        resultEl.querySelector('p').textContent = "Correct!";
        score += 10;
    } else {
        resultEl.querySelector('p').textContent = "Wrong!";
    }
    resultEl.classList.remove("hidden");
    clearInterval(resultTimer);
    var secPassed = 0;
    resultTimer = setInterval(function () {
        if (secPassed === 5) {
            resultEl.classList.add("hidden");
            clearInterval(resultTimer);
        }
        secPassed++;
    }, 1000)
    questionCounter++;
    if (questionCounter === quizQuestions.length) {
        showQuizEnd(false);
    } else {
        switchCard();
    }
}

function showQuizEnd(timedOut) {
    var endMessage;
    if (timedOut) {
        endMessage = "Oh man, you ran out of time!";
    } else {
        endMessage = "You finished!"
        clearInterval(timer);
    }
    quizQuestionEl.innerHTML = endMessage + "<br>" + 
                                "Please submit your name<br>" +
                                "Your score is: " + score + "<br><br>" +
                                "Maybe you made the high score board!<br>"
                                "(You have to be in the top 5!)";
    timerEl.classList.add('hidden')
    scoreForm.classList.remove('hidden');
    displayedAnsw.classList.add('hidden');
}

function displayWelcomeFormat(shouldDisplay) {
    if (shouldDisplay) {
        quizCardEl.classList.add("welcome-content");
        getStartedButton.classList.remove("hidden");
    } else {
        quizCardEl.classList.remove("welcome-content");
        getStartedButton.classList.add("hidden");
        welcomeTextEl.classList.add("hidden");
    }
}

function switchCard() {
    var currQuest = quizQuestions[questionCounter];
    quizQuestionEl.innerHTML = currQuest.question;
    displayAnswers(currQuest.answers);
}

function displayAnswers(answers) {
    answers = shuffleArray(answers);
    var answerlist = document.createElement("ol");
    // var answerHtmlString = '<ul class="answer-list">'
    Object.keys(answers).forEach((key, index) => {
        var answId = 'answ' + index;
        var answItem = document.createElement("li");
        answItem.id = answId;
        answItem.className = "answer-item";
        var answButton = document.createElement("button");
        answButton.className = "answer-button";
        answButton.textContent = key;
        answItem.appendChild(answButton);
        answerlist.appendChild(answItem);
    });
    displayedAnsw.innerHTML = answerlist.innerHTML;
}

function shuffleArray(array) {
    var cntr = array.length;
    while (cntr > 0) {
        var index = Math.floor(Math.random() * cntr);
        cntr--;
        var temp = array[cntr];
        array[cntr] = array[index];
        array[index] = temp;
    }
    return array;
}