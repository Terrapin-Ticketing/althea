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
      <div className="event-outer-container">
        {/* <div className="blurred-contianer">
          <div className='blured-background' style={{backgroundImage: `url(${imageUrl})`}}></div>
        </div> */}
        <div className='event-inner-container'>
          <div className='event-top-info'>
            {/* <div className='event-image-container' style={{background: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div> */}
            <div className='event-image-container'>
              <img src={imageUrl} />
            </div>
            <div className='right-column'>
              <div className="basic-info">
                <h2>{name}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EventInfo;
