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
                newQuestion = addition(options);
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
                    operantCount: 3,
                    max: 15,
                    min: 0,
                }
                newQuestion = addition(options);
                break;
        }
        returnQuestionSet.push(newQuestion);
    }
    return returnQuestionSet;
}

function rnd(max, min) {
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

module.exports = {
    generate: generateNewQuestionSet
}