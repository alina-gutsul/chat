import * as types from '../constants/ActionTypes';
import * as messageTypes from '../constants/MessageTypes';
import io from 'socket.io-client';
import cuid from 'cuid';
import { socket } from '../containers/App';
import genColor from 'color-generator';

function setUserParams(id, name, color) {
    return {
        type: types.SET_USER_ID,
        id,
        name,
        color
    }
}

export function initializeCurrentUser(name){
    const color = genColor().hexString();
    return (dispatch, getState) => {
        socket.emit('add user', { name: name, color: color });
        return dispatch(setUserParams(socket.id, name, color));
    }
}

function addMessage(text, id, user_id, user_name, color, message_type) {
    return {
        type: types.SEND_MESSAGE,
        id,
        user_id,
        user_name,
        text,
        color,
        message_type
    }
}

export function storeMessageRequestFromServer(data) {
    return (dispatch, getState) => {
        return dispatch(addMessage(data.message, data.id, data.user_id, data.user_name, data.color, data.message_type));
    }
}

export function sendMessage(text) {
    return function (dispatch, getState) {
        const id = cuid();
        const user = getState().user;
        socket.emit('chat message', {message: text, id: id, user_id: getState().user.id});
        return dispatch(addMessage(text, id, user.id, user.name, user.color, messageTypes.MESSAGE));
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
        return dispatch(deleteMessage(id));
    }
}

export function editMessage(id, text) {
    return{
        type: types.EDIT_MESSAGE,
        id,
        text
    }
}

export function userIsTyping() {
    return (dispatch) => {
        socket.emit('user is typing');
    }
}

export function userStoppedTyping() {
    return (dispatch) => {
        socket.emit('user stopped typing');
    }
}
