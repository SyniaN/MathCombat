var express = require('express');
var app = express();
var port = process.env.port || 1337;

app.use(express.static(__dirname + '/client'));

app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});

var server = app.listen(port, function() {
    console.log('Angular Arithmatica listening on port ' + port);
})


/////////////
//Socket.io//
/////////////
/*var io = require('socket.io')(server);

io.sockets.on('connection', function(socket) {
    socket.on('chat_message', function(msg) {
        io.emit("chat_message", msg);
    });
});*/