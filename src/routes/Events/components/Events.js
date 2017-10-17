import React, { Component } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';
import ReactModal from 'react-modal';
import web3 from 'web3';

import StripeCheckout from './StripeCheckout';

import './Events.scss';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      confirmPassword: null
    };
    this.renderListItem = this.renderListItem.bind(this);
  }

  componentDidMount() {
    this.props.getEvents();
  }

  // async buyTicket(event, password) {
  //   this.setState({isLoading: true});
  //
  //   await this.props.buyTicket(event, password);
  //   await this.props.getEvents();
  //   this.setState({ isLoading: false, buyModalOpen: false });
  // }

  renderListItem(item, index) {
    return (
      <tr key={item.id} className={classNames('eventRow', {'odd': (index % 2 !== 0)})}>
        <td style={{flex: 2}}>{item.name}</td>
        <td>${item.price}</td>
        <td>{item.qty} Left</td>
        <td>

          {/* <button onClick={() => {
            this.setState({'buyModalOpen': true, selectedEvent: item });
          }}>Buy Ticket</button> */}

          <Link to={`/event/${item.id}`}>
            <button>Select Event</button>
          </Link>
          <StripeCheckout
            buyTicketStripe={this.props.buyTicketStripe}
            event={item}
            user={this.props.user}
          />
          {/* <button onClick={() => {
            this.setState({'buyModalOpen': true, selectedEvent: item });
          }}>Buy Ticket</button> */}
        </td>
      </tr>
    );
  }

  render() {
    return (
      <div className='events-container'>
        {this.props.children}
        <h1>Upcoming Events</h1>
        <table>
          <th>
            <td style={{flex: 2}}>Name</td>
            <td>Price</td>
            <td>Qty Remaining</td>
            <td className="actions">Actions</td>
          </th>
          <tbody>
            {this.props.events.map((event, index) => {
              return this.renderListItem(event, index);
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Events;
