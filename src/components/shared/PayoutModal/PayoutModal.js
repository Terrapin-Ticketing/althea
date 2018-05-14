import React, { Component } from 'react'
import ReactModal from 'react-modal';
import { Link } from 'react-router';

import '../ModalStyles.scss';

class payoutModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { payout, isOpen, closePayoutModal } = this.props;
    if (payout) {
      return (
        <ReactModal
          isOpen={isOpen}
          contentLabel="View Ticket Modal"
          onRequestClose={() => closePayoutModal()}
          style={{ ...require('../../../layouts/modal-styles').default, maxWidth: '100vw', color: 'red' }}
          >
            <div className="ticket-action-modal" style={{zindex: 10000}}>
              <div className="top-navigation-mobile hide-on-med-and-up">
                <div className="row valign-wrapper" style={{padding: 0, marginBottom: 0}}>
                  <div className="nav-control col s1 left-align">
                    <i className="material-icons" style={{cursor: 'pointer' }} onClick={() => closePayoutModal()}>close</i>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-content">
              <div className="nav-title col s9">
                <h4>Buyer Info</h4>
                <table className='responsive-table' style={{marginBottom: 25}}>
                  <thead>
                    <th>ID</th>
                    <th>Email</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{payout.buyerId._id}</td>
                      <td>{payout.buyerId.email}</td>
                    </tr>
                  </tbody>
                </table>
                <h4>Seller Info</h4>
                <table className='responsive-table' style={{marginBottom: 25}}>
                  <thead>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Payout Method</th>
                    <th>Payout Value</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{payout.sellerId._id}</td>
                      <td>{payout.sellerId.email}</td>
                      <td>{payout.sellerId.payout.default}</td>
                      <td>{payout.sellerId.payout[payout.sellerId.payout.default]}</td>
                    </tr>
                  </tbody>
                </table>
                <h4>Ticket Info</h4>
                <table className='responsive-table' style={{marginBottom: 25}}>
                  <thead>
                    <th>ID</th>
                    <th>Owner ID</th>
                    <th>Type</th>
                    <th>Barcode</th>
                    <th>View</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{payout.ticketId._id}</td>
                      <td>{payout.ticketId.ownerId}</td>
                      <td>{payout.ticketId.type}</td>
                      <td>{payout.ticketId.barcode}</td>
                      <td><Link to={`event/${payout.ticketId.eventId}/ticket/${payout.ticketId._id}`}>View</Link></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* {JSON.stringify(payout)} */}
            </div>
          </ReactModal>
        )
    } else {
      return null
    }
  }
}

export default payoutModal;
