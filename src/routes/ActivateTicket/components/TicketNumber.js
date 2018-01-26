import React, { Component } from 'react';

class TicketNumberInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketNumber: '',
      error: null
    };
    this.updateInput = this.updateInput.bind(this);
    this.activateTicket = this.activateTicket.bind(this);
  }

  updateInput(key, value) {
    this.setState({ [key]: value });
  }

  // async validateTicketNumber() {
  //   let { validateTicketNumber, nextStep } = this.props;
  //   this.setState({isLoading: true});
  //   await validateTicketNumber(this.state.ticketNumber);
  //   this.setState({isLoading: false})
  //   if (this.props.error) {
  //     this.setState({error: this.props.error});
  //   } else {
  //     nextStep('finish');
  //   }
  // }

  async activateTicket(e) {
    let { activateTicket, nextStep } = this.props;
    e.preventDefault();
    this.setState({isLoading: true});
    await activateTicket(this.state.ticketNumber);
    this.setState({isLoading: false})
    if (this.props.error) {
      this.setState({error: this.props.error});
    } else {
      nextStep('finish');
    }
  }

  render() {
    return (
      <div className="col s12 m8 offset-m2 l6 offset-l3">
        <div className="card activate-card">
          <form className="card-content" onSubmit={(e) => this.activateTicket(e)}>
            <h2 className="activate-header">Input Ticket Number</h2>
            {this.state.error}
            <div className="input-field">
              <label htmlFor="barcode" data-error={true}>Ticket Number</label>
              <input id="barcode" type="text" className="validate"
                value={this.state.ticketNumber}
                onChange={(e) => {
                  this.updateInput('ticketNumber', e.target.value);
                }} />
              <div>
                { this.state.isLoading ? (
                  <div className="spinner-container">
                    <div className="preloader-wrapper small active">
                      <div className="spinner-layer spinner-green-only">
                        <div className="circle-clipper left">
                          <div className="circle"></div>
                        </div><div className="gap-patch">
                          <div className="circle"></div>
                        </div><div className="circle-clipper right">
                          <div className="circle"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ): (<button className="btn-large" style={{margin: '15px 0'}}type="submit">Activate Ticket</button>)}
              </div>
            </div>
          </form>
        </div>
        <i className='material-icons' style={{color: '#093', cursor: 'pointer'}} onClick={() => this.props.nextStep('select_login')}>arrow_back</i>
      </div>
    );
  }
}

export default TicketNumberInput;
