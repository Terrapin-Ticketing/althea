import React, { Component } from 'react';
import { Link } from 'react-router';
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
        <td><Price price={item.price}/></td>
        <td><Link to={`/event/${item._id}`}><button className="btn waves-effect waves-light terrapin-green">View</button></Link></td>
      </tr>
    );
  }

  render() {
    return (
      <div className='container'>
        {this.props.children}
        <h1>Upcoming Events</h1>
        <table className='striped centered'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
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
