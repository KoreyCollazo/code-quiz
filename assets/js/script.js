var timerEl = document.getElementById('time')
var start = document.getElementById('start')
var questionEl = document.getElementById('prompt')
var selectionArea = document.getElementById('user-selection')
let questionLabelEl = document.getElementById("current-question-label")
var score = 0
var timeLeft = 60;
var nameValue
i = 0;

//variable to hold questions
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
            removeAllChildNodes(questionLabelEl);
            removeAllChildNodes(selectionArea);
            questionEl.textContent = "Congrats here is your score!"
            displayScore()
          }
      
        }, 1000);
}
//create quiz elements
function displayQuestions(){
    let choices = document.createElement("ul");
    selectionArea.appendChild(choices);
    choices.setAttribute("id", "list")
    let questionLabel = document.createElement("p")
    questionLabel.textContent = "Question " + (i+1) + " out of 6"
    questionLabelEl.appendChild(questionLabel)
    

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
            incorrectResponce()
        }
        if (correctAnswer === selectedAnswer.innerText){
            correctResponce()
            score++;
        } if (selectedAnswer.matches("button") === true) {
        removeAllChildNodes(selectionArea);
        removeAllChildNodes(questionLabelEl);
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
//quiz  start event
start.addEventListener("click", function(){
    countdown();
    start.remove();
    hideScoreboard();
    displayQuestions();
});
//correct notification
function correctResponce() {
    var responceTime = 3;
    var responceEl = document.getElementById("correct-or-incorrect")
    responceEl.textContent = "correct";
    responceEl.setAttribute("style", "color: green")
    var timeInterval = setInterval(function () {
        responceTime--;
        if(responceTime <= 0) {
            clearInterval(timeInterval);
            responceEl.innerHTML = ""
          }
        }, 1000);
}
//incorrect notification
function incorrectResponce() {
    var responceTime = 3;
    var responceEl = document.getElementById("correct-or-incorrect")
    responceEl.textContent = "incorrect";
    responceEl.setAttribute("style", "color: red")
    var timeInterval = setInterval(function () {
        responceTime--;
        if(responceTime <= 0) {
            clearInterval(timeInterval);
            responceEl.innerHTML = ""
          }
      
        }, 1000);
}

//score saved notification
function savedResponce() {
    var responceEl = document.getElementById("correct-or-incorrect")
    responceEl.textContent = "score saved!";
    responceEl.setAttribute("style", "color: white")
}

//displays score 
function displayScore(){
    document.getElementById("homepage-button").setAttribute("style", "visibility: visible")
    var form = document.createElement("form")
    var scoreP = document.createElement("p")
    scoreP.appendChild(document.createTextNode(score + " out of 6"))
    scoreP.style.fontSize = "40px"
    var nameP = document.createElement("p")
    nameP.appendChild(document.createTextNode("Enter name to save score"))
    nameP.style.fontSize = "30px"
    var nameInput = document.createElement("input")
    nameInput.setAttribute("id", "username")
    var saveButton = document.createElement("button")
    saveButton.appendChild(document.createTextNode("Save your Score"))
    saveButton.setAttribute("id", "save")
    selectionArea.style.paddingTop = 0
    selectionArea.appendChild(form)
    var formEl = document.querySelector("form")
    document.getElementById("prompt").appendChild(scoreP)
    formEl.appendChild(nameP)
    formEl.appendChild(nameInput)
    formEl.appendChild(saveButton)
    //save score event
    formEl.addEventListener("click", function(event){
        event.preventDefault()
        savedResponce()
        var nameValue = document.getElementById("username").value
        var scores = 
        {
            username: nameValue,
            userScore: score + "/6"
        }
        localStorage.setItem("scores",  JSON.stringify(scores))
        //init all scores  array
        if (localStorage.getItem("init-data") != "true"){
            localStorage.setItem("init-data", "true")
        
            var allScores = []
        allScores.push(JSON.parse(localStorage.getItem("scores")));
        localStorage.setItem('allScores', JSON.stringify(allScores));
        removeAllChildNodes(document.querySelector("form"))
        return;
        }
        var initData = localStorage.getItem("init-data");
        if (initData = "true"){
            allScores = JSON.parse(localStorage.getItem("allScores"));
            allScores.push(JSON.parse(localStorage.getItem("scores")));
            localStorage.setItem('allScores', JSON.stringify(allScores));
            removeAllChildNodes(document.querySelector("form"))
        }
        
    })
}

//creates scoreboard elements
function createScoreBoard() {
    var sbTitle = document.createElement("h2")
    sbTitle.textContent = "Score Board"
    document.getElementById("score-board").appendChild(sbTitle)
    var allScores = JSON.parse(localStorage.getItem("allScores"))
    var names = document.createElement("ul")
    names.setAttribute("id", "user-names")
    var allScoresLength = allScores.length
    document.getElementById("score-board").appendChild(names)
    
    for(let k = 0; k < allScoresLength; k++){
        var usernameEl = document.createElement("p")
        usernameEl.textContent = allScores[k].username + " - " + allScores[k].userScore
        document.getElementById("user-names").appendChild(usernameEl)
    };  

    var clearScores = document.createElement("button")
    clearScores.setAttribute("id", "clearScores")
    clearScores.textContent = "clear scores"
    clearScores.addEventListener("click", function(){
        localStorage.setItem('allScores', "[]")
        location.reload();
    })
    document.getElementById("score-board").appendChild(clearScores)
}



//display scoreboard
document.getElementById("score-button").addEventListener("click", function(){
    createScoreBoard()
    
})

//hide scoreboard
function hideScoreboard(){
    removeAllChildNodes(document.getElementById("score-board"))
    
}

//back to homepage
document.getElementById("homepage-button").addEventListener("click", function(){
    location.reload();
})
