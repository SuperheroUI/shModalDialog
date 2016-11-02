import React, {Component} from 'react';

class ModalContent extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.change = this.change.bind(this);
    }

    change() {
        this.props.onClick()
    }

    render() {
        return (
            <div onClick={this.change} className="bc-editor">
                Content for the modal Dialog click here to validate the modal
            </div>
        )
    }
}

export default ModalContent;