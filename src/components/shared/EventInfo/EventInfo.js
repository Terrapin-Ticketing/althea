import React, { Component } from 'react';
import Price from '../Price';
import classNames from 'classnames';

import './EventInfo.scss';

class EventInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    let { name, price, owner, date, time, imageUrl, website, venue } = this.props.event;
    return (
      <div className="event-outer-container card">
        <div className="blurred-contianer">
          <div className='blured-background' style={{backgroundImage: `url(${imageUrl})`}}></div>
        </div>
        <div className='event-inner-container'>
          <div className='event-top-info'>
            <div className='event-image-container' style={{background: `url(${imageUrl})`, backgroundSize: 'contain', backgroundPosition: 'center' }}></div>
            <div className='right-column'>
              <div className="basic-info">
                <h2>{name}</h2>
                <h4>{(date) ? date : 'September 20-22, 2018'}</h4>
              </div>
              <div className="venueInfo">
                <h3 className="venue-info">{venue.name}</h3>
                <h4 className="venue-info">{venue.address}</h4>
                <h4 className="venue-info">{venue.city}, {venue.state} {venue.zip}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EventInfo;
