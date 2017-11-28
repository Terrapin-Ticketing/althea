import React, { Component } from 'react'
import ReactModal from 'react-modal';
import web3 from '../../../components/Web3.js'
import './Ticket.scss'
import modalStyles from '../../../layouts/modal-styles'

class TicketTransferModal extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.transferTicket = this.transferTicket.bind(this);
  }

  transferTicket(ticketId, recipient) {
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
        onAfterOpen={() => {
          // const { ticket } = this.props;
          // this.props.transferTicket(ticket.id, this.state.recipient);
        }}
        style={require('./../../../layouts/modal-styles').default}
        >
          <div className="ticket-action-modal">
            <h3>Transfer Ticket:</h3>
            <span className="ticket-address">{(ticket) ? ticket.id : null}</span>
            <input type="text" onChange={(e) => this.setState({recipient: e.target.value})} placeholder="paste ticket recipient address here" />
            <button onClick={() => this.transferTicket(ticket.id, this.state.recipient)}>Transfer Ticket</button>
          </div>
        </ReactModal>
    )
  }
}

export default TicketTransferModal;
