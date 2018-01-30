import React, { Component } from 'react';
import './Help.scss';

class Help extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  componentDidMount() {
    document.title = 'Help - Terrapin Ticketing';
    $(document).ready(function(){
      $('.collapsible').collapsible();
    });
  }

  render() {
    return (
      <div className='container help-container'>
        <h1>Frequently Asked Questions:</h1>
        <ul className="collapsible" data-collapsible="accordion">
          <li>
            <div className="collapsible-header"><i className="material-icons">place</i>How do I activate my ticket?</div>
            <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
          </li>
          <li>
            <div className="collapsible-header"><i className="material-icons">filter_drama</i>How do I sell my ticket?</div>
            <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
          </li>
          <li>
            <div className="collapsible-header"><i className="material-icons">whatshot</i>How do I transfer my ticket to someone?</div>
            <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
          </li>
          <li>
            <div className="collapsible-header"><i className="material-icons">whatshot</i>What payment methods are accepted?</div>
            <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
          </li>
          <li>
            <div className="collapsible-header"><i className="material-icons">whatshot</i>How do I get paid for the ticket I sold?</div>
            <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
          </li>
          <li>
            <div className="collapsible-header"><i className="material-icons">whatshot</i>I sold my ticket on Terrapin but I haven't received any money yet, what gives?</div>
            <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
          </li>
          <li>
            <div className="collapsible-header"><i className="material-icons">whatshot</i>I'm an event promotor, how can I integrate Terrapin into my ticketing system?</div>
            <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
          </li>
        </ul>

        <h1>Contact Us</h1>
        If you have any problems or questions, email info@terrapinticketing.com. For urgent matters, call (708) 805-9743.
      </div>
    );
  }
}

export default Help;
