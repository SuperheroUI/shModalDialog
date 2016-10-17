import React, {Component} from 'react';

class ModalContent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.setValues = this.setValues.bind(this);
    }

    componentDidMount() {
    }

    setValues() {
        this.props.returnData.test = 1
    }

    render() {
        return (
            <div className="bc-editor">
                <button onClick={this.setValues}>Set Values</button>
                <button onClick={this.props.closeMe}>Call Close</button>
                Content for the modal Dialog
            </div>
        )
    }
}

export default ModalContent;