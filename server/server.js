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
    var messages = [];
    var activeUsers = [];

    console.log('New user connected ');
    socket.emit('newMessage', {
        'from': 'Arvind Kumar Sharma',
        'text': 'Hi what are you doing?',
        'createdAt': Date.now().toLocaleString()
    });

    socket.on('registerNewUser',function(userName){
        console.log(userName + ' Registered for chatting.');
        activeUsers.push(userName);
    });
    socket.broadcast.emit('joinWelcomeMessage');

    socket.on('createMessage', (createdMessage) => {
        console.log('New Message created ', createdMessage);
        messages.push(createdMessage);
        console.log(createdMessage);
        //The following code will emit the action to all connected ports 
        // //Including the person who sends something over the server
        // io.emit('newMessage', {
        //     from: newMessage.from,
        //     text: newMessage.text,
        //     createdAt: newMessage.createdAt
        // });

        //The following piece of code enables us to broadcast the message 
        //The sender of the message will not receive the sent message back from the server

        socket.broadcast.emit('newMessage',createdMessage );      
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected.');
        socket.broadcast.emit('userDisconnected');
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