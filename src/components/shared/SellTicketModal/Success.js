import React, { Component } from 'react'
import FacebookProvider, { Share } from 'react-facebook';

class SellTicketForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoaded: false
    };
  }

  copyTicketLink() {
    this.ticketUrl.select();
    document.execCommand('copy');
    this.setState({copied: true});
    this.ticketUrl.blur();
  }

  render() {
    let { ticket } = this.props;
    return (
      <div className="success">
        <h1 style={{color: '#009933', marginBottom: 0, marginTop: 0}}>Success!</h1>
        <i className="material-icons large" style={{color: '#009933'}}>check</i>
        <div className="info-text">
          <small>Your ticket is now for sale on Terrapin. <br />Share your link around so other people can buy it.</small>
        </div>
          <h3 style={{margin: 0, marginTop: 10}}>Ticket Url</h3>
            <div className="col s12 valign-wrapper" style={{width: '100%'}}>
              <div className="input-field" style={{marginTop: 0, width: '100%'}}>
                <input ref={(input) => { this.ticketUrl = input; }}
                  id="ticketUrl" type="text" className="validate inline"
                  style={{marginBottom: 0}}
                  value={`${ALTHEA_URL}/event/${ticket.event._id}/ticket/${ticket._id}`} />
                </div>
                {/* <a className={classNames('action-button copy', {'disabled': this.state.copied })}
                  onClick={() => this.copyTicketLink(ticket._id)}>{(this.state.copied) ? 'Copied' : 'Copy Link'}</a> */}
          </div>
        <FacebookProvider appId="644007869280535">
          <Share href={`${ALTHEA_URL}/event/${ticket.event._id}/ticket/${ticket._id}`}>
          <div style={{cursor: 'pointer'}} className="valign-wrapper">
            <img width={20} className="action-button" src={require('../../../layouts/assets/img/facebook-logo.svg')} />
            <span style={{marginLeft: 10}}>Share on Facebook</span>
          </div>
        </Share>
      </FacebookProvider>
      </div>
    );
  }
}

export default SellTicketForm;
