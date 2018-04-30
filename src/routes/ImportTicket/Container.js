import React, { Component } from 'React'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ImportTicket from './Component'

class ImportTicketContainer extends Component {
  constructor(props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.afterLogin = this.afterLogin.bind(this)
    this.state = {
      step: 1
    }
  }

  async componentDidMount() {
    await this.props.getEventInfo(this.props.params.urlSafeName)
    document.title = 'Events - Terrapin Ticketing'
  }

  afterLogin() {
    this.nextStep()
  }

  nextStep() {
    this.setState({ step: this.state.step + 1 })
  }

  previousStep() {
    this.setState({ step: this.state.step - 1 })
  }

  render() {
    return <ImportTicket
      event={this.props.event}
      loading={this.props.loading}
      error={this.props.error}
      step={this.state.step}
      nextStep={this.nextStep}
      previousStep={this.previousStep}
      afterLogin={this.afterLogin}
    />
  }
}

ImportTicketContainer.propTypes = {
  event: PropTypes.object.isRequired,
  getEventInfo: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  params: PropTypes.object
}

const mapDispatchToProps = {
  ...require('./modules')
}

const mapStateToProps = (state) => {
  return {
    event: state.importTicket.currentEvent
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportTicketContainer)
