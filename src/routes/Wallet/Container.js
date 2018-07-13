import React, { Component } from 'React'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Wallet from './Component'

class WalletContainer extends Component {
  async componentDidMount() {
    console.log('this.props: ', this.props)
    await this.props.getUserTickets(this.props.user._id)
    document.title = 'Wallet - Terrapin Ticketing'
  }

  render() {
    return <Wallet
      user={this.props.user}
      tickets={this.props.tickets}
      loading={this.props.loading}
      error={this.props.error} />
  }
}

WalletContainer.propTypes = {
  tickets: PropTypes.array,
  user: PropTypes.object,
  getUserTickets: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.bool
}

const mapDispatchToProps = {
  ...require('./modules')
}

const mapStateToProps = (state) => {
  return {
    tickets: state.wallet.tickets,
    user: state.auth.user,
    error: state.wallet.error,
    loading: state.wallet.loading,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletContainer)
