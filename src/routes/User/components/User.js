import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import Price from '../../../components/shared/Price';
import TicketCard from '../../../components/shared/TicketCard';
import './User.scss';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getUserTickets();
    document.title = 'My Tickets - Terrapin Ticketing';
  }

  componentWillUnmount() {
    this.setState({ dataLoaded: false });
  }

  renderTickets(tickets) {
    if (tickets && tickets.length > 0) {
      return (
        this.props.tickets.map((ticket, index) => {
          // ignore any pending tranfer tickets
          if (ticket._id === this.state.pendingTranferTicketId) {
            return null;
          }
          return (<TicketCard
            key={Math.random(index)}
            user={this.props.user}
            ticket={ticket} />);
        })
      );
    } else {
      return (
        <div className='no-tickets'>
          <h1>Bummer, you don't have any tickets!</h1><br />
        </div>
      );
    }
  }

  render() {
    if (!this.props.user) return null;
    return (
      <div className="route-container container">
        <div className="col s12">
          <div className="card-content">
            {(this.state.ticketTransfered) ? (
              <div className="terrapin-green lighten-1 scale-transition scale-in card-panel" style={{color: '#155724' }}>
                Transfered ticket to {this.state.recipientEmail}
              </div>
            ): null }
            {(this.props.location.query.ticketId) ? (
              <div className="terrapin-green lighten-1 scale-transition scale-in card-panel" style={{color: '#155724' }}>
                Purchase Successful (
                  <Link to={`/event/${this.props.location.query.eventId}/ticket/${this.props.location.query.ticketId}`} >
                   View Ticket
                </Link>)
              </div>
            ): null }
            <h1>My Tickets <small style={{color: '#737373', marginTop: 0, fontSize: '50%'}}>{this.props.user.email}</small></h1>
            <div className="row">
              {this.renderTickets(this.props.tickets)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
