import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class SuccessPage extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    let { ticket } = this.props;
    return (
      <div className="col s12 m8 offset-m2 l6 offset-l3">
        <div className="card activate-card">
          <div className="card-content">
            <h1>Finished!</h1>
            <div>
              <button className="btn-large" onClick={() => browserHistory.push(`/event/${ticket.eventId}/ticket/${ticket._id}`)}>View Ticket</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SuccessPage;
