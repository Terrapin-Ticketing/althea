import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link, browserHistory } from 'react-router';
import ReactModal from 'react-modal';
import TicketViewModal from './TicketViewModal';
import TicketTransferModal from './TicketTransferModal';
import web3 from '../../../components/Web3.js';
import './User.scss';
import Price from '../../../components/shared/Price';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      qty: null, // TODO: Force to int
      price: null, // TODO: Force to int
      tickets: [],
      events: [],
      balance: null,
      selectedTicket: null,
      transferTicketModalOpen: false,
      viewTicketModalOpen: false,
      redeemTicketModalOpen: false,
      selectedEvent: null
    };
    this.openTicketViewModal = this.openTicketViewModal.bind(this);
    this.openTicketTransferModal = this.openTicketTransferModal.bind(this);
  }

  async loadData() {
    await this.props.getUserEvents();
    await this.props.getUserTickets();
    await this.props.getUserBalance();
    this.setState({ dataLoaded: true });
  }

  componentDidMount() {
    if (!this.state.dataLoaded && this.props.user && this.props.user.walletAddress) {
      this.loadData();
    }
  }

  // componentWillReceiveProps() {
  //  // need this for live updating of people buying tickets
  //   if (!this.state.dataLoaded && this.props.user && this.props.user.walletAddress) {
  //     this.loadData();
  //   }
  // }

  async sellTicket(ticket) {
    await this.props.sellTicket(ticket);
  }

  componentWillUnmount() {
    this.setState({ dataLoaded: false });
  }

  openTicketViewModal(ticket) {
    this.setState({viewTicketModalOpen: true, selectedTicket: ticket});
  }

  openTicketTransferModal(ticket) {
    this.setState({transferTicketModalOpen: true, selectedTicket: ticket});
  }

  ticketClick(ticket) {
    return (e) => {
      if (e.target.name === 'action-button') return;
      browserHistory.push(`event/${ticket.eventId}/ticket/${ticket.id}`);
    };
  }

  renderTickets() {
    if (this.props.tickets) {
      return (
        this.props.tickets.map((ticket, index) => {
          return (
              <tr className={`ticket-row ${(index%2 === 0) ? 'odd' : null}`} key={ticket.id} onClick={this.ticketClick(ticket).bind(this)}>
                  <td>{ticket.name}</td>
                  <td><Price price={ticket.price} /></td>
                  <td>{JSON.stringify(ticket.isRedeemed)}</td>
                  <td className="actions">
                    <button name="action-button" onClick={() => this.sellTicket(ticket)}>Sell</button>
                    <button name="action-button" onClick={() => this.openTicketViewModal(ticket)}>View</button>
                    <button name="action-button" onClick={() => this.openTicketTransferModal(ticket)}>Transfer</button>
                  </td>
              </tr>
          );
        })
      );
    } else {
      null;
    }
  }

  renderEvents() {
    if (this.props.events) {
      return (
        this.props.events.map((event, index) => {
          return (
              <tr className={`event-row ${(index%2 === 0) ? 'odd' : null}`} key={event.id}>
                <td>{event.name}</td>
                <td className="qty"><Price price={event.price}/></td>
                <td>{event.qty}</td>
                <td className="actions">
                  <button><Link to={`/event/${event.id}/manage`}>Manage Event</Link></button></td>
              </tr>
          );
        })
      );
    } else {
      return null;
    }
  }

  render() {
    if (!this.props.user) return null;
    const { email, walletAddress, encryptedPrivateKey } = this.props.user;
    const { balance } = this.props;
    return (
      <div className='user-container'>
        <h1>{email}</h1>
        <div className="profile-info">
          <div className="profile-left">
            <span className='profile-item'>Private Key: {`${encryptedPrivateKey.slice(0, 10)}...`}</span>
            <span className='profile-item'>Balance: {(balance) ? `${web3.utils.fromWei(balance, 'ether')} ETH` : null}</span>
          </div>
          <div className="profile-right">
            <button onClick={() => { this.setState({'depositModalOpen': true }); }}>Deposit Ether</button>
            <button onClick={() => { this.setState({'withdrawModalOpen': true }); }}>Withdraw Ether</button>
          </div>
        </div>

        <Tabs>
          <TabList>
            <Tab>Events</Tab>
            <Tab>Tickets</Tab>
          </TabList>

          <TabPanel>
            <h2>Events</h2>
              <table className="events-table">
                <th>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Qty</td>
                  <td>Actions</td>
                </th>
                <tbody>
                  {this.renderEvents()}
                </tbody>
              </table>
          </TabPanel>
          <TabPanel>
            <h2>Tickets</h2>
            <table className="tickets-table">
              <th>
                <td>Name</td>
                <td className="qty">Price</td>
                <td>isRedeemed</td>
                <td>Actions</td>
              </th>
              <tbody>
                {this.renderTickets()}
              </tbody>
            </table>
          </TabPanel>
        </Tabs>

        <TicketViewModal
          ticket={this.state.selectedTicket}
          closeModal={() => this.setState({viewTicketModalOpen: false, selectedTicket: null })}
          isOpen={this.state.viewTicketModalOpen}
          user={this.props.user}
          />

        <TicketTransferModal
          ticket={this.state.selectedTicket}
          closeModal={() => this.setState({transferTicketModalOpen: false, selectedTicket: null })}
          isOpen={this.state.transferTicketModalOpen}
          transferTicket={this.props.transferTicket} />

        <ReactModal
          isOpen={this.state.depositModalOpen}
          contentLabel="Deposit Ether Modal"
          onRequestClose={() => {
            if (!this.state.isLoading) {
              this.setState({depositModalOpen: false});
            }
          }}
          style={require('./../../../layouts/modal-styles').default}
        >
          <span style={{textAlign: 'center'}}>Send Ether to this address:</span>
          <span className="deposit-address">{walletAddress}</span>
        </ReactModal>

        <ReactModal
          isOpen={this.state.withdrawModalOpen}
          contentLabel="Withdraw Ether Modal"
          onRequestClose={() => {
            if (!this.state.isLoading) {
              this.setState({withdrawModalOpen: false});
            }
          }}
          style={require('./../../../layouts/modal-styles').default}
        >
          <span>Some withdraw ether stuff</span>
        </ReactModal>


      </div>
    )
  }
}

export default User
