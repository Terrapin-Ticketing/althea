import React, { Component } from 'react'
import ReactModal from 'react-modal';
import web3 from '../../../components/Web3.js'
import './User.scss'
import modalStyles from '../../../layouts/modal-styles'


class ViewTicketModal extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { ticket, isOpen, closeModal } = this.props;
    return (
      <ReactModal
        isOpen={isOpen}
        contentLabel="View Ticket Modal"
        onRequestClose={() => closeModal()}
        style={require('./../../../layouts/modal-styles').default}
        >
          <div className="ticket-action-modal">
            <h2>View Ticket:</h2>
            <span class="ticket-address">{(ticket) ? ticket.id : null}</span>
          </div>
        </ReactModal>
    )
  }
}

export default ViewTicketModal;
