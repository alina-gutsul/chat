import path from 'path';
import SocketIo from 'socket.io';
import express from 'express';
import { setUserId, addMessage } from '../src/actions';
import * as messageTypes from '../src/constants/MessageTypes';
import cuid from 'cuid';

const users = [];
let typingUsers = [];

const app = express();

const server = app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('server listening on port: %s', 3000);
});

const io = new SocketIo(server);



io.on('connection', function(socket){
    console.log('New user connected -> id: ', socket.id);

    socket.on('add user', (data) => {
        users[socket.id] = { name: data.name, color: data.color };
        socket.broadcast.emit('message from server', {
            message: data.name + ' joined conversation',
            id: cuid(),
            user_id: socket.id,
            message_type: messageTypes.NOTIFICATION
        });
    });

    socket.on('delete message', (id) => {
        io.emit('delete from server', id);
    });

    socket.on('chat message', function(data){
        const user = users[socket.id];
        socket.broadcast.emit('message from server', {
            message: data.message,
            id: data.id,
            user_id: data.user_id,
            user_name: user.name,
            color: user.color,
            message_type: messageTypes.MESSAGE
        });
    });

    socket.on('disconnect', function() {
        io.emit('message from server', {
            message: users[socket.id].name + ' left conversation',
            id: cuid(),
            user_id: socket.id,
            message_type: messageTypes.NOTIFICATION
        });
        delete users[socket.id];
    });

    socket.on('user is typing', function() {
        typingUsers.push(socket.id);
        socket.broadcast.emit('change typing status', printTypingUsers());
    });

    socket.on('user stopped typing', function() {
        typingUsers = typingUsers.filter(userId =>
            userId !== socket.id
        )
        socket.broadcast.emit('change typing status', printTypingUsers());
    });
});


function printTypingUsers()  {
    let output = '';

    if (typingUsers.length < 1) {
        return output;
    }

    typingUsers.forEach((userId) => {
        output += users[userId].name + ' ';
    });

    output += typingUsers.length == 1 ? 'is typing...' : 'are typing...'

    return output;
}
