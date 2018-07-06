import React, {Component} from 'react';

class Option extends Component {
    constructor(props) {
        super(props);
        // init variables
        this.state = {
            title: 'Hello, Option!'
        }
    }

    render() {
        return (
            <div>{this.state.title}</div>
        );
    }
}

export default Option;