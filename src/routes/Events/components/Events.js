import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import moment from 'moment';
import classNames from 'classnames';
import Price from '../../../components/shared/Price';

import './Events.scss';

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      confirmPassword: null
    };
    this.renderEvent = this.renderEvent.bind(this);
  }

  componentDidMount() {
    this.props.getEvents();
    document.title = 'Events - Terrapin Ticketing'
  }

  eventClick(event) {
    browserHistory.push(`event/${event.urlSafe}`)
  }

  goToActivate(event) {
    browserHistory.push(`event/${event.urlSafe}/activate`);
  }

  renderEvent(event, index, img) {
    return (
      <div key={index} className={classNames({disabled: event.isDisabled})}>
        <div className="ticket-card card show-on-small hide-on-med-and-up">
          <div className="card-image ticket-image s12 m6" onClick={() => this.eventClick(event)}>
            { img || <img className="card-image-test" width="50" src={event.imageUrl} /> }
          </div>
          <div className="card-content ticket-content flow-text" onClick={() => this.eventClick(event)}>
            <a className="card-title">{event.name}</a>
            <small>Date: <br />{moment(event.date).format('dddd MMMM Do, YYYY')}</small><br />
            <div className="venue-info">
              <small>
                {event.venue.name} <br />
                {event.venue.address} <br />
                {event.venue.city}, {event.venue.state} {event.venue.zip}
              </small>
            </div>
          </div>
          <div className="card-action valign-wrapper" style={{justifyContent: 'center'}}>
            <div className="action-buttons">
              {/* <Link className="action-button btn-flat waves-effect" onClick={() => this.eventClick(event)}>More Info</Link> */}
              <Link className="action-button btn-flat center-align waves-effect" onClick={() => this.goToActivate(event)}>Activate Ticket</Link>
            </div>
          </div>
        </div>
        <div className="ticket-card card horizontal sticky-action small hide-on-small-only">
          <div className="ticket-image card-image s12 m6" onClick={() => this.eventClick(event)}>
            { img || <img className="card-image-test" width="50" src={event.imageUrl} /> }
          </div>
          <div className="card-stacked col s12 m6">
            <div className="card-content ticket-content" onClick={() => this.eventClick(event)}>
              <a className="card-title">{event.name}</a>
              <small>Date: <br />{moment(event.date).format('dddd MMMM Do, YYYY')}</small><br />
              <div className="venue-info">
                <small>
                  {event.venue.name} <br />
                  {event.venue.address} <br />
                  {event.venue.city}, {event.venue.state} {event.venue.zip}
                </small>
              </div>
            </div>
            <div className="card-action valign-wrapper" style={{justifyContent: 'center'}}>
              <div className="action-buttons">
                <Link className={classNames('action-button btn-flat center-align waves-effect', {disabled: event.isDisabled})} onClick={() => this.goToActivate(event)}>Activate Ticket</Link>
                {/* <Link className="action-button btn-flat waves-effect" onClick={() => this.eventClick(event)}>More Info</Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className='container'>
        {this.props.children}
        <h1>Upcoming Events</h1>
        {this.props.events.map((event, index) => {
          return this.renderEvent(event, index);
        })}
        {/* add resonance */}
        {this.renderEvent({
          _id: Date.now(),
          name: 'Resonance Music Festival',
          isDisabled: true,
          imageUrl: 'https://terrapinticketing.com/img/resonance.jpg',
          venue: {
            name: 'Legend Valley',
            address: '7585 Kindle Rd',
            city: 'Thornville',
            state: 'OH',
            zip: '43076'
          }
        }, this.props.events.length, <img className="card-image-test" src={require('../../../layouts/assets/img/resonance.jpg')} />)}
      </div>
    );
  }
}

export default Events;
