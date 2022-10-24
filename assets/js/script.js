var timerEl = document.getElementById('time')
var start = document.getElementById('start')
var questionEl = document.getElementById('prompt')
var selectionArea = document.getElementById('user-selection')
var score
i = 0;

let questionsList = [{
    question: "which of the following isnt a language?",
    answer: ["html", "css", "javascript", "java chip frappuccino"],
    correctAnswer: 4
}, {
    question: "which of the following is a semantic hmtl element?",
    answer: ["air conditioner", "header", "bug spray", "candle"],
    correctAnswer: 2
}, {
    question: "which of the following says correct?",
    answer: ["correct", "wrong", "wrong", "wrong"],
    correctAnswer: 1
}, {
    question: "which of the following says correct?",
    answer: ["wrong", "wrong", "correct", "wrong"],
    correctAnswer: 3
}, {
    question: "which of the following says correct?",
    answer: ["correct", "wrong", "wrong", "wrong"],
    correctAnswer5: 1
}, {
    question: "which of the following says correct?",
    answer: ["wrong", "wrong", "wrong", "correct"],
    correctAnswer: 4
}]





function countdown() {
    //starting time
    var timeLeft = 60;
    var timeInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = timeLeft + " seconds remaing";
        if(timeLeft === 0) {
            clearInterval(timeInterval);
            alert("game over, how well did you do?");
            removeAllChildNodes(selectionArea);
            questionEl.textContent = "Congrats here is your score!"
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
        var element = event.target;
        if (element.matches("button") === true) {
        removeAllChildNodes(selectionArea);
        i++;
        } if (i < 6){
            displayQuestions();
        } if (i === 6){
            questionEl.textContent = "Congrats here is your score!"
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


