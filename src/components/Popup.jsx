import React, {Component} from 'react';

class Popup extends Component {
    constructor(props) {
        super(props);
        // init variables
        this.state = {
            title: 'Hello, Popup!'
        }
    }

    render() {
        return (
            <div>{this.state.title}</div>
        );
    }
}

export default Popup;