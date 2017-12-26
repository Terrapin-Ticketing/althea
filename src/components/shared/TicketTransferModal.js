import React, { Component } from 'react'
import ReactModal from 'react-modal';

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
            <h3>Transfer Ticket:</h3>
            <div className="input-field col s6">
              <label htmlFor="email">Recipient's Email</label>
              <input id="email" type="text" className="validate" value={this.state.email} onChange={(e) => {
                this.setState({email: e.target.value});
              }} />
            </div>
            <button className="btn waves-effect" onClick={() => this.transferTicket(ticket._id, this.state.email)}>Transfer Ticket</button>
          </div>
        </ReactModal>
    )
  }
}

export default TicketTransferModal;
