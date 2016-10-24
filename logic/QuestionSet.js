function generateNewQuestionSet(level) {

    var returnQuestionSet = [];
    for (var i = 0; i < 10; i++) {
        var newQuestion = "";

        switch (level) {
            case 1:
                newQuestion = Math.floor(Math.random() * 10) + " + " + Math.floor(Math.random() * 10);
                break;
            case 2:
                break;
            case 3:
                break;
        }
        returnQuestionSet.push(newQuestion);
    }
    return returnQuestionSet;

}

module.exports = {
    generate: generateNewQuestionSet
}