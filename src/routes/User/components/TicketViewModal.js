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

  // renderQR() {
  //   let { password } = this.state;
  //   this.props.signMessage(`${ticketAddress}${eventAddress}`, password);
  // }

  render() {
    const { ticket, isOpen, closeModal, qrCode } = this.props;
    return (
      <ReactModal
        isOpen={isOpen}
        contentLabel="View Ticket Modal"
        onRequestClose={() => closeModal()}
        style={require('./../../../layouts/modal-styles').default}
        >
          { (qrCode) ?
            (
              <div className="">
                { qrCode }
              </div>
            ) : (
              <div className="ticket-action-modal">
                <h2>View Ticket:</h2>
                <span className="ticket-address">{(ticket) ? ticket.id : null}</span>
                <input type="text" placeholder="password" onClick={(e) => {
                  this.setState({ password: e.target.value });
                }}/>
              </div>
            )
          }
        </ReactModal>
    );
  }
}

export default ViewTicketModal;
