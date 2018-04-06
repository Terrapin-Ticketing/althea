import React, { Component } from 'react'
import ReactModal from 'react-modal';

import SellTicketForm from '../../forms/SellTicketForm';

import '../ModalStyles.scss';

class SellTicketModal extends Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.closeSellTicketModal = this.closeSellTicketModal.bind(this);
  }

  closeSellTicketModal() {
    this.props.closeSellTicketModal();
  }

  render() {
    const { ticket, isOpen, closeSellTicketModal } = this.props;
    return (
      <ReactModal
        isOpen={isOpen}
        contentLabel="Sell Ticket Modal"
        onRequestClose={() => closeSellTicketModal()}
        style={require('../../../layouts/modal-styles.js').default}
      >
        <div className="ticket-action-modal">
          <div className="top-navigation-mobile hide-on-med-and-up">
            <div className="row valign-wrapper" style={{padding: 0, marginBottom: 0}}>
              <div className="nav-control col s1 left-align">
                <i className="material-icons" style={{cursor: 'pointer' }} onClick={() => this.closeSellTicketModal()}>close</i>
              </div>
              <div className="nav-title col s9 ">
                Sell Ticket
              </div>
            </div>
          </div>
          <div className="modal-content">
            <SellTicketForm ticket={ticket} afterSell={this.closeSellTicketModal} cancelSell={this.closeSellTicketModal} />
          </div>
        </div>
    </ReactModal>
    );
  }
}

export default SellTicketModal;
