import React, { Component } from 'react';
import classNames from 'classnames';

import './EventInfo.scss';

class EventInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    let { name, price, owner, date, time, venue, imageUrl } = this.props.event;
    console.log('event.props: ', this.props);
    return (
      <div className='event-top-info'>
        <div className='event-image-container'>
          <img src={imageUrl} className='event-image' />
        </div>
        <div className='left-column'>
          <h1>{name}</h1>
          <h4>Owner: {owner}</h4>
          <h4>{date}</h4>
          <h4>${price}</h4>
        </div>
        <div className='right-column'>
          <div className='venue-info'>
            {venue.name} <br />
            {venue.address} <br />
            {venue.city}, {venue.state} {venue.zip}
          </div>
          <div className='time'>
            {time}
          </div>
        </div>
      </div>
    );
  }
}

export default EventInfo;
