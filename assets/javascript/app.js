// define objects & arrays
// trivia object
var triviaObj = {
    qNum: 0,
    

    questionArr: [
        { question: "Did this rug really tie the room together?", choices: ["yes", "no", "which rug?",], correct: 0 , gif: "carpet.gif",},
        { question: "What is good about National Socialism?", choices: ["they don't believe in anything", "atleast it's an ethos", "shut up Donny", "I'm the Dude, man"], correct: 1, gif: "socialism.gif",},
        { question: "Do we have anything to fear from Nihilists?", choices: ["yes", "no we don't", "those men are cowards", ], correct: 2, gif: "nihilists.gif",},
        { question: "Is the Dude a lazy man?", choices: ["You have not frame of reference here", "shut up Donny", "obviously, you're not a golfer", "He most certainly is"], correct: 3, gif: "dude-abides.gif",},
        { question: "Will this agression stand?", choices: ["You're about to enter a world of hurt", "shut up Donny", "my wife is not the problem here!", "Stay away from my lady friend"], correct: 2, gif: "agression_wont-stand.gif",},
        { question: "tomorrow is already the 10th", choices: ["Oh, OK.", "far out", "Oh, is it?"], correct: 1, gif: "tomorrows-the-tenth.gif" },
        { question: "It's like Lennin said", choices: ["Who is that?", "where do you want us to go?", "I drank what?", "I am the walrus"], correct: 3, gif: "I am the walrus.gif",},
        { question: "Do you roll on shomer Shabbos", choices: ["I'm rolling rocks, here", "I don't roll on shomer Shabbos", "mark it zero", "You're out of your depth, Donny"], correct: 1, gif: "shomer shabbos.gif", },
        { question: "The story is ludicrous, you can imagine where it goes from here..", choices: ["He leaves?", "He fixes the cable?", "He visits Jackie Treehorn", "They become little Lebowski urban acheivers"], correct: 1, gif: "fixes cable.gif"},
        { question: "Where is the money Lebowski?", choices: ["it's a complicated story, man", "It's got to be down there somwhere, let me take another look", "certain things have come to light, I've got information.", "Larry has it",], correct: 1, gif: "wheres the mone.gif"},
        { question: "Do you want a toe?", choices: ["I don't want a toe", "I can get you a toe by 3 o-clock this afternoon", "Are you crazy?", "Shut up Donny"], correct: 1, gif: "want-toe.gif", },
        { question: "You got any promising leads? ", choices: ["We are doing all we can", "this isn't CSI", "Yeah, we got 4 more detectives working on the case.  They've got us working in shifts!", "Yes we do"], correct: 2, gif: "Leads.gif"},
    ],

    startGame: function () {
        imObj.gameImg(2);
        // this.qNum = currentQ();
        this.clickButtons();
        this.nextQ();
        timer.startTimer();
        // timer.startCoundown();
        qCorrect = 0;
    },

    reStart: function(){
        $(".result h3").text("Dude Trivia!");
        $(".restart").remove();
        $("#gameArea").fadeIn(200);
        gameOver = false;
        qCorrect =  0
        timer.startTimer();
        timer.startCoundown();
        this.nextQ();
        gameSounds.soundAff(2);
    },

    clickButtons: function () {
        $(".answ").mouseenter(function(){
            if (gameOver === false){
                gameSounds.soundAff(3);

            }
        });
        $(".answ").click(function () {
            if (gameOver === false && !chosen) {
                chosen = true;
                var x = parseInt($(this).attr("value"));
                if (x === triviaObj.questionArr[triviaObj.qNum].correct) {
                    triviaObj.correctAns();
                }
                else {
                    triviaObj.wrongAns();
                }
            }
        });
        $(document).on("click", ".restart", function(){
            triviaObj.reStart();
        })
    },

    correctAns: function () {
        qCorrect ++;
        timer.stopCD();
        gameSounds.soundAff(1);
        $(".result h3").text("Far out man.");
        imObj.gameImg(-1);
        // console.log ("Correct: " + qCorrect);
        // console.log ("Wrong: " + qWrong);
        // console.log ("Late: " + qLate);
        triviaObj.nextQ();
    },

    wrongAns: function () {
        qWrong ++;
        timer.stopCD();
        gameSounds.soundAff(0);
        imObj.gameImg(1);
        $(".result h3").text("No way man.");
        // console.log ("Correct: " + qCorrect);
        // console.log ("Wrong: " + qWrong);
        // console.log ("Late: " + qLate);
        triviaObj.nextQ();
    },

    outOfTime: function () {
        chosen = true;
        qLate ++;
        timer.stopCD();
        imObj.gameImg(1);
        gameSounds.soundAff(0);
        $(".result h3").text("Too late man.");
        // console.log ("Correct: " + qCorrect);
        // console.log ("Wrong: " + qWrong);
        // console.log ("Late: " + qLate);
        triviaObj.nextQ();
    },

    endOfGame: function () {
        // gameOver = true;
        clearInterval(qCountDown);
        clearInterval(timeSince);
        $(".result h3").text("You got " + qCorrect + " out of " + qTotal + " correct!");
        $(".question h2").empty();
        $(".answ h4").empty();
        $("#gameArea, #restart").hide(); 
        $("#restart").append('<button type="button" class="btn btn-primary restart">Restart Game</button>');
        $("#restart").delay(5000).fadeIn(1000);
    },

    nextQ: function () {
        if (pickedQs.length >= triviaObj.questionArr.length) {
            // alert("Gameover");
            pickedQs = []
            gameOver = true;
            triviaObj.endOfGame();
        }
        if (gameOver === false) {
            this.qNum = currentQ();
            triviaObj.updateQuestions(this.qNum);
        }
    },

    updateQuestions: function (num) {
        setTimeout(function() {
            $(".result h3").text("Dude Trivia!");
          }, 4000);
        if (gameOver == false) {
            chosen = false;
            $(".answ h4, question h2").empty();
            $(".question h2").text(this.questionArr[num].question);
            for (let i = 0; i < this.questionArr[num].choices.length; i++) {
                $(".answ[value=" + i + "] h4").text(this.questionArr[num].choices[i]);
            }
        }
    },
};
// dude object
var dudeObj = {
    dudeArr: ["Dude", "El-Dudareno", "Duder", "His Dudness"],


}

