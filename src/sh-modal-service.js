import React from 'react';
import ReactDOM from 'react-dom';
import ShModalDialog from './sh-modal-dialog';

const rootElement = document.createElement('div');
rootElement.classList.add('sh-modal-Dialog-wrapper');
document.body.appendChild(rootElement);

class ShModalService {
    constructor(contentElement, title, saveButton, cssClass, forceValid) {
        this.contentElement = contentElement;
        this.title = title;
        this.saveButton = saveButton;
        this.cssClass = cssClass || '';
        this.forceValid = forceValid;
    }

    open() {
        return new Promise((resolve, reject) => {
            const cancel = () => {
                this.close();
                reject();
            };

            ReactDOM.render(<ShModalDialog callBackFunction shModalTitle={this.title} shForceValid={this.forceValid} shModalSaveButton={this.saveButton} shSuccess={resolve} shCancel={cancel} shClass={this.cssClass}>{this.contentElement}</ShModalDialog>, rootElement);
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

    setValid(){
        document.getElementById('sh-modal').classList.add('sh-valid');
    }

    removeValid(){
        document.getElementById('sh-modal').classList.remove('sh-valid');
    }
}

export default ShModalService
