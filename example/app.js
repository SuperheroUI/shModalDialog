import React from 'react'
import ReactDOM from 'react-dom';
import ModalContent from './modal-content'
import ShDialog from '../src/sh-modal-service'
import '../node_modules/sh-core/bin/main.css';
import '../node_modules/sh-icons/bin/main.css';
import '../node_modules/sh-buttons/bin/main.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newCard: null,
            modalDialog: null
        };
        this.openMe = this.openMe.bind(this);
        this.getButton = this.getButton.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.validateBattleCard = this.validateBattleCard.bind(this);
    }

    getButton() {
        return <button  id="bc-custom-button" className={"sh-btn sh-btn-primary"}
                       onClick={this.closeDialog}>Save</button>
    }
    validateBattleCard() {
        this.state.modalDialog.setValid();
        this.setState({
            modalValid: true,
        })
    }

    componentDidMount() {
        this.setState({
            modalDialog: new ShDialog(<ModalContent
                onClick={this.validateBattleCard}/>, 'Create Battle Card', this.getButton())
        })
    }


    closeDialog() {
        const checkForCard = ()=> {
            return new Promise((resolve)=> {
                if (this.state.modalValid) {
                    resolve()
                }
            });
        };

        checkForCard().then(()=> {
            return this.simulate();
        }).then(()=> {
            this.setState({
                modalValid: null
            });
            return this.state.modalDialog.close();
        }).catch((e)=> {
            if (!_.isUndefined(e)) {
                console.log(e)
            }
        });
    }

    simulate() {
        return new Promise((resolve)=> {
            setTimeout(()=> {
                console.log('make request to save');
                resolve();
            }, 500)
        });
    }

    openMe() {
        this.state.modalDialog.open().then(()=> {
            return this.simulate();
        }).then(()=> {
            return dialog.close();
        }).catch((e)=> {
            console.log(e)
        });
    }

    render() {
        return (
            <div>
                <button className="sh-btn sh-btn-default" onClick={this.openMe}>Open</button>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));