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
        io.emit('newMessage', {
            from: newMessage.from,
            text: newMessage.text,
            createdAt: newMessage.createdAt
        });
        console.log('After IO.EMIT');
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected.');
    });
});

try {
    server.listen(port, function () {
        console.log(`Server is up and running at port ${port}.`);
    });
}
catch (e) {
    console.log(e);
}

//console.log(socketIO);