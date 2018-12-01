var questionArr = [  
    {choices: ["answer1", "answer 2", "answer 3", "answer 4"], correct: 1 },
    {choices: ["answer1", "answer 2", "answer 3", "answer 4"], correct: 1 },
    {choices: ["answer1", "answer 2", "answer 3", "answer 4"], correct: 1 },
    {choices: ["answer1", "answer 2", "answer 3", "answer 4"], correct: 1 },
];

var questionObj = {
    question_0: { choices: ["answer 1", "answer 2", "answer 3", "answer 4"], correct: 1},
    question_1: { choices: ["answer 1", "answer 2", "answer 3", "answer 4"], correct: 1},
    question_2: { choices: ["answer 1", "answer 2", "answer 3", "answer 4"], correct: 1},
    question_3: { choices: ["answer 1", "answer 2", "answer 3", "answer 4"], correct: 1},
};

console.log(questionObj.question_1.choices[1]);
console.log(questionObj.question_1.choices[0]);
console.log (questionObj.question_0.choices.length);
console.log (questionArr.length);