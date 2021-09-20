var quizQuestions = [{
        "question": "Which of the following is not a JavaScript data type?",
        "answers": [{
                "ansVal": "Decimal",
                "correctAns": true
            },
            {
                "ansVal": "Boolean",
                "correctAns": false
            },
            {
                "ansVal": "Object",
                "correctAns": false
            },
            {
                "ansVal": "Number",
                "correctAns": false
            },
            {
                "ansVal": "String",
                "correctAns": false
            }
        ]
    },
    {
        "question": "Which of the following is a method available from the window object?",
        "answers": [{
                "ansVal": "prompt()",
                "correctAns": true
            },
            {
                "ansVal": "maximize()",
                "correctAns": false
            },
            {
                "ansVal": "attribute()",
                "correctAns": false
            },
            {
                "ansVal": "record()",
                "correctAns": false
            },
            {
                "ansVal": "playback()",
                "correctAns": false
            }
        ]
    },
    {
        "question": "Which of the following browser methods can be used to start a timer in JavaScript?",
        "answers": [{
                "ansVal": "setInterval()",
                "correctAns": true
            },
            {
                "ansVal": "setTimer()",
                "correctAns": false
            },
            {
                "ansVal": "startTimer()",
                "correctAns": false
            },
            {
                "ansVal": "startInterval()",
                "correctAns": false
            },
            {
                "ansVal": "createTimer()",
                "correctAns": false
            }
        ]
    },
    {
        "question": "Which of the following can be used to comment out a line in JavaScript?",
        "answers": [{
                "ansVal": "// This is a comment",
                "correctAns": true
            },
            {
                "ansVal": "*/ This is a comment",
                "correctAns": false
            },
            {
                "ansVal": "/ This is a comment",
                "correctAns": false
            },
            {
                "ansVal": "% This is a comment",
                "correctAns": false
            }
        ]
    },
    {
        "question": "If <span class=\"code-snippet\">var a = 10</span> and <span class=\"code-snippet\">var b = '10'</span> which of the following would return true?",
        "answers": [{
                "ansVal": "a == b",
                "correctAns": true
            },
            {
                "ansVal": "a = b",
                "correctAns": false
            },
            {
                "ansVal": "a === b",
                "correctAns": false
            },
            {
                "ansVal": "a equals b",
                "correctAns": false
            }
        ]
    },
    {
        "question": "Does JavaScript support automatic type conversion?",
        "answers": [{
                "ansVal": "Yes",
                "correctAns": true
            },
            {
                "ansVal": "No",
                "correctAns": false
            }
        ]
    },
    {
        "question": "What method can be used to convert a string to a number?",
        "answers": [{
                "ansVal": "parseInt()",
                "correctAns": true
            },
            {
                "ansVal": "parseNumber()",
                "correctAns": false
            },
            {
                "ansVal": "toNumber()",
                "correctAns": false
            },
            {
                "ansVal": "toInt()",
                "correctAns": false
            }
        ]
    }
];
var timer;
var timerVal = 120;
var questionCounter = 0;

var timerEl = document.querySelector(".quiz-timer");
var quizQuestionEl = document.querySelector(".quiz-question");
var quizAnswersEl = document.querySelector(".quiz-answers");
var getStartedButton = document.querySelector(".quiz-content button");
var quizCardEl = document.querySelector(".quiz-card");
var welcomeTextEl = document.querySelector(".quiz-welcome-text");

timerEl.textContent = timerVal;
console.log(quizQuestions);

getStartedButton.addEventListener("click", function () {
    timerEl.textContent = timerVal;
    quizQuestions = shuffleArray(quizQuestions);
    displayWelcomeFormat(false);
    switchCard();
    timer = setInterval(function () {
        timerVal--;
        timerEl.textContent = timerVal;
        if (timerVal === 0) {
            clearInterval(timer);
        }
    }, 1000)
});

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
    var displayedAnsw = document.querySelector(".answer-list")
    var answerlist = document.createElement("ul");
    answerlist.className = "answer-list";
    // var answerHtmlString = '<ul class="answer-list">'
    answers.forEach((currAnswer, index) => {
        var answId = 'answ' + index;
        var answItem = document.createElement("li");
        answItem.id = answId;
        answItem.className = "answer-item";
        var answButton = document.createElement("button");
        answButton.className = "answer-button";
        answButton.textContent = currAnswer.ansVal;
        answItem.appendChild(answButton);
        answerlist.appendChild(answItem);
        displayedAnsw.addEventListener("click", addClickToAnswer(event, currAnswer.correctAns))
    });
    displayedAnsw.innerHTML = answerlist.innerHTML;
}

function addClickToAnswer(event, correctAns) {
    event.preventDefault();
    event.stopPropagation();
    var element = event.target;
    console.log("Registered Click");
    if (element.matches(".answer-item")) {
        console.log("Registered Click");
        var resultEl = document.querySelector(".ans-result p");
        if (correctAns) {
            resultEl.textContent = "Correct!";
        } else {
            resultEl.textContent = "Wrong!";
        }
        resultEl.classList.remove("hidden");
        var resultTimer = setInterval(function () {
            if (resultTimer === 2) {
                resultEl.classList.add("hidden");
                clearInterval(resultTimer);
            }
        }, 1000)
    }
}

// function displayHighScore() {
//     quizQuestion.
// }

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