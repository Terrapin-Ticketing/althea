import React, { Component } from 'react';
import ReactModal from 'react-modal';

import QRCode from 'qrcode';

import './Ticket.scss';
import modalStyles from '../../../layouts/modal-styles';

class ViewTicketModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qrCodeHex: null
    };
  }

  async createQrCode(eventAddress, ticketAddress) {
    
  }

  render() {
    const { ticket, isOpen, closeModal } = this.props;
    return (
      <ReactModal
        isOpen={isOpen}
        contentLabel="View Ticket Modal"
        onAfterOpen={() => {
          const { ticket } = this.props;
          this.createQrCode(ticket.eventId, ticket.id);
        }}
        onRequestClose={() => closeModal()}
        style={require('./../../../layouts/modal-styles').default}
        >
          <div className="ticket-container">
            <h2>View Ticket:</h2>
            <canvas id="qr-canvas" ref={(c) => { this.qrCanvas = c; }} style={{ margin: 'auto' }}/>
            <span className="ticket-address">{(ticket) ? ticket.id : null}</span>

            <div className="ticket-action-modal">
              <span className="ticket-address">{(ticket) ? ticket.id : null}</span>
            </div>
          </div>
        </ReactModal>
    );
  }
}

export default ViewTicketModal;
