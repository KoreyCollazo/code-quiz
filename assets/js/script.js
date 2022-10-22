var timerEl = document.getElementById('time')
var start = document.getElementById('start')
var questionEl = document.getElementById('prompt')



function countdown() {
    //starting time
    var timeLeft = 60;
    var timeInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = timeLeft + " seconds remaing";
        if(timeLeft === 0) {
            // Stops execution of action at set interval
            clearInterval(timeInterval);
            // Calls function to create and append image
            alert("game over, how well did you do?");
          }
      
        }, 1000);
      }

function q1(){
    var questionEl = document.getElementById('prompt')
    questionEl.textContent = "Which of the following isn't a language?";
}


start.addEventListener("click", function(){
    countdown();
    start.remove();
    q1();
});