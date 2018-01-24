import React, { Component } from 'react'
import ReactModal from 'react-modal';
import classNames from 'classnames';

import './ModalStyles.scss';

class TicketTransferModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: ''
    };
    this.transferTicket = this.transferTicket.bind(this);
  }

  transferTicket(ticketId, transferToUser) {
    this.props.transferTicket(ticketId, transferToUser);
    this.props.closeModal();
  }

  render() {
    const { ticket, isOpen, closeModal } = this.props;
    return (
      <ReactModal
        isOpen={isOpen}
        contentLabel="View Ticket Modal"
        onRequestClose={() => closeModal()}
        style={{ ...require('../../layouts/modal-styles').default, maxWidth: '100vw', color: 'red' }}
        >
          <div className="ticket-action-modal">
            <div className="top-navigation-mobile hide-on-med-and-up">
              <div className="row valign-wrapper" style={{padding: 0, marginBottom: 0}}>
                <div className="nav-control col s1 left-align">
                  <i className="material-icons" style={{cursor: 'pointer' }} onClick={() => closeModal()}>close</i>
                </div>
                <div className="nav-title col s9 ">
                  Transfer Ticket
                </div>
                <div className={classNames('nav-control col s2 right-align', {'disabled': !this.state.email })}
                  onClick={() => this.transferTicket(ticket._id, {email: this.state.email, firstName: this.state.firstName, lastName: this.state.lastName})}>Transfer</div>
                </div>
              </div>
            </div>
            {/* <div className="top-navigation-non-mobile hide-on-small-only">
              Transfer Ticket
            </div> */}
            <div className="modal-content">
              <div className="terrapin-red lighten-1 valign-wrapper" style={{padding: 15, marginBottom: 15}}>
                <i className="material-icons tiny" style={{marginRight: 10}}>warning</i><small>Transfering your ticket will void the current barcode and generate a unique one for the new owner. This process cannot be undone.</small>
              </div>
              <div className="row">
                <div className="input-field col s6">
                  <label htmlFor="firstName">First Name</label>
                  <input id="firstName" type="text" className="validate" value={this.state.firstName} onChange={(e) => {
                    this.setState({firstName: e.target.value});
                  }} />
                </div>
                <div className="input-field col s6">
                  <label htmlFor="lastName">Last Name</label>
                  <input id="lastName" type="text" className="validate" value={this.state.lastName} onChange={(e) => {
                    this.setState({lastName: e.target.value});
                  }} />
                </div>
              </div>
              <div className="input-field col s6">
                <label htmlFor="email">Recipient's Email</label>
                <input id="email" type="text" className="validate" value={this.state.email} onChange={(e) => {
                  this.setState({email: e.target.value});
                }} />
              </div>

            <div className="modal-actions right-align">
              <a className="close modal-action" onClick={() => closeModal()}>Cancel</a>
              <a className={classNames('save modal-action', {'disabled': !this.state.email })}
                onClick={() => this.transferTicket(ticket._id, {email: this.state.email, firstName: this.state.firstName, lastName: this.state.lastName})}>Transfer</a>
            </div>
          </div>
        </ReactModal>
    );
  }
}

export default TicketTransferModal;