// dude images
var imObj = {
    imgType: ["winImArr", "loseImArr", "startImArr",],
    winImArr: ["new-rug.jpg","socialism.gif","thebiglebowski.jpg"],
    loseImArr: ["lebowski-nope-1.gif","trio.jpg", "dude-ashes.gif", "no-not-exactly.gif"],
    startImArr: ["big-lebowski-the-1998-007-jeff-bridges-john-goodman-steve-buscemi-bfi-00m-jjm.jpg","lebowski_done_no_border_SMALL_size_1024x1024.jpg","jesus.gif", "bigL.gif"],
    gameImg: function(iT){
        $(".answ, .question").hide();
        if(gameOver == false){
            if (!(iT == -1)){
                let x = (this.imgType[iT]);
                console.log (x)
                let iR = (Math.floor(Math.random() * this[x].length));
                $(".images").empty();
                $(".images").append("<img src='assets/images/" + this[x][iR] + "'>");
                // $(".images").fadeIn(500).delay(4500).fadeOut(500);
                $(".images").fadeIn(500).delay(4500).fadeOut(500, function(){timer.startCoundown()});
                $(".answ, .question").delay(5000).fadeIn(1500);
            }else {
                let x = (triviaObj.questionArr[triviaObj.qNum].gif);
                $(".images").empty();
                $(".images").append("<img src='assets/images/" + x + "'>");
                // $(".images").fadeIn(500).delay(4500).fadeOut(500);
                $(".images").fadeIn(500).delay(4500).fadeOut(500, function(){timer.startCoundown()});
                $(".answ, .question").delay(5000).fadeIn(1500);
            }

        }
    }
};

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
        if (gameOver ==  false){
            clearInterval(qCountDown);
            timer.countDownTime =10;
            $(".downTime h5").text(this.countDownTime);
            qCountDown = setInterval(timer.countDown, 1000);
        }
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
            timer.stopCD();
            this.countDownTime = 10;
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
    effectType: ["loseTracks", "winTracks", "resetTracks", "hoverTracks"],
    loseTracks: ["miss-01.m4a","miss-02.m4a","miss-03.m4a","miss-04.m4a",],
    winTracks: ["bowling2.mp3","strike_2.mp3", "strike-01.m4a", "strike-02.m4a", "strike-03.m4a", "strike-04.m4a", "strike-05.m4a", "strike-06.m4a"],
    resetTracks: ["Strike.mp3", "I Like Your Style.mp3", "Dios Mo Man.mp3"],
    hoverTracks: ["toss-01.m4a", "toss-02.m4a", "toss-03.m4a", "toss-04.m4a", "toss-05.m4a","bowling1.mp3"],
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
var chosen = false;

var currentQ = function () {
    var picked = false;
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
