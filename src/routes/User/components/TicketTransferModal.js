import React, { Component } from 'react'
import ReactModal from 'react-modal';
import web3 from '../../../components/Web3.js'
import './User.scss'
import modalStyles from '../../../layouts/modal-styles'


class TicketTransferModal extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.transferTicket = this.transferTicket.bind(this);
  }

  transferTicket(ticketAddress, recipientAddress, password) {
    console.log(ticketAddress, recipientAddress, password);
    this.props.transferTicket(ticketAddress, recipientAddress, password)
      .then((data) => {
        console.log('ticket transfered: ', data);
      })
      .catch((err) => {
        console.log('error transfering ticket: ', err);
      })

  }

  render() {
    const { ticket, isOpen, closeModal } = this.props;
    console.log('this.props: ', this.props);
    return (
      <ReactModal
        isOpen={isOpen}
        contentLabel="View Ticket Modal"
        onRequestClose={() => closeModal()}
        style={require('./../../../layouts/modal-styles').default}
        >
          <div className="ticket-action-modal">
            <h3>Transfer Ticket:</h3>
            <span className="ticket-address">{(ticket) ? ticket.id : null}</span>
            <input type="text" onChange={(e) => this.setState({recipient: e.target.value})} placeholder="paste ticket recipient address here" />
            <input type="text" onChange={(e) => this.setState({password: e.target.value})} placeholder="confirm your password here" />
            <button onClick={() => this.transferTicket(ticket.address, this.state.recipient, this.state.password )}>Transfer Ticket</button>
          </div>
        </ReactModal>
    )
  }
}

export default TicketTransferModal;
