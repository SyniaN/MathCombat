var express = require('express');
var app = express();
var port = process.env.port || 1337;

app.use(express.static(__dirname + '/client'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.get('/api/getQuestionSet', function(req, res) {
    console.log('sending hi');
    res.json({
        data: [
            "5 + 2",
            "6 + 7",
            "8 - 2",
            "10 ÷ 5",
            "9 x 4",
            "7 - 5",
            "9 ÷ 3",
            "1 + 1",
            "6 ÷ 2",
            "3 + 2",
            "4 + 5",
            "2 + 6",
            "7 - 3",
            "3 + 2",
            "5 + 7",
            "4 - 1",
            "2 + 6",
            "10 ÷ 5",
            "6 + 6",
            "5 x 9",
            "3 - 1",
            "10 ÷ 2",
            "4 + 5",
            "3 x 2",
            "10 - 10",
            "3 ÷ 3",
            "4 x 8",
            "4 ÷ 2",
            "1 x 2",
            "6 ÷ 2"
        ]
    });
});

var server = app.listen(port, function() {
    console.log('Angular Arithmatica listening on port ' + port);
})