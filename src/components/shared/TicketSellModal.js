import React, { Component } from 'react'
import ReactModal from 'react-modal';
import classNames from 'classnames';
import FacebookProvider, { Share } from 'react-facebook';

import Order from './Checkout/Order';
import './ModalStyles.scss';


const getDigitsFromValue = (value = '') => value.replace(/(-(?!\d))|[^0-9|-]/g, '') || '';

const padDigits = digits => {
  const desiredLength = 3;
  const actualLength = digits.length;

  if (actualLength >= desiredLength) {
    return digits;
  }

  const amountToAdd = desiredLength - actualLength;
  const padding = '0'.repeat(amountToAdd);

  return padding + digits;
};

const removeLeadingZeros = number => number.replace(/^0+([0-9]+)/, '$1');

const addDecimalToNumber = number => {
  const centsStartingPosition = number.length - 2;
  const dollars = removeLeadingZeros(
    number.substring(0, centsStartingPosition)
  );
  const cents = number.substring(centsStartingPosition);
  return `$${dollars}.${cents}`;
};

export const toCurrency = value => {
  const digits = getDigitsFromValue(value.toString());
  const digitsWithPadding = padDigits(digits);
  return addDecimalToNumber(digitsWithPadding);
};

class TicketSellModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoaded: false
    };
    this.sellTicket = this.sellTicket.bind(this);
  }

  async componentDidMount() {
    window.setTimeout(() => { Materialize.updateTextFields() }, 500);
    let { ticket, user } = this.props;

    this.setState({
      step: 1,
      price: ticket.price,
      isForSale: ticket.isForSale,
      hasLoaded: true,
      payoutMethod: user.payout.default || 'paypal',
      venmo: user.payout.venmo,
      paypal: user.payout.paypal
    });
  }

  async sellTicket() {
    let { ticket } = this.props;
    let { price, isForSale } = this.state;
    this.setState({ isLoading: true });
    ticket.price = price;
    ticket.isForSale = isForSale;
    await this.props.sellTicket(ticket, this.state.payoutMethod, this.state[this.state.payoutMethod]);
    if (isForSale) {
      this.setState({ isLoading: false, step: 2 })
    } else {
      this.setState({ isLoading: false});
      this.closeModal()
    }
  }

  closeModal() {
    let { closeModal } = this.props;
    this.setState({ step: 1 });
    closeModal();
  }

  copyTicketLink() {
    this.ticketUrl.select();
    document.execCommand('copy');
    this.setState({copied: true});
    this.ticketUrl.blur();
  }

  renderComponent() {
    let { ticket } = this.props;
    switch (this.state.step) {
      case 1:
        return (
              <div>
                <h3 style={{marginBottom: 10}}>Your Payment Information</h3>
                <div className='row z-depth-1'>
                  <button
                    className={classNames('col s6 btn-flat btn-large',
                    {'active': (this.state.payoutMethod === 'paypal')},
                    {'inactive': (this.state.payoutMethod === 'venmo')}
                  )}
                  onClick={() => this.setState({ payoutMethod: 'paypal' })}>
                  PayPal
                </button>
                <button
                  className={classNames('col s6 btn-flat btn-large',
                  {'active': (this.state.payoutMethod === 'venmo')},
                  {'inactive': (this.state.payoutMethod === 'paypal')}
                )}
                onClick={() => this.setState({ payoutMethod: 'venmo' })}>
                Venmo
              </button>
              <div className="input-field col s12">
                <input id="price" type="text"
                  placeholder={
                    (this.state.payoutMethod === 'paypal') ? 'Enter Your PayPal Email Address'
                    : 'Enter Your Venmo Username'
                  }
                  value={(this.state.payoutMethod === 'paypal') ? this.state.paypal : this.state.venmo}
                  onChange={(e) => {
                    let payoutMethod = this.state.payoutMethod;
                    let payoutValue = e.target.value;
                    this.setState({[payoutMethod]: payoutValue});
                  }}
                />
                <small className="info-text" style={{padding: 0}}>Money will be sent to this account when your ticket is sold.</small>
              </div>
            </div>
            <div className="row z-depth-1">
              <div className="input-field col s12">
                <h3 style={{margin: 0}}>Price</h3>
                {/* <label htmlFor="price">Price</label> */}
                  <input id="price" type="text"
                    // placeholder="Price"
                    value={toCurrency(this.state.price)}
                    onChange={(e) => {
                      let price = getDigitsFromValue(e.target.value);
                      this.setState({ price });
                    }}
                  />
              </div>
            </div>
            <div className="row z-depth-1">
              <ul className="col s12">
                <li><div><h3 style={{display: 'inline'}}>For Sale</h3>
                  <div className="switch secondary-content">
                    <label>
                      <input
                        type="checkbox"
                        checked={this.state.isForSale}
                        onChange={() => {
                          let { isForSale } = this.state;
                          this.setState({ isForSale: !isForSale });
                        }}
                      />
                      <span className="lever"></span>
                    </label>
                  </div>
                </div>
                </li>
              </ul>
            </div>
            <div className="modal-actions right-align hide-on-small-only">
              <a className="close modal-action" style={{cursor: 'pointer'}} onClick={() => closeModal()}>Cancel</a>
              <a className={classNames('save modal-action', {'disabled': (!(!!this.state.venmo || !!this.state.paypal) || (!this.state.price === '') && this.state.isForSale)} )}
                onClick={() => this.sellTicket()}>Save</a>
            </div>
          </div>
      );
      case 2:
        return (
          <div className="success">
            <h1 style={{color: '#009933', marginBottom: 0, marginTop: 0}}>Success!</h1>
            <i className="material-icons large" style={{color: '#009933'}}>check</i>
            <div className="info-text">
              <small>Your ticket is now for sale on Terrapin. <br />Share your link around so other people can buy it.</small>
            </div>
              <h3 style={{margin: 0, marginTop: 10}}>Ticket Url</h3>
                <div className="col s12 valign-wrapper" style={{width: '100%'}}>
                  <div className="input-field" style={{marginTop: 0, width: '100%'}}>
                    <input ref={(input) => { this.ticketUrl = input; }}
                      id="ticketUrl" type="text" className="validate inline"
                      style={{marginBottom: 0}}
                      value={`${ALTHEA_URL}/event/${ticket.eventId._id}/ticket/${ticket._id}`} />
                    </div>
                    {/* <a className={classNames('action-button copy', {'disabled': this.state.copied })}
                      onClick={() => this.copyTicketLink(ticket._id)}>{(this.state.copied) ? 'Copied' : 'Copy Link'}</a> */}
              </div>
            <FacebookProvider appId="644007869280535">
              <Share href={`${ALTHEA_URL}/event/${ticket.eventId._id}/ticket/${ticket._id}`}>
              <div style={{cursor: 'pointer'}} className="valign-wrapper">
                <img width={20} className="action-button" src={require('../../layouts/assets/img/facebook-logo.svg')} />
                <span style={{marginLeft: 10}}>Share on Facebook</span>
              </div>
            </Share>
          </FacebookProvider>
          </div>
        )
    }
  }

  render() {
    const { ticket, isOpen } = this.props;
    if (!ticket || !this.state.hasLoaded) return null;
    return (
      <ReactModal
        isOpen={isOpen}
        contentLabel="Sell Ticket Modal"
        onRequestClose={() => this.closeModal()}
        style={require('../../layouts/modal-styles').default}
      >
        <div className="ticket-action-modal">
          <div className="top-navigation-mobile hide-on-med-and-up">
            <div className="row valign-wrapper" style={{padding: 0, marginBottom: 0}}>
              <div className="nav-control col s1 left-align">
                <i className="material-icons" style={{cursor: 'pointer' }} onClick={() => this.closeModal()}>close</i>
              </div>
              <div className="nav-title col s9 ">
                Sell Ticket
              </div>
              <div
                style={{cursor: 'pointer'}}
                className={classNames('nav-control col s2 right-align', {'disabled': (!(!!this.state.venmo || !!this.state.paypal) || (!this.state.price === '') && this.state.isForSale)} )}
                onClick={() => this.sellTicket()}>{(this.state.step === 1) ? 'Save' : null }</div>
              </div>
            </div>
          <div className="modal-content">
            {this.renderComponent()}
          </div>
        </div>
    </ReactModal>
  );
  }
}

export default TicketSellModal;
