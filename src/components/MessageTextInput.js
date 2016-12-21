import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';


const styles = {
    'width': '94%',
    'height': 'auto',
    'margin': '3%',
}

export default class MessageTextInput extends Component {

  state = {
    text: this.props.text || ''
  }

  handleChange = e => {
    this.setState({ text: e.target.value })
  }

  handleSubmit = e => {
    const text = e.target.value.trim()
    if (e.which === 13 & text !=='') {
        this.props.onSave(text);
        this.setState({ text: '' });
    }
  }

  render() {
    return (
        <TextField
            hintText={this.props.placeholder}
            multiLine={true}
            rows={2}
            rowsMax={4}
            onChange={this.handleChange}
            onKeyDown={this.handleSubmit}
            value={this.state.text}
            style={styles}
        />
    )
  }
}
