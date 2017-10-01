import React, { Component } from 'react';
import ReactModal from 'react-modal';
import QrReader from 'react-qr-reader';
import './User.scss';
import modalStyles from '../../../layouts/modal-styles'

class TicketRedeemModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qrData: 'No QR Data'
    };
    this.onScan = this.onScan.bind(this);
  }

  onScan(data) {
    if (data) {
      console.log('cam data: ', data);
      this.setState({qrData: data});
      this.props.redeemTicket(data);
    }
  }

  render() {
    const { ticket, isOpen, closeModal } = this.props;
    return (
      <ReactModal
        isOpen={isOpen}
        contentLabel="Redeem Ticket Modal"
        // onAfterOpen={() => {
        //   const { ticket } = this.props;
        //   this.props.redeemTicket(ticket.id);
        // }}
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
              onError={console.log}
              onLoad={() => console.log('camera loaded')}
              onScan={this.onScan}
            />
          </div>
        </ReactModal>
    );
  }
}

export default TicketRedeemModal;
