import path from 'path';
import SocketIo from 'socket.io';
import express from 'express';
import { setUserId, addMessage } from '../src/actions';
import * as messageTypes from '../src/constants/MessageTypes';
import cuid from 'cuid';

let users = [];

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
        users[socket.id] = { name: data.name }
        io.emit('message from server', {
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
        io.emit('message from server', {
            message: data.message,
            id: data.id,
            user_id: data.user_id,
            user_name: users[socket.id].name,
            message_type: messageTypes.MESSAGE
        });
    });

    socket.on('disconnect', function(data) {
        io.emit('message from server', {
            message: users[socket.id].name + ' left conversation',
            id: cuid(),
            user_id: socket.id,
            message_type: messageTypes.NOTIFICATION
        });
    });
});
