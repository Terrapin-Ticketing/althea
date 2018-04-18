import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Header from 'layouts/Header'
import Footer from 'layouts/Footer'

import './PageLayout.scss'

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

class PageLayout extends Component {
  constructor(props) {
    super(props)
    this.state = { mounted: false }
  }

  componentDidMount() {
    this.setState({
      mounted: true,
      topNavOpen: false
    })
  }

  render() {
    let children = (this.state.mounted) ? this.props.children : null
    let activePage = this.props.location.pathname.split('/')
    let renderHeader = activePage.includes('activate') || activePage.includes('set-password')
    return (
      <div className='page-container' style={{ minHeight: '100%' }}>
        <Header location={this.props.location} />
        <main onClick={() => this.setState({ topNavOpen: false })} className='container'>
          {children}
        </main>
        <Footer location={this.props.location} />
      </div>
    )
  }
}

PageLayout.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object
}

export default connect(mapStateToProps, { })(PageLayout)
