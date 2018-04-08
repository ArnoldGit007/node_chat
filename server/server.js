const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
const port = process.env.PORT || 3000;
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected ');
    socket.emit('newMessage', {
        'from': 'Arvind Kumar Sharma',
        'text': 'Hi what are you doing?',
        'createdAt': Date.now().toLocaleString()
    });

    socket.on('createMessage', (newMessage) => {
        console.log('New Message created ', newMessage);
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected.');
    });
});

try {
    server.listen(port, function () {
        console.log('Server is up and running at port 3000.');
    });
}
catch (e) {
    console.log(e);
}

//console.log(socketIO);