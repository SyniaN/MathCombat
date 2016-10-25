var express = require('express');
var app = express();
var port = process.env.port || 1337;

var Bot = require('./logic/Bot');
var Level = require('./logic/Level');
var QuestionSet = require('./logic/QuestionSet');
var User = require('./logic/User');

app.use(express.static(__dirname + '/client'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.get('/api/getQuestionSet', function(req, res) {
    console.log('/api/getQuestionSet?level=' + req.query.level);
    var level = req.query.level;
    var newQuestionSet = QuestionSet.generate(level);
    res.json({
        data: newQuestionSet
    });
});

app.get('/api/getLevelInfo', function(req, res) {
    console.log('api/getLevelInfo');
    var newLevelInfo = {
        userDescription: User.description(),
        botDescription: Bot.description(),
        botStrategy: Bot.strategy(),
        hint: Level.hint(),
        timeLimit: Level.timeLimit(),
        preLevelTutorial: Level.tutorial(),
    }
});

var server = app.listen(port, function() {
    console.log('Math Combat listening on port ' + port);
})