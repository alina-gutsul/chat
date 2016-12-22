import React, { Component, PropTypes} from 'react';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import cx from 'classnames';

// require ('../../styles/messageItem.scss');

export default class MessageItem extends Component {

    render() {
        const { message_type, text, id, user_name, deleteHandle, changable } = this.props;
        var classes = cx(message_type, {'list-item': true});
        if (changable) {
            return (
                <ListItem
                    className={classes}
                    leftAvatar={
                        <div className="icon-name"> { user_name } </div>
                    }
                >
                    { text }
                    <IconButton
                        onClick={ ()=> { deleteHandle(id) } }
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
                    <div className="icon-name"> { user_name } </div>
                }
            >
                { text }
            </ListItem>
        )
    }
}
