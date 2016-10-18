import React from 'react';
import ReactDOM from 'react-dom';
import ShModalDialog from './sh-modal-as-service';

const rootElement = document.createElement('div');
rootElement.classList.add('sh-modal-Dialog-wrapper');
document.body.appendChild(rootElement);

class ShModalService {
    constructor(contentElement, title, saveButton) {
        this.contentElement = contentElement;
        this.title = title;
        this.saveButton = saveButton;
    }

    open() {
        return new Promise((resolve, reject) => {
            const cancel = () => {
                this.close();
                reject();
            };

            ReactDOM.render(<ShModalDialog shModalTitle={this.title} shModalSaveButton={this.saveButton} shSuccess={resolve} shCancel={cancel}>{this.contentElement}</ShModalDialog>, rootElement);
        });
    }

    close() {
        this.fadeOut();
        setTimeout(()=> {
            ReactDOM.unmountComponentAtNode(rootElement);
        }, 1000)
    }

    fadeOut(){
        document.getElementById('sh-modal').classList.remove('fade-in');
    }
}

export default ShModalService
