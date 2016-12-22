import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import MessageTextInput from '../components/MessageTextInput';
import * as MessageActions from '../actions';
import cuid from 'cuid';

export const socket = io('http://localhost:3000');


class App extends Component {
    componentDidMount() {
        const { actions } = this.props;

        socket.on("connect", () => {
            var name = prompt("Welcome. Please enter your name");
            actions.initializeCurrentUser(name);
        });

        socket.on('delete from server', (id) => {
            actions.removeMessageRequestFromServer(id);
        });

        socket.on("message from server", (data) => {
            actions.storeMessageRequestFromServer(data);
        });

    }

    render() {
        const {messages, user, users, actions} = this.props;
        return (
            <MuiThemeProvider>
                <div className="container">
                    <Header />
                    <MainSection messages={messages} user={user} users={users} actions={actions} />
                    <MessageTextInput placeholder="your message..." onSave={actions.sendMessage} />
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = state => ({
    messages: state.messages,
    user: state.user,
    users: state.users
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(MessageActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
