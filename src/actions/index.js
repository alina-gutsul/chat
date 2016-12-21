import * as types from '../constants/ActionTypes';
import * as messageTypes from '../constants/MessageTypes';
import io from 'socket.io-client';
import cuid from 'cuid';
import { socket } from '../containers/App';

function setUserParams(id, name) {
    return {
        type: types.SET_USER_ID,
        id,
        name
    }
}

export function initializeCurrentUser(id, name){
    return (dispatch, getState) => {
        socket.emit('add user', {id: id, name: name});
        return dispatch(setUserParams(id, name));
    }
}

function addUser(data) {
    return {
        type: types.ADD_USER,
        id: data.id,
        name: data.name
    }
}

export function addNewUser(data) {
    return (dispatch, getState) => {
        dispatch(addUser(data));
        dispatch(storeMessageRequestFromServer({
            message: data.name + ' joined conversation',
            id: cuid(),
            user_id: data.id,
            message_type: messageTypes.NOTIFICATION
        }));
    }
}

function removeUser(id) {
    return {
        type: types.DELETE_USER,
        id: id
    }
}

export function deleteUser(id) {
    return (dispatch, getState) => {
        let name = getState().users.find(usr => usr.id === id).name;
        dispatch(removeUser(id));
        dispatch(storeMessageRequestFromServer({
            message: name + ' left conversation',
            id: cuid(),
            user_id: id,
            message_type: messageTypes.NOTIFICATION
        }));
    }
}

export function getUserName(users, userId) {
    const name = users.find(usr => usr.id === userId).name;
    return name;
}

function addMessage(text, id, user_id, message_type) {
    return {
        type: types.SEND_MESSAGE,
        id,
        user_id,
        text,
        message_type
    }
}

export function storeMessageRequestFromServer(data) {
    return (dispatch, getState) => {
        const user_id = getState().user.id;
        if(user_id !== data.user_id){
            return dispatch(addMessage(data.message, data.id, data.user_id, data.message_type));
        }
    }
}

export function sendMessage(text) {
    return function (dispatch, getState) {
        const id = cuid();
        socket.emit('chat message', {message: text, id: id, user_id: getState().user.id});
        return dispatch(addMessage(text, id, getState().user.id, messageTypes.MESSAGE));
    }
}

function deleteMessage(id) {
    return{
        type: types.DELETE_MESSAGE,
        id
    }
}

export function removeMessage(id){
    return (dispatch) => {
        socket.emit('delete message', id);
        return dispatch(deleteMessage(id));
    }
}

export function removeMessageRequestFromServer(id){
    return (dispatch, getState) => {
        const messages = getState().messages;
        if(messages.find(msg => msg.id === id)){
            return dispatch(deleteMessage(id));
        }
    }
}

export function editMessage(id, text) {
    return{
        type: types.EDIT_MESSAGE,
        id,
        text
    }
}
