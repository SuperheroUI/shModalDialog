import React, {Component} from 'react';
import ShCore from 'sh-core';
import * as _ from 'lodash';
import './sh-modal-dialog.scss';

class ShModalDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            child: null,
            classList: {
                displayModal: false,
                fadeIn: false,
                firstRun: true
            }
        };

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.setData = this.setData.bind(this);
    }

    componentWillReceiveProps(props) {
        if ((this.state.classList.displayModal === false) && (props.shShowModal)) {
            this.props.shResetModal();
            this.showModal();
        }

        if ((this.state.classList.displayModal === true) && (props.shHideModal)) {
            this.hideModal()();
        }
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
        console.log(this.props.children)
        if (this.props.children && _.isFunction(this.props.children.type)) {
            this.setState({
                child: React.cloneElement(this.props.children, {returnData: {}})
            })
        }
    }

    setData(returnData) {
        if (returnData && (this.state.child != null) && this.props.shReturnData) {
            this.props.shReturnData(this.state.child.props.returnData)
        }
    }

    hideModal(returnData) {
        return ()=> {
            this.setState({
                classList: {
                    fadeIn: false,
                    displayModal: true
                }
            }, ()=> {
                setTimeout(()=> {
                    this.setState({
                        classList: {
                            displayModal: false,
                            fadeIn: false
                        }
                    }, this.setData(returnData))
                }, 1000)
            })
        }
    }

    getSaveButton() {
        if (this.props.shSaveButton) {
            return this.props.shSaveButton
        } else {
            return <button className="sh-btn sh-btn-primary" onClick={this.hideModal(true)}>Save</button>
        }
    }

    render() {
        return (
            <div className={'sh-modal-dialog ' + ShCore.getClassNames(this.state.classList)}>
                <div className="sh-modal-content ">
                    <i className="sh-icon icon-x sh-close" onClick={this.hideModal()}/>
                    <div className="sh-modal-title">{this.props.shModalTitle}</div>
                    <div className="sh-dynamic-content">
                        {this.state.child}
                    </div>
                    <div className="sh-button-divider"/>
                    <div className="sh-button-group">
                        <button className="sh-btn sh-btn-default sh-cancel" onClick={this.hideModal()}>Cancel</button>
                        {this.getSaveButton()}
                    </div>
                </div>
            </div>
        )
    }
}

ShModalDialog.propTypes = {
    shSaveButton: React.PropTypes.any,
    shShowModal: React.PropTypes.bool,
    shHideModal: React.PropTypes.bool,
    shResetModal: React.PropTypes.func.isRequired
};

export default ShModalDialog;