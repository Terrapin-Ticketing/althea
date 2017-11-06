import React, { Component } from 'react';
import Price from './Price';
import classNames from 'classnames';

import './EventInfo.scss';

class EventInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    let { name, price, owner, date, time, venue, imageUrl } = this.props.event;
    return (
      <div>
        <div className='blured-background' style={{backgroundImage: `url(${imageUrl})`}}></div>
        <div className='event-inner-container'>
          <div className='event-top-info'>
            <div className='event-image-container' style={{background: `url(${imageUrl})`, backgroundSize: 'cover'}}></div>
            <div className='right-column'>
              <h2>{name}</h2>
              <h2>{date}</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EventInfo;
