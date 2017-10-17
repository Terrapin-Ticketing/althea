import React, { Component } from 'react';
import ReactModal from 'react-modal';
import ethUtils from 'ethereumjs-util';
import web3 from '../../../components/Web3.js';
import QRCode from 'qrcode';

import './User.scss';
import modalStyles from '../../../layouts/modal-styles';

class ViewTicketModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qrCodeHex: null
    };
  }

  async createQrCode(eventAddress, ticketAddress) {
    let { privateKey } = this.props.user;

    let message = JSON.stringify({
      eventAddress, ticketAddress
    });

    // ecsign requires a sha3 string
    let messageHash = web3.utils.sha3(message);
    let messageHashx = Buffer.from(messageHash.substring(2), 'hex');
    let signedMessage = ethUtils.ecsign(messageHashx, privateKey);
    let signedHash = ethUtils.toRpcSig(signedMessage.v, signedMessage.r, signedMessage.s).toString('hex');

    let qrCodeHex = `${message}-0x${messageHashx.toString('hex')}-${signedHash}`;

    await new Promise((resolve, reject) => {
      let canvCtx = this.qrCanvas;
      QRCode.toCanvas(canvCtx, qrCodeHex, (error) => {
        if (error) return reject(error);
        resolve();
      });
    });

    return qrCodeHex;
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

            <div className="ticket-action-modal">
              <span className="ticket-address">{(ticket) ? ticket.id : null}</span>
            </div>
          </div>
        </ReactModal>
    );
  }
}

export default ViewTicketModal;
