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

//not used
//sending id from client to server
    // socket.on('new client connected', (data) => {
    //     console.log('id from client: ', data.id);
    // });

    //set user id
    socket.emit('initialize user', socket.id);

    //add user to array
    socket.on('add user', (data) => {
        io.emit('add user from server', data);
    });

    socket.on('delete message', (id) => {
        io.emit('delete from server', id);
    });

    socket.on('chat message', function(data){
        io.emit('message from server', {message: data.message, id: data.id, user_id: data.user_id, message_type: messageTypes.MESSAGE });
    });

    socket.on('disconnect', function(data) {
        io.emit('delete user', socket.id);
    });
});
