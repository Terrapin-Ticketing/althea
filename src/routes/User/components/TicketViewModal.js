import React, { Component } from 'react';
import ReactModal from 'react-modal';
import ethUtils from 'ethereumjs-util';
import crypto from 'crypto';
import web3 from '../../../components/Web3.js';
import QRCode from 'qrcode';

import './User.scss';
import modalStyles from '../../../layouts/modal-styles';

let decryptPrivateKey = (key, ciphered) => {
  let algorithm = 'aes256';
  let inputEncoding = 'utf8';
  let outputEncoding = 'hex';

  let decipher = crypto.createDecipher(algorithm, key);
  let deciphered = decipher.update(ciphered, outputEncoding, inputEncoding);
  deciphered += decipher.final(inputEncoding);
  return deciphered;
};

class ViewTicketModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qrCodeHex: null
    };
  }

  async createQrCode(eventAddress, ticketAddress, password) {
    let { encryptedPrivateKey } = this.props.user;
    let privateKey = decryptPrivateKey(password, encryptedPrivateKey).substring(2);
    let privateKeyx = Buffer.from(privateKey, 'hex');

    let message = `${eventAddress}${ticketAddress}`; // message to sign

    // ecsign requires a sha3 string
    let messageHash = web3.utils.sha3(message);
    let messageHashx = Buffer.from(messageHash.substring(2), 'hex');
    let signedMessage = ethUtils.ecsign(messageHashx, privateKeyx);
    let signedHash = ethUtils.toRpcSig(signedMessage.v, signedMessage.r, signedMessage.s).toString('hex');

    let qrCodeHex = `${message}-0x${messageHashx.toString('hex')}-${signedHash}`;

    await new Promise((resolve, reject) => {
      let canvCtx = this.qrCanvas;
      QRCode.toCanvas(canvCtx, qrCodeHex, function(error) {
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
        onRequestClose={() => closeModal()}
        style={require('./../../../layouts/modal-styles').default}
        >
          <canvas id="qr-canvas" ref={(c) => { this.qrCanvas = c; }} style={{ margin: 'auto' }}/>

          <div className="ticket-action-modal">
            <h2>View Ticket:</h2>
            <span className="ticket-address">{(ticket) ? ticket.id : null}</span>
            <input type="text" placeholder="password" onChange={(e) => {
              this.setState({ password: e.target.value });
            }}/>
            <button onClick={() => {
              this.createQrCode(ticket.eventId, ticket.id, this.state.password);
            }}>View Ticket</button>
          </div>
        </ReactModal>
    );
  }
}

export default ViewTicketModal;
