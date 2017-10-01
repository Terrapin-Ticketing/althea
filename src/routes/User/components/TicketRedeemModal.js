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
    this.renderQrCodeReader = this.renderQrCodeReader.bind(this);
    this.onError = this.onError.bind(this);
    this.onScan = this.onScan.bind(this);
  }

  onError(err) {
    console.log('an error occured scanning qr code');
  }

  onScan(data) {
    if (data) {
      console.log('cam data: ', data);
      this.setState({qrData: data});
      this.props.redeemTicket(data);
    }
  }

  renderQrCodeReader() {
    <QrReader
      delay={100}
      onError={this.onError}
      onLoad={() => console.log('camera loaded')}
      onScan={this.onScan}
    />
  }

  render() {
    const { ticket, isOpen, closeModal } = this.props;
    return (
      <ReactModal
        isOpen={isOpen}
        contentLabel="Redeem Ticket Modal"
        onAfterOpen={() => {
          const { ticket } = this.props;
          this.props.redeemTicket(ticket.id, recipientAddress);
        }}
        onRequestClose={() => closeModal()}
        style={require('./../../../layouts/modal-styles').default}
        >
          <div className="ticket-action-container">
            <div className="ticket-action-modal">
              <h3>Redeem Ticket:</h3>
              <span className="ticket-address">{(ticket) ? ticket.id : null}</span>
              <span>qrData: {this.state.qrData}</span>
            </div>
            <QrReader
              delay={100}
              style={{height: '450px', width: '450px', margin: '0 auto'}}
              onError={this.onError}
              onLoad={() => console.log('camera loaded')}
              onScan={this.onScan}
            />
          </div>
        </ReactModal>
    );
  }
}

export default TicketRedeemModal;
