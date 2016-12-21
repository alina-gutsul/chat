import  React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const styles = {
    'borderTopLeftRadius': '10px',
    'borderTopRightRadius': '10px'
}

export default class Header extends Component {
    render() {
        return (
            <AppBar
                title="Chat"
                showMenuIconButton={false}
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                style={styles}
                />
        )
    }
}
