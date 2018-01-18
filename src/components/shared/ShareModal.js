import React, { Component } from 'react'
import ReactModal from 'react-modal';
import classNames from 'classnames';

import './ModalStyles.scss';

class ShareModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    };
  }

  copyTicketLink() {
    this.ticketUrl.select();
    document.execCommand('copy');
    this.setState({copied: true});
  }

  render() {
    const { ticket, isOpen, closeModal } = this.props;
    return (
      <ReactModal
        isOpen={isOpen}
        contentLabel="View Ticket Modal"
        onRequestClose={() => closeModal()}
        style={{ ...require('../../layouts/modal-styles').default, maxWidth: '100vw', color: 'red' }}
        >
          <div className="ticket-action-modal">
            <div className="top-navigation-mobile hide-on-med-and-up">
              <div className="row valign-wrapper" style={{padding: 0, marginBottom: 0}}>
                <div className="nav-control col s1 left-align">
                  <i className="material-icons" style={{cursor: 'pointer' }} onClick={() => closeModal()}>close</i>
                </div>
                <div className="nav-title col s9 ">
                  Share Ticket
                </div>
                <div className='nav-control col s2 right-align'
                  onClick={() => this.copyTicketLink(ticket._id)}>Copy Link</div>
                </div>
              </div>
            </div>
            <div className="top-navigation-non-mobile hide-on-small-only">
              Share Ticket
            </div>
            <div className="modal-content">
              <h3 style={{marginBottom: 0}}>Ticket Url</h3>
            <div className="input-field col s6" style={{marginTop: 0}}>
              <input ref={(input) => { this.ticketUrl = input; }} id="ticketUrl" type="text" className="validate" value={`${ALTHEA_URL}/event/${ticket.eventId._id}/ticket/${ticket._id}`} />
            </div>

            <div className="modal-actions right-align hide-on-small-only">
              <a className="close modal-action" onClick={() => closeModal()}>Close</a>
              <a className={classNames('copy modal-action', {'disabled': this.state.copied })}
                onClick={() => this.copyTicketLink(ticket._id)}>{(this.state.copied) ? 'Copied' : 'Copy Link'}</a>
            </div>
          </div>
        </ReactModal>
    );
  }
}

export default ShareModal;
