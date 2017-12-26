import React, { Component } from 'react'
import ReactModal from 'react-modal';
import Order from './Checkout/Order';

class TicketSellModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticket: this.props.ticket
    };
    this.sellTicket = this.sellTicket.bind(this);
  }

  async componentDidMount() {
    // let order = this.state.order;
    // order.push(this.props.ticket);
    // this.setState({ ticket: this.props.ticket })
  }

  async sellTicket() {
    let { ticket } = this.state;
    this.setState({ isLoading: true });
    await this.props.sellTicket(ticket, this.props.index);
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
        onAfterOpen={() => {
          // const { ticket } = this.props;
          // this.props.sellTicket(ticket.id, this.state.recipient);
        }}
        style={require('../../layouts/modal-styles').default}
        >
          <div className="ticket-action-modal">
            <h3>Sell Ticket:</h3>
            {/* Price: $ */}
            <Order order={[this.state.ticket]} />
            <div className="row valign-wrapper">
              <div className="input-field col s12 m6">
                <i className="material-icons prefix">attach_money</i>
                {/* <label htmlFor="price">Price</label> */}
                <input id="price" type="text"
                  placeholder={ticket.price}
                  className="validate icon_prefix"
                  value={this.state.ticket.price}
                  onChange={(e) => {
                    let ticket = this.state.ticket;
                    ticket.price = e.target.value
                    this.setState({ticket});
                  }}
                />
              </div>
              <div className="col s12 m6">
                <div className="switch">
                  <label>
                    Not For Sale
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
                    For Sale
                  </label>
                </div>
              </div>
            </div>
            {/* <input type="text" onChange={(e) => this.setState({recipient: e.target.value})} placeholder="paste ticket recipient address here" /> */}
            <div className="col s12 center-align">
              <button className="btn waves-effect center-align" onClick={() => this.sellTicket()}>Save Changes</button>
            </div>
            </div>
        </ReactModal>
    )
  }
}

export default TicketSellModal;
