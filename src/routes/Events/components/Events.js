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
      <tr key={item.id} className={classNames('eventRow', {'odd': (index % 2 !== 0)})}>
        <td style={{flex: 2}}>{item.name}</td>
        <td><Price price={item.price}/></td>
        <td>{item.qty} Left</td>
        <td>
          <Link to={`/event/${item.id}`}>
            <button className='ripple'>Select Event</button>
          </Link>
        </td>
      </tr>
    );
  }

  render() {
    return (
      <div className='route-container card'>
        {this.props.children}
        <h1>Upcoming Events</h1>
        <table>
          <th>
            <td style={{flex: 2}}>Name</td>
            <td>Price</td>
            <td>Qty Remaining</td>
            <td className="actions">Actions</td>
          </th>
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
