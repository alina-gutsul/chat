import React, { Component, PropTypes } from 'react';
import { getUserName, removeMessage } from '../actions';
import MessageItem from '../components/MessageItem.js'
import List from 'material-ui/List/List';

// require ('../../styles/mainSection.scss');

export default class MainSection extends Component {
    render() {
        const { messages, user, users} = this.props;

        const messageList = messages.map(message => {
            const fromCurrentUser = message.user_id === user.id;
            const userName = fromCurrentUser ? user.name : getUserName(users, message.user_id);

            return (
                <MessageItem
                    key={message.id}
                    {...message}
                    user_name={userName}
                    changable={fromCurrentUser}
                    deleteHandle={removeMessage}
                />
            )
        });

        return (
            <section className="main-section">
                <div>
                    <List className="messages">
                        {messageList}
                    </List>
                </div>
            </section>
        )
    }
}
