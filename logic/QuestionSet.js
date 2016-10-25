function generateNewQuestionSet(level) {

    var returnQuestionSet = [];
    for (var i = 0; i < 160; i++) {
        var newQuestion = "";

        switch (level) {
            case '1':
                options = {
                    operantCount: 2,
                    max: 10,
                    min: 1,
                }
                newQuestion = addition(options);
                break;
            case '2':
                options = {
                    operantCount: 2,
                    max: 20,
                    min: 0,
                }
                newQuestion = subtraction(options);
                break;
            case '3':
                options = {
                    operantCount: 3,
                    max: 10,
                    min: 0,
                }
                newQuestion = addition(options);
                break;
            case '4':
                options = {
                    operantCount: 4,
                    max: 15,
                    min: 1,
                }
                newQuestion = subtraction(options);
                break;
        }
        returnQuestionSet.push(newQuestion);
    }
    return returnQuestionSet;
}

function rnd(max, min) {
    min = Math.floor(min);
    if (max < 0) { max = 0 }
    if (min < 0) { min = 0 }
    return Math.floor(Math.random() * max) + min;
}

function addition(o) {

    newQuestion = rnd(o.max, o.min);
    for (var i = 1; i < o.operantCount; i++) {
        newQuestion += " + ";
        newQuestion += rnd(o.max, o.min);
    }
    return newQuestion;
}

function subtraction(o) {
    newOperand = rnd(o.max, o.max / 2);
    newQuestion = newOperand;
    o.max = newOperand;
    for (var i = 1; i < o.operantCount; i++) {
        newQuestion += " - ";
        newOperand = rnd(o.max, o.min);
        newQuestion += newOperand;
        o.max = o.max - newOperand;
        if (o.max <= 0) {
            return newQuestion;
        } else if (Math.random() < 0.5) {
            return newQuestion;
        }
    }

    return newQuestion;
}

module.exports = {
    generate: generateNewQuestionSet
}