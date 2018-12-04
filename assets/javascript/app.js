// define objects & arrays
// trivia object
var triviaObj = {
    qNum: 0,
    

    questionArr: [
        { question: "Did this rug really tie the room together?", choices: ["yes", "no", "which rug?",], correct: 0 },
        { question: "What is good about National Socialism?", choices: ["they don't believe in anything", "atleast it's an ethos", "shut up Donny", "I'm the Dude, man"], correct: 1 },
        { question: "Do we have anything to fear from Nihilists?", choices: ["yes", "no we don't", "those men are cowards", ], correct: 2 },
        { question: "Is the Dude a lazy man?", choices: ["You have not frame of reference here", "shut up Donny", "obviously, you're not a golfer", "He most certainly is"], correct: 3 },
        { question: "Will this agression stand?", choices: ["You're about to enter a world of hurt", "shut up Donny", "my wife is not the problem here!", "Stay away from my lady friend"], correct: 2 },
        { question: "tomorrow is already the 10th", choices: ["Oh, OK.", "far out", "Oh, is it?"], correct: 1 },
        { question: "It's like Lennin said", choices: ["Who is that?", "where do you want us to go?", "I drank what?", "I am the walrus"], correct: 3 },
        { question: "Do you roll on shomer Shabbos", choices: ["I'm rolling rocks, here", "I don't roll on shomer Shabbos", "mark it zero", "You're out of your depth, Donny"], correct: 1 },
        { question: "The story is ludicrous, you can imagine where it goes from here..", choices: ["He leaves?", "He fixes the cable?", "He visits Jackie Treehorn", "They become little Lebowski urban acheivers"], correct: 1 },
        { question: "Where is the money Lebowski?", choices: ["it's a complicated story, man", "It's got to be down there somwhere, let me take another look", "certain things have come to light, I've got information.", "Larry has it",], correct: 1 },
        { question: "Do you want a toe?", choices: ["I don't want a toe", "I can get you a toe by 3 o-clock this afternoon", "Are you crazy?", "Shut up Donny"], correct: 1 },
        { question: "You got any promising leads? ", choices: ["We are doing all we can", "this isn't CSI", "Yeah, we got 4 more detectives working on the case.  They've got us working in shifts!", "Yes we do"], correct: 2 },
    ],

    startGame: function () {
        this.qNum = currentQ();
        this.clickButtons();
        this.updateQuestions(this.qNum)
        timer.startTimer();
        timer.startCoundown();
        qCorrect = 0;
    },

    reStart: function(){
        gameOver = false;
        timer.startTimer();
        triviaObj.nextQ();
        $(".answer, .question").fadeIn(1000);
    },

    clickButtons: function () {
        $(".answ").click(function () {
            if (!gameOver) {
                var x = parseInt($(this).attr("value"));
                if (x === triviaObj.questionArr[triviaObj.qNum].correct) {
                    triviaObj.correctAns();
                }
                else {
                    triviaObj.wrongAns();
                }
            }
        });
    },

    correctAns: function () {
        qCorrect ++;
        timer.stopCD();
        $(".result h4").text("Far out man.");
        console.log ("Correct: " + qCorrect);
        console.log ("Wrong: " + qWrong);
        console.log ("Late: " + qLate);
        setTimeout(function() {
            triviaObj.nextQ();;
          }, 1000);
        
        // triviaObj.nextQ();
    },

    wrongAns: function () {
        qWrong ++;
        timer.stopCD();
        $(".result h4").text("No way man.");
        console.log ("Correct: " + qCorrect);
        console.log ("Wrong: " + qWrong);
        console.log ("Late: " + qLate);
        setTimeout(function() {
            triviaObj.nextQ();;
          }, 1000);
        // $(".result h4").text("No way man.");
        // triviaObj.nextQ();
    },

    outOfTime: function () {
        qLate ++;
        timer.stopCD();
        $(".result h4").text("Too late man.");
        console.log ("Correct: " + qCorrect);
        console.log ("Wrong: " + qWrong);
        console.log ("Late: " + qLate);
        setTimeout(function() {
            triviaObj.nextQ();;
          }, 1000);
    },

    endOfGame: function () {
        gameOver = true;
        clearInterval(qCountDown);
        clearInterval(timeSince);
        $(".result h4").text("You got " + qCorrect + " out of " + qTotal + " correct!");
        $(".answer, .question").fadeOut(1000);
        setTimeout(function() {
            triviaObj.reStart();
          }, 5000);

    },

    nextQ: function () {
        this.qNum = currentQ();
        if (!gameOver) {
            triviaObj.updateQuestions(this.qNum);
            timer.resetDown();
        } else {
        }
    },

    updateQuestions: function (num) {
        if (!gameOver) {
            $(".result h4").text("Dude Trivia!");
            $(".answ ").hide(200);
            $(".answ h4").empty();
            $(".question h2").text(this.questionArr[num].question);
            for (let i = 0; i < this.questionArr[num].choices.length; i++) {
                $(".answ[value=" + i + "] h4").text(this.questionArr[num].choices[i]);
                $(".answ[value=" + i + "]").fadeIn(500);
            }
        }
    },
};
// dude object
var dudeObj = {
    dudeArr: ["Dude", "El-Dudareno", "Duder", "His Dudness"],


}
// timer object
var timer = {

    time: 0,
    countDownTime: 10,

    resetDown: function () {
        timer.countDownTime = 10;
        timer.startCoundown();
    },
    startTimer: function () {
        timeSince = setInterval(timer.count, 1000);
    },
    startCoundown: function () {
        $(".downTime h5").text(this.countDownTime);
        qCountDown = setInterval(timer.countDown, 1000);
    },
    stopCD: function () {
        clearInterval(qCountDown);
    },
    count: function () {
        timer.time++;
        var converted = timer.timeConverter(timer.time);
        $(".sinceTime h5").text(converted);
    },
    countDown: function () {
        timer.countDownTime--;
        $(".downTime h5").text(timer.countDownTime);
        if (timer.countDownTime <= 0) {
            triviaObj.outOfTime();
            this.countDownTime = 10;
            timer.stopCD();
        }
    },
    timeConverter: function (t) {
        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (minutes === 0) {
            minutes = "00";
        }
        else if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return minutes + ":" + seconds;
    }
};

// sound affect object
var gameSounds = {
    effectType: ["loseTracks", "winTracks", "resetTracks"],
    loseTracks: ["",],
    winTracks: ["",],
    resetTracks: ["",],
    soundAff: function (eT) {
        let x = (this.effectType[eT]);
        let gA = (Math.floor(Math.random() * this[x].length));
        gameAudio = new Audio("assets/sounds/" + this[x][gA]);
        gameAudio.play();
    }
};




// declare global variables
var pickedQs = [];
var gameOver = false;
var qCountDown;
var timeSince;
var qCorrect =  0;
var qWrong = 0;
var qLate = 0;
var qTotal = (triviaObj.questionArr).length;

var currentQ = function () {
    var picked = false;
    if (pickedQs.length === triviaObj.questionArr.length) {
        pickedQs = []
        triviaObj.endOfGame();
    }
    while (picked === false) {
        var x = parseInt((Math.floor(Math.random() * triviaObj.questionArr.length)));
        if (pickedQs.includes(x) === false) {
            pickedQs.push(x);
            picked = true;
            return x;
        }
    }
}
// functions

triviaObj.startGame();
