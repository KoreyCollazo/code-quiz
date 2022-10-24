var timerEl = document.getElementById('time')
var start = document.getElementById('start')
var questionEl = document.getElementById('prompt')
var selectionArea = document.getElementById('user-selection')
var score = 0
var timeLeft = 60;
i = 0;

let questionsList = [{
    question: "which of the following isnt a language?",
    answer: ["html", "css", "javascript", "java chip frappuccino"],
    correctAnswer: "java chip frappuccino"
}, {
    question: "which of the following is a semantic hmtl element?",
    answer: ["air conditioner", "header", "bug spray", "candle"],
    correctAnswer: "header"
}, {
    question: "which of the following says correct?",
    answer: ["correct", "wrong", "wrong", "wrong"],
    correctAnswer: "correct"
}, {
    question: "which of the following says correct?",
    answer: ["wrong", "wrong", "correct", "wrong"],
    correctAnswer: "correct"
}, {
    question: "which of the following says correct?",
    answer: ["correct", "wrong", "wrong", "wrong"],
    correctAnswer: "correct"
}, {
    question: "which of the following says correct?",
    answer: ["wrong", "wrong", "wrong", "correct"],
    correctAnswer: "correct"
}]





function countdown() {
    //starting time
    
    var timeInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if(timeLeft <= 0) {
            clearInterval(timeInterval);
            timerEl.innerHTML = ""
            alert("game over, how well did you do?");
            removeAllChildNodes(selectionArea);
            questionEl.textContent = "Congrats here is your score!"
            displayScore()
          }
      
        }, 1000);
}

function displayQuestions(){
    let choices = document.createElement("ul");
    selectionArea.appendChild(choices);
    choices.setAttribute("id", "list")
    

    for(let q = 0; q < 4; q++){
        let item = choices.appendChild(document.createElement("button"))
        choices.appendChild(item)
        item.appendChild(document.createTextNode(questionsList[i].answer[q]))
    }
        var questionEl = document.getElementById('prompt')
        questionEl.textContent = questionsList[i].question;
        var buttons = document.getElementById("list")
        buttons.addEventListener("click", function(event){
        var correctAnswer = (questionsList[i].correctAnswer)
        var selectedAnswer = event.target
        if(correctAnswer != selectedAnswer.innerText){
            timeLeft -= 10
            timerEl.innerHTML = timeLeft
        }
        if (correctAnswer === selectedAnswer.innerText){
            score++;
        } if (selectedAnswer.matches("button") === true) {
        removeAllChildNodes(selectionArea);
        i++;
        } if (i < 6){
            displayQuestions();
        } if (i === 6){
            timeLeft -= timeLeft
            timerEl.innerHTML = timeLeft
            questionEl.textContent = "Congrats here is your score!"
            displayScore()
        } 
         
    });
};

//https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

start.addEventListener("click", function(){
    countdown();
    start.remove();
    displayQuestions();
});


function displayScore(){
    var scoreP= document.createElement("p")
    scoreP.appendChild(document.createTextNode(score + " out of 6"))
    scoreP.style.fontSize = "45px"
    selectionArea.appendChild(scoreP)
    }
