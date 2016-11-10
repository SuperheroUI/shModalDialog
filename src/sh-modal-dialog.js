import React from 'react';
import ShCore from 'sh-core';
import * as _ from 'lodash';
import './sh-modal-dialog.scss';

class ShModalDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classList: {
                displayModal: false,
                fadeIn: false,
                firstRun: true,
            }
        };

        this.showModal = this.showModal.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    showModal() {
        this.setState({
            classList: {
                displayModal: true
            }
        }, ()=> {
            setTimeout(()=> {
                this.setState({
                    classList: {
                        displayModal: true,
                        fadeIn: true
                    }
                })
            }, 100)
        })
    }

    componentDidMount() {
        this.showModal();
    }

    handleSuccess() {
        this.props.shSuccess();

    }

    handleCancel() {
        this.props.shCancel();
    }

    getSaveButton() {
        if (!this.props.shModalSaveButton || _.isString(this.props.shModalSaveButton)) {
            let buttonText = this.props.shModalSaveButton;
            if (!buttonText) {
                buttonText = 'Save';
            }

            return <button id="sh-save-button" className="sh-btn sh-btn-primary"
                           onClick={this.handleSuccess}>{buttonText}</button>
        } else {
            return this.props.shModalSaveButton
        }
    }

    render() {
        return (
            <div className={'sh-modal-dialog ' + ShCore.getClassNames(this.state.classList)}
                 id="sh-modal">
                <div className={"sh-modal-content " + this.props.shClass}>
                    <i className="sh-icon icon-x sh-close" onClick={this.handleCancel}/>
                    <div className="sh-modal-title">{this.props.shModalTitle}</div>
                    <div className="sh-dynamic-content">
                        {this.props.children}
                    </div>
                    <div className="sh-button-divider"/>
                    <div className="sh-button-group">
                        <button className="sh-btn sh-btn-default sh-cancel" onClick={this.handleCancel}>Cancel</button>
                        {this.getSaveButton()}
                    </div>
                </div>
            </div>
        )
    }
}

ShModalDialog.propTypes = {
    shModalTitle: React.PropTypes.string,
    shModalSaveButton: React.PropTypes.any,
    shSuccess: React.PropTypes.func,
    shCancel: React.PropTypes.func,
};

export default ShModalDialog;
