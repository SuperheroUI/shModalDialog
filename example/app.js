import React from 'react'
import ReactDOM from 'react-dom';
import ShModalDialog from '../bin/sh-modal-dialog';
import ModalContent from './modal-content'
import ShDialog from '../src/sh-modal-service'
import '../node_modules/sh-core/bin/main.css';
import '../node_modules/sh-icons/bin/main.css';
import '../node_modules/sh-buttons/bin/main.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.openMe = this.openMe.bind(this);
    }
    openMe() {
        const dialog = new ShDialog(<ModalContent />, 'Service Modal', 'OK');
        dialog.open().then(()=> {
            return this.simulate();
        }).then(()=> {
            return dialog.close();
        }).catch((e)=>{
            console.log(e)
        });
    }

    simulate() {
        const test = ()=> {
            return new Promise((r, err)=> {
                setTimeout(()=> {
                    console.log('return data')
                    r();
                }, 3000)
            });
        };

        return test().then(()=> {
            // what to do
        })
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