import React, { Component } from 'react'
import ReactModal from 'react-modal';

import '../../../components/shared/ModalStyles.scss';

class TicketNumberInfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const { isOpen, closeModal } = this.props;
    return (
      <ReactModal
        isOpen={isOpen}
        contentLabel="Ticket Number Info Modal"
        onRequestClose={() => closeModal()}
        style={require('../../../layouts/modal-styles').default}
      >
          <div className="ticket-action-modal">
            <div className="top-navigation-mobile hide-on-med-and-up">
              <div className="row valign-wrapper" style={{padding: 0, marginBottom: 0}}>
                {/* <div className="nav-control col s1 left-align">
                  <i className="material-icons" style={{cursor: 'pointer' }} onClick={() => closeModal()}>close</i>
                </div> */}
                <div className="nav-title col s11 ">
                  Finding your ticket number
                </div>
                </div>
                <div></div>
              </div>
            </div>
            <div className="modal-content" style={{display: 'flex', flexDirection: 'column'}}>
              <img style={{width: '100%', marginBottom: '50px'}} src={require('../../../layouts/assets/img/ticket_number_example_domefest.png')} />
              <button className='btn-large terrapin-green' onClick={() => closeModal()}>Got It!</button>
            </div>
      </ReactModal>
    );
  }
}

export default TicketNumberInfoModal;
