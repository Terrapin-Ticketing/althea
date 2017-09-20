import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import ReactModal from 'react-modal';
import web3 from '../../../components/Web3.js'
import './User.scss'
import modalStyles from '../../../layouts/modal-styles'


class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      qty: null, // TODO: Force to int
      price: null, // TODO: Force to int
      tickets: [],
      events: [],
      balance: null
    };
  }

  componentDidMount() {
    this.props.getUserEvents();
    // this.props.getTickets();
    this.props.getUserBalance();
  }

  renderTickets() {
    return (
      <span>{this.state.tickets}</span>
    )
  }

  renderEvents() {
    if (this.props.events) {
      return (
        this.props.events.map((event, index) => {
          return (
              <tr className={`event-row ${(index%2 === 0) ? 'odd' : null}`} key={event.id}>
                <td>{event.name}</td>
                <td>{event.price}</td>
                <td>{event.qty}</td>
              </tr>
          )
        })
      )
    } else {
      null
    }
  }

  render() {
    const { email, walletAddress, encryptedPrivateKey } = this.props.user;
    const { balance } = this.props;
    return (
      <div className='container' >
        <h1>User</h1>
        <div className="profile-info">
          <div className="profile-left">
            <span className='profile-item'>Name: {email}</span>
            <span className='profile-item'>Private Key: {`${encryptedPrivateKey.slice(0, 10)}...`}</span>
            <span className='profile-item'>Balance: {balance}</span>
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
              </th>
              <tbody>
                {this.renderEvents()}
              </tbody>
            </table>
          </TabPanel>
          <TabPanel>
            <h2>Tickets</h2>
            <div className="tickets-table">
              {this.renderTickets()}
            </div>
          </TabPanel>
        </Tabs>

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
