import React, { Component } from 'react'
import ReactModal from 'react-modal';

import './ModalStyles.scss';

class TicketTransferModal extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.transferTicket = this.transferTicket.bind(this);
  }

  transferTicket(ticketId, recipient) {
    console.log('TicketTransferModal ticketId: ', ticketId, 'recipient: ', recipient);
    this.props.transferTicket(ticketId, recipient);
    this.props.closeModal();
  }

  render() {
    const { ticket, isOpen, closeModal } = this.props;
    return (
      <ReactModal
        isOpen={isOpen}
        contentLabel="View Ticket Modal"
        onRequestClose={() => closeModal()}
        style={require('../../layouts/modal-styles').default}
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
                <div className="nav-control col s2 right-align">
                  <div style={{cursor: 'pointer' }} onClick={() => this.transferTicket(ticket._id, this.state.email)}>Transfer</div>
                </div>
              </div>
            </div>
            <div className="top-navigation-non-mobile hide-on-small-only">
              Transfer Ticket
            </div>
            <div className="modal-content">
            <div className="input-field col s6">
              <label htmlFor="email">Recipient's Email</label>
              <input id="email" type="text" className="validate" value={this.state.email} onChange={(e) => {
                this.setState({email: e.target.value});
              }} />
            </div>
            <div className="modal-actions right-align hide-on-small-only">
              <a className="close modal-action" style={{cursor: 'pointer'}} onClick={() => closeModal()}>Cancel</a>
              <a className="save modal-action" style={{cursor: 'pointer'}} onClick={() => this.transferTicket(ticket._id, this.state.email)}>Transfer</a>
            </div>
          </div>
          </div>
        </ReactModal>
    )
  }
}

export default TicketTransferModal;
