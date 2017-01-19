import React, { Component, PropTypes } from 'react';
import MessageItem from '../components/MessageItem.js'
import List from 'material-ui/List/List';

// require ('../../styles/mainSection.scss');

export default class MainSection extends Component {
    render() {
        const { messages, user, users, actions} = this.props;

        const messageList = messages.map(message => {
            const fromCurrentUser = message.user_id === user.id;

            return (
                <MessageItem
                    key={message.id}
                    {...message}
                    changable={fromCurrentUser}
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
