import React, { Component } from 'react'
import ReactModal from 'react-modal';
import TransferTicketForm from '../../forms/TransferTicketForm';

import '../ModalStyles.scss';

class TransferTicketModal extends Component {
  constructor(props) {
    super(props);
    this.afterTransfer = this.afterTransfer.bind(this);
  }

  afterTransfer() {
    this.props.closeTransferTicketModal();
  }

  render() {
    const { ticket, isOpen, closeTransferTicketModal } = this.props;
    return (
      <ReactModal
        isOpen={isOpen}
        contentLabel="View Ticket Modal"
        onRequestClose={() => closeTransferTicketModal()}
        style={{ ...require('../../../layouts/modal-styles').default, maxWidth: '100vw', color: 'red' }}
        >
          <div className="ticket-action-modal">
            <div className="top-navigation-mobile hide-on-med-and-up">
              <div className="row valign-wrapper" style={{padding: 0, marginBottom: 0}}>
                <div className="nav-control col s1 left-align">
                  <i className="material-icons" style={{cursor: 'pointer' }} onClick={() => closeTransferTicketModal()}>close</i>
                </div>
                <div className="nav-title col s9 ">
                  Transfer Ticket
                </div>
              </div>
            </div>
          </div>
          <div className="modal-content">
            <TransferTicketForm ticket={ticket} afterTransfer={this.afterTransfer} cancelTransfer={closeTransferTicketModal}/>
          </div>
        </ReactModal>
    );
  }
}

export default TransferTicketModal;
