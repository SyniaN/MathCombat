var express = require('express');
var app = express();
var port = process.env.port || 1337;

app.use(express.static(__dirname + '/client'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.get('/api/getQuestionSet', function(req, res) {
    console.log('sending hi');
    newQuestionSet = generateQuestions(1);
    res.json({
        data: newQuestionSet
    });
});

function generateQuestions(level) {

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

var server = app.listen(port, function() {
    console.log('Angular Arithmatica listening on port ' + port);
})