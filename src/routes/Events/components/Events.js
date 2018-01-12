import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
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
    this.renderListItem = this.renderListItem.bind(this);
  }

  componentDidMount() {
    this.props.getEvents();
  }

  renderListItem(item, index) {
    return (
      <tr key={item._id}>
        <td>{item.name}</td>
        {/* <td><Price price={item.price}/></td> */}
        <td>
          {/* <Link to={`/event/${item._id}`}> */}
        <button
          className={classNames('btn waves-effect waves-light terrapin-green', { disabled: item.isDisabled })}
          onClick={(e) => {
            e.preventDefault();
            if (item.isDisabled) return;
            browserHistory.push(`/event/${item._id}`);
          }}
          >
          View
        </button>
        {/* </Link> */}
        </td>
      </tr>
    );
  }

  addResonance(events) {
    events.push({
      _id: Date.now(),
      name: 'resonance',
      isDisabled: true
    });
  }

  render() {
    let { events } = this.props;
    events = this.addResonance(events);
    return (
      <div className='container'>
        {this.props.children}
        <h1>Upcoming Events</h1>
        <table className='striped centered'>
          <thead>
            <tr>
              <th>Name</th>
              {/* <th>Price</th> */}
              <th>Actions</th>
            </tr>
          </thead>
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
