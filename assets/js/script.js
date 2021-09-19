const quizQuestions = [{
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
var maxTime = 120;

var timerEl = document.querySelector(".quiz-timer");
var quizQuestion = document.querySelector(".quiz-question");
var quizAnswers = document.querySelector(".quiz-answers");
var getStartedButton = document.querySelector(".quiz-content button");

timerEl.textContent = maxTime;

getStartedButton.addEventListener("click", function() {
    timerEl.textContent = maxTime;
    timer = setInterval(function() {
        timerEl.textContent = timerEl.textContent-1;
        if (timerEl.textContent === 0) {
            clearInterval(timer);
        }
    }, 1000)
});

