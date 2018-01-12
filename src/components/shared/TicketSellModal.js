import React, { Component } from 'react'
import ReactModal from 'react-modal';
import Order from './Checkout/Order';
import classNames from 'classnames';

import './ModalStyles.scss';

class TicketSellModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticket: props.ticket,
      payoutMethod: props.user.payout.default || 'paypal',
      venmo: props.user.payout.venmo || null,
      paypal: props.user.payout.paypal || null
    };
    this.sellTicket = this.sellTicket.bind(this);
  }

  async componentDidMount() {
    window.setTimeout(() => { Materialize.updateTextFields() }, 500);
    // let order = this.state.order;
    // order.push(this.props.ticket);
    // this.setState({ ticket: this.props.ticket })
  }

  async sellTicket() {
    let { ticket } = this.state;
    this.setState({ isLoading: true });
    await this.props.sellTicket(ticket, this.state.payoutMethod, this.state.payoutValue, this.props.index);
    this.setState({ isLoading: false })
    this.props.closeModal();
  }

  render() {
    const { ticket, isOpen, closeModal } = this.props;
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
                <div className={classNames('nav-control col s2 right-align', {'disabled': (!(!!this.state.venmo || !!this.state.paypal) || (!this.state.ticket.price === '') && this.state.ticket.isForSale)} )}
                  onClick={() => this.sellTicket()}>Save</div>
                </div>
              </div>
            </div>
            <div className="top-navigation-non-mobile hide-on-small-only">
              Sell Ticket
            </div>
            <div className="modal-content">
              <div>
                <div className='row'>
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
            <p>&nbsp;</p>
            <div className="row">
              <div className="input-field col s12">
                <label htmlFor="price">Price</label>
                  <input id="price" type="text"
                    // placeholder="Price"
                    value={this.state.ticket.price}
                    onChange={(e) => {
                      let ticket = this.state.ticket;
                      ticket.price = e.target.value;
                      this.setState({ticket});
                    }}
                  />
              </div>
            </div>
            <div className="row">
              <ul className="col s12">
                <li><div>For Sale
                  <div className="switch secondary-content">
                    <label>
                      <input
                        type="checkbox"
                        checked={this.state.ticket.isForSale}
                        onChange={() => {
                          let ticket = this.state.ticket;
                          ticket.isForSale = !ticket.isForSale;
                          this.setState({ ticket });
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
              <a className={classNames('save modal-action', {'disabled': (!(!!this.state.venmo || !!this.state.paypal) || (!this.state.ticket.price === '') && this.state.ticket.isForSale)} )}
                onClick={() => this.sellTicket()}>Save</a>
            </div>
          </div>
        </div>
    </ReactModal>
    )
  }
}

export default TicketSellModal;
