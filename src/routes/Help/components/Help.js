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
            <div className="collapsible-header valign-wrapper"><i className="material-icons">local_activity</i>How do I activate my ticket?</div>
            <div className="collapsible-body">
              <span>
                <b>If you have the PDF pulled up on your phone or computer:</b> <br /><br />
                  <ol>
                    <li>Click on the Terrapin Ticketing image at the bottom of the PDF</li>
                    <li>Create an Account or Sign In</li>
                    <li>Input your ticket number</li>
                    <li>Click "View Ticket" on the success page</li>
                  </ol>
                <br /><br />
                <b>If you are trying to activate a ticket that has already been printed out:</b> <br /><br />
                <ol>
                  <li>Go to https://TerrapinTickets.io/events</li>
                  <li>Click "Activate Ticket" on the event your ticket is issued for</li>
                  <li>Create an Account or Sign In</li>
                  <li>Input your ticket number</li>
                  <li>Click "View Ticket" on the success page</li>
                </ol>
              </span>
            </div>
          </li>
          <li>
            <div className="collapsible-header valign-wrapper"><i className="material-icons">attach_money</i>How do I sell my ticket?</div>
            <div className="collapsible-body">
              <span>
                Once you have activated your ticket, you'll be able to mark it as "For Sale" on Terrapin's platform. <br /><br />
                <ol>
                  <li>Login to your Terrapin Ticketing account</li>
                  <li>Click on "My Tickets" in the header</li>
                  <li>Find the ticket you want to sell and click "Sell" on the ticket card</li>
                  <li>Fill out your payment information, set the price you want to list it for, and flip the "For Sale" switch</li>
                  <li>Click "Save" on the For Sale modal.</li>
                </ol>
                <br /><br />
                Your ticket is now marked as "For Sale" and able to be purchased by anyone who comes across your ticket link.
                To ensure it sells, we recommend sharing your ticket link with friends, family, and other fans. Another good way to find potential buyers is to share your link in the event's offical Facebook event page.
              </span>
            </div>
          </li>
          <li>
            <div className="collapsible-header valign-wrapper"><i className="material-icons">transfer_within_a_station</i>How do I transfer my ticket to someone?</div>
            <div className="collapsible-body">
              <span>
                Once you have activated your ticket, you'll be able to transfer it to other people via email. <br /><br />
                <ol>
                  <li>Login to your Terrapin Ticketing account</li>
                  <li>Click on "My Tickets" in the header</li>
                  <li>Find the ticket you want to transfer and click "Transfer" on the ticket card</li>
                  <li>Fill out the person's name and email address</li>
                  <li>Click "Transfer"</li>
                </ol>
                <br />
                The person will receive an email letting them know that you sent them a ticket.
                If they already have a Terrapin account, the ticket will be added to it.
                If they haven't created a Terrapin account yet, they will need to provide a password to complete the signup process.
              </span>
            </div>
          </li>
          <li>
            <div className="collapsible-header valign-wrapper"><i className="material-icons">payment</i>What payment methods are accepted?</div>
            <div className="collapsible-body"><span>We currently only accept credit cards as payment. We plan on adding other payment methods soon though!</span></div>
          </li>
          <li>
            <div className="collapsible-header valign-wrapper"><i className="material-icons">attach_money</i>How do I get paid for the ticket I sold?</div>
            <div className="collapsible-body"><span>You will receive an email notifying you when your ticket sells. We will send the amount you listed it for to the PayPal or Venmo account you provided us within 24 hours of the purchase. We apologize for the wait, sending payments is a manual process right now. This will be automated soon.</span></div>
          </li>
          <li>
            <div className="collapsible-header valign-wrapper"><i className="material-icons">live_help</i>I sold my ticket on Terrapin but I haven't received any money yet, what gives?</div>
            <div className="collapsible-body"><span>If you received an email saying your ticket sold and you haven't received a payment within 24 hours, please send us an email at <a href="mailto:Kevin@TerrapinTicketing.com">Kevin@TerrapinTicketing.com</a></span></div>
          </li>
          <li>
            <div className="collapsible-header valign-wrapper"><i className="material-icons">event_seat</i>I'm an event promotor, how can I integrate Terrapin into my ticketing system?</div>
            <div className="collapsible-body"><span>If you are an event promotor and want to integrate Terrapin for your event, shoot us an email at <a href="mailto:Kevin@TerrapinTicketing.com">Kevin@TerrapinTicketing.com</a></span></div>
          </li>
        </ul>

        <h1>Contact Us</h1>
        If you have any problems or questions, email info@terrapinticketing.com. For urgent matters, call (708) 805-9743.
      </div>
    );
  }
}

export default Help;
