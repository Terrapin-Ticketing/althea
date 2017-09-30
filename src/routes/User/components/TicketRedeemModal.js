import React, { Component } from 'react'
import ReactModal from 'react-modal';
import QrReader from 'react-qr-reader'
import web3 from '../../../components/Web3.js'
import './User.scss'
import modalStyles from '../../../layouts/modal-styles'

class TicketRedeemModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qrData: 'No QR Data'
    };
    this.redeemTicket = this.redeemTicket.bind(this);
    this.renderQrCodeReader = this.renderQrCodeReader.bind(this);
    this.onError = this.onError.bind(this);
    this.onScan = this.onScan.bind(this);
  }

  decodeSignedMessage(message) {
    let parsedMessage = message.split('-');
    console.log('parsedMessage: ', parsedMessage);
    let sigDecoded = web3.util.fromRpcSig(parsedMessage[2]);
    let pubkey = web3.util.ecrecover(messageHashx, sigDecoded.v, sigDecoded.r, sigDecoded.s);
    let walletAddress = ethUtils.publicToAddress(pubkey).toString('hex');
  }

  redeemTicket(ticketAddress, eventAddress, password) {
    this.props.redeemTicket(ticketAddress, recipientAddress, password)
      .then((data) => {
        console.log('ticket redeemed: ', data);
      })
      .catch((err) => {
        console.log('error redeeming ticket: ', err);
      })

  }

  onError(err) {
    console.log('an error occured scanning qr code');
  }

  onScan(data) {
    if (data) {
      console.log('cam data: ', data);
      this.setState({qrData: data});
      this.props.redeemTicket(this.state.password, data)
        .then((data2) => {
          console.log('data2: ', data2);
          this.setState({redeemTicket: data2});
        });
    }
  }

  renderQrCodeReader() {
    <QrReader
      delay={100}
      onError={this.onError}
      onLoad={() => console.log('camera loaded')}
      onScan={this.onScan}
    />;
  }

  render() {
    const { ticket, isOpen, closeModal } = this.props;
    return (
      <ReactModal
        isOpen={isOpen}
        contentLabel="Redeem Ticket Modal"
        onRequestClose={() => closeModal()}
        style={require('./../../../layouts/modal-styles').default}
        >
          <div className="ticket-action-modal">
            <h3>Redeem Ticket:</h3>
            <span className="ticket-address">{(ticket) ? ticket.id : null}</span>
            <QrReader
              delay={100}
              style={{height: '450px', width: '450px', margin: '0 auto'}}
              onError={this.onError}
              onLoad={() => console.log('camera loaded')}
              onScan={this.onScan}
            />
            <span>qrData: {this.state.qrData}</span>
            <input type="text" onChange={(e) => this.setState({password: e.target.value})} placeholder="confirm your password here" />
            <button>Start Camera</button>
          </div>
        </ReactModal>
    )
  }
}

export default TicketRedeemModal;
