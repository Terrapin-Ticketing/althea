import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import classNames from 'classnames';
import EventInfoContainer from './../../../components/shared/EventInfo/EventInfo';
import Price from './../../../components/shared/Price';
import Loading from '../../../components/shared/Loading.js';

import './AvailableTickets.scss';

class AvailableTickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
    this.renderAvailableTickets = this.renderAvailableTickets.bind(this);
  }

  async componentDidMount() {
    console.log('this.props11: ', this.props);
    let { urlSafe } = this.props.params;
    await this.props.getEventInfo(urlSafe);
    this.props.getAvailableTickets(this.props.event);
    document.title = `Available Tickets: ${this.props.event.name} - Terrapin Ticketing`;
  }

  renderAvailableTickets() {
    let { availableTickets } = this.props;
    if (availableTickets) {
      return this.props.availableTickets.map((ticket) => {
        return (
          <div key={ticket._id} className="ticket-item col s12 valign-wrapper" onClick={() => browserHistory.push(`/event/${ticket.eventId._id}/ticket/${ticket._id}`)}>
            <span className="ticket-type">{ticket.type}</span>
              <span className="price"><Price price={ticket.price}/></span>
            {/* <span><i className="material-icons">info</i></span> */}
          </div>
        );
      });
    }
  }

  renderActivateButton() {
    return (
      <button onClick={()=> browserHistory.push(`/event/${this.props.event.urlSafe}/activate`)}
        className="waves-effect waves-light btn-large terrapin-green">Activate Ticket</button>
    );
  }

  render() {
    console.log('this.props: ', this.props);
    let { isLoading } = this.state;
    if (!this.props.event.name) {
      return (
        <Loading />
      );
    }

    return (
      <div className="container">
        <div className="image-container">
          <img src={this.props.event.thumbnail_image_url} />
        </div>
        <h2 style={{marginBottom: 0}}>{this.props.event.name}</h2>
          <h4 style={{marginTop: 0, color: 'rgba(0,0,0,.71)'}}>Available Tickets for Sale</h4>
          <div className="card">
            <div className="card-content">
              {this.renderAvailableTickets(this.props.availableTickets)}
            </div>
          </div>
        </div>
    );
  }
}

export default AvailableTickets;