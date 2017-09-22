import React, { Component } from 'react';
import ReactModal from 'react-modal';
import './User.scss';
import modalStyles from '../../../layouts/modal-styles';

class ViewTicketModal extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  createQrCode(eventAddress, ticketAddress, password) {
    this.props.createQrCode(eventAddress, ticketAddress, password);
  }

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
                <input type="text" placeholder="password" onChange={(e) => {
                  this.setState({ password: e.target.value });
                }}/>
                <button onClick={() => {
                  this.createQrCode(ticket.eventId, ticket.id, this.state.password);
                }}>View Ticket</button>
              </div>
            )
          }
        </ReactModal>
    );
  }
}

export default ViewTicketModal;
