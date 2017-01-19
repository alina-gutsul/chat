import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

export default class TypingState extends Component{
    render () {

        const { state } = this.props;
        const visibility = state == '' ? 'typing-state--hidden' : 'typing-state--visible';
        var classes = cx(visibility, {'typing-state': true});

        return(
            <div className={classes} >
                { state }
            </div>
        );
    }
}
