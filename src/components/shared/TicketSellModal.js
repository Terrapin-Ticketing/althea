import React, { Component } from 'react'
import ReactModal from 'react-modal';
import Order from './Checkout/Order';
import classNames from 'classnames';

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
    this.setState({ isLoading: false });
    this.props.closeModal();
  }

  render() {
    const { ticket, isOpen, closeModal } = this.props;
    if (!ticket || !this.state.hasLoaded) return null;
    return (
      <ReactModal
        isOpen={isOpen}
        contentLabel="Sell Ticket Modal"
        onRequestClose={() => closeModal()}
        style={require('../../layouts/modal-styles').default}
      >
          <div className="ticket-action-modal">
            <div className="top-navigation-mobile hide-on-med-and-up">
              <div className="row valign-wrapper" style={{padding: 0, marginBottom: 0}}>
                <div className="nav-control col s1 left-align">
                  <i className="material-icons" style={{cursor: 'pointer' }} onClick={() => closeModal()}>close</i>
                </div>
                <div className="nav-title col s9 ">
                  Sell Ticket
                </div>
                <div className={classNames('nav-control col s2 right-align', {'disabled': (!(!!this.state.venmo || !!this.state.paypal) || (!this.state.price === '') && this.state.isForSale)} )}
                  onClick={() => this.sellTicket()}>Save</div>
                </div>
              </div>
            </div>
            {/* <div className="top-navigation-non-mobile hide-on-small-only">
              Sell Ticket
            </div> */}
            <div className="modal-content">
              <div>
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
                    (this.state.payoutMethod === 'paypal') ? 'Enter PayPal Email Address'
                    : 'Enter Venmo Username'
                  }
                  value={(this.state.payoutMethod === 'paypal') ? this.state.paypal : this.state.venmo}
                  onChange={(e) => {
                    let payoutMethod = this.state.payoutMethod;
                    let payoutValue = e.target.value;
                    this.setState({[payoutMethod]: payoutValue});
                  }}
                />
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
                <li><div>For Sale
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
        </div>
    </ReactModal>
  );
  }
}

export default TicketSellModal;
