var express = require('express');
var app = express();
var port = process.env.port || 1337;

app.use(express.static(__dirname + '/client'));

app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

app.listen(port, function() {
    console.log('Angular Arithmatica listening on port ' + port);
})