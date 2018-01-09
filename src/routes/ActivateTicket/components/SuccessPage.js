import React, { Component } from 'react';

class SuccessPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketNumber: ''
    };
  }

  render() {
    let { activateAnotherTicket, goToProfilePage } = this.props;
    return (
      <div className="input-field col s6">
        Success!
      <div onClick={activateAnotherTicket}>Activate Another Ticket</div>
      <div onClick={goToProfilePage}>Go To Profile Page</div>
      </div>
    );
  }
}

export default SuccessPage;
