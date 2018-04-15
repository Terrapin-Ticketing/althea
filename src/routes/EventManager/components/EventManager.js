import React, { Component } from 'react';
import EventInfoContainer from './../../../components/shared/EventInfo/EventInfo';
import Loading from '../../../components/shared/Loading.js';
import Sidebar from '../../../layouts/Sidebar';

import './EventManager.scss';

class EventManager extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  async componentDidMount() {
    let { urlSafe } = this.props.params;
    await this.props.getEventInfo(urlSafe);
    document.title = `${this.props.event.name} Event Manager - Terrapin Ticketing`;
  }

  render() {
    let { event, children} = this.props;
    if (!event.name) {
      return (
        <Loading />
      );
    }

    return (
      <div className='page-container'>
        <div className='manager-header'>
          <h2>Event Manager: {event.name}</h2>
        </div>
        <div className='manager-content'>
          <Sidebar event={event} title='Event Manager Controls' />
          <div className="container">
            <div className="card">
              <div className='card-content'>
                { children }
              </div>
              {/* <EventInfoContainer event={event} /> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EventManager;
