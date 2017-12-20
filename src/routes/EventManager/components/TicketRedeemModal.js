import React, { Component } from 'react';
import ReactModal from 'react-modal';
import QrReader from 'react-qr-reader';
import './EventManager.scss';
import modalStyles from '../../../layouts/modal-styles'
import classNames from 'classnames'

class TicketRedeemModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redeemSuccess: undefined,
      redeemMessage: 'Awaiting scan...'
    };
    this.onScan = this.onScan.bind(this);
  }

  async onScan(data) {
    let { redeemSuccess } = this.state;
    if (data && redeemSuccess === undefined) {
      try {
        let response = await this.props.redeemTicket(data);
        this.setState({redeemSuccess: true, redeemMessage: 'Ticket Redeemed'});
      } catch (err) {
        console.log('err: ', err.message);
        this.setState({redeemSuccess: false, redeemMessage: err.message})
      }
    }
  }

  render() {
    const { isOpen, closeModal } = this.props;
    // let overlayColor = (this.state.redeemSuccess) ? '#009933' : (this.state.redeemSuccess === false) ? '#009933' : null
    let videoStyle = {
      height: '450px',
      width: '450px',
      margin: '0 auto'

    };

    return (
      <ReactModal
        isOpen={isOpen}
        contentLabel="Redeem Ticket Modal"
        className={{
          base: 'modal',
          afterOpen: 'modal',
          beforeClose: 'modal'
        }}
        overlayClassName={{
          base: 'modal-overlay',
          afterOpen: 'modal-overlay',
          beforeClose: 'modal-overlay'
        }}
        onRequestClose={() => closeModal()}
        style={require('./../../../layouts/modal-styles').default}
        >
          <div className="ticket-action-container">
            <div className="ticket-action-modal">
              <h3>Redeem Ticket</h3>
              <div className="video-container">
                <div className={classNames('video-overlay',
                  {success: this.state.redeemSuccess,
                    error: this.state.redeemSuccess === false,
                    noStatus: this.state.redeemSuccess === undefined})}></div>
                <QrReader
                  delay={100}
                  style={videoStyle}
                  onError={console.log}
                  onLoad={() => console.log('camera loaded')}
                  onScan={this.onScan}
                />
              </div>
            <span className={classNames({ success: this.state.redeemSuccess, error: this.state.redeemSuccess === false, noStatus: this.state.redeemSuccess === undefined })}>{this.state.redeemMessage}</span>
            {(this.state.redeemSuccess !== undefined) && (<button onClick={() => this.setState({redeemSuccess: undefined, redeemMessage: 'Awaiting scan...'})}>New Ticket</button>)}
            </div>
          </div>
        </ReactModal>
    );
  }
}

export default TicketRedeemModal;
