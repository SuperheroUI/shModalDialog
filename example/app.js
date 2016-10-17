import React from 'react'
import ReactDOM from 'react-dom';
import ShModalDialog from '../bin/sh-modal-dialog';
import ModalContent from './modal-content'
require('../node_modules/sh-core/bin/main.css');
require('../node_modules/sh-buttons/bin/main.css');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            showModalOne: false,
            closeModal: false
        };
        this.openMe = this.openMe.bind(this);
        this.openMeOne = this.openMeOne.bind(this);
        this.resetModal = this.resetModal.bind(this);
        this.setReturnData = this.setReturnData.bind(this);
        this.closeMe = this.closeMe.bind(this);
    }

    openMeOne() {
        this.setState({
            showModalOne: true
        })
    }

    openMe() {
        this.setState({
            showModal: true
        })
    }

    resetModal() {
        this.setState({
            showModal: false,
            closeModal: false
        })
    }

    closeMe() {
        this.setState({
            closeModal: true
        })
    }

    setReturnData(data) {
        console.log(data)
    }


    render() {
        return (
            <div>
                <ShModalDialog
                    shShowModal={this.state.showModal}
                    shModalTitle={'Modal Dialog'}
                    shResetModal={this.resetModal}
                    shReturnData={this.setReturnData}
                    shHideModal={this.state.closeModal}
                    shSaveButton={<button onClick={this.closeMe}>save</button>}
                >
                    <ModalContent closeMe={this.closeMe}/>
                </ShModalDialog>
                <button className="sh-btn sh-btn-default" onClick={this.openMe}>Custom Button</button>
                <ShModalDialog
                    shShowModal={this.state.showModalOne}
                    shModalTitle={'Modal Dialog'}
                    shResetModal={this.resetModal}
                    shReturnData={this.setReturnData}
                    shHideModal={this.state.closeModal}
                >
                    <ModalContent closeMe={this.closeMe}/>
                </ShModalDialog>
                <button className="sh-btn sh-btn-primary" onClick={this.openMeOne}>Open Dialog</button>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));