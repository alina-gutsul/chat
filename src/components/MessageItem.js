import React, { Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import cx from 'classnames';
import { removeMessage } from '../actions';

class MessageItem extends Component {

    render() {
        const { message_type, text, id, user_name, removeMessage, color, changable } = this.props;
        var classes = cx(message_type, {'list-item': true});
        if (changable) {
            return (
                <ListItem
                    className={classes}
                    leftAvatar={
                        <div className="icon-name" style={{ backgroundColor: color }}>
                             { user_name }
                         </div>
                    }
                >
                    { text }
                    <IconButton
                        onClick={ () => removeMessage(id) }
                        className="icon-delete"
                        tooltip="Delete"
                        >
                      <ClearIcon />
                    </IconButton>
                </ListItem>
            )
        }

        return (
            <ListItem
                className={classes}
                rightAvatar={
                    <div className="icon-name" style={{backgroundColor: color }}>
                        { user_name }
                    </div>
                }
            >
                { text }
            </ListItem>
        )
    }
}

export default connect(
    null,
    {
        removeMessage
    }
)(MessageItem);
