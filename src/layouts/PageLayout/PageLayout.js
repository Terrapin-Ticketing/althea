import React, { Component } from 'react';
import { IndexLink, Link, browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Sidebar from '../Sidebar';
import './PageLayout.scss';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  };
};

export default (store) => {
  const logout = () => {
    store.dispatch({
      type: 'LOGOUT',
      payload: 'PageLayout'
    });
    browserHistory.push('/login');
  };

  const PageLayout = class PageLayout extends Component {

    constructor(props) {
      super(props);
      this.state = { mounted: false };
      this.renderHeader = this.renderHeader.bind(this);
      this.renderFooter = this.renderFooter.bind(this);
    }

    componentDidMount() {
      this.setState({
        mounted: true,
        topNavOpen: false
      });
    }

    renderHeader() {
      let { user } = this.props;
      let activePage = this.props.location.pathname.split('/');
      let renderHeader = activePage.includes('activate') || activePage.includes('set-password');
      // console.log('activePage: ', activePage.includes('set-password'));
      // console.log('activePage: ', activePage);
      return (!renderHeader) ? (
        <header className="header terrapin-green" >
          <div className="header-container">
            <a href="https://TerrapinTicketing.com"><img src={require('../assets/img/tt-logo-white.svg')} className="logo img-responsive" style={{height: 38}} /></a>
            <div className="menu-container">
              <input className="menu-btn" checked={this.state.topNavOpen} type="checkbox" id="menu-btn" />
              <label className="menu-icon" onClick={() => this.setState({ topNavOpen: !this.state.topNavOpen })} htmlFor="menu-btn"><span className="navicon"></span></label>
              <ul className="menu">
                <li className='nav-item'><Link to="/events" onClick={() => this.setState({topNavOpen: false })}>Events</Link></li>
                {(user) ? (<li className='nav-item'><Link to='/my-profile' onClick={() => this.setState({topNavOpen: false })} activeClassName='page-layout__nav-item--active'>My Tickets</Link></li>) : null}
                <li className='nav-item'><Link to='/help' onClick={() => this.setState({topNavOpen: false })} activeClassName='page-layout__nav-item--active'>Help</Link></li>
                {(!user) ? (<li className='nav-item'><Link to='/login' onClick={() => this.setState({topNavOpen: false })} activeClassName='active'>Login</Link></li>) : null}
                {(!user) ? (<li className='nav-item login'><Link to='/signup' onClick={() => this.setState({topNavOpen: false })} className="login" activeClassName='active'>Sign Up</Link></li>) : null}
                {(user) ? (<li className='nav-item'><Link onClick={() => logout()} activeClassName='page-layout__nav-item--active'>Logout</Link></li>) : null}
              </ul>
            </div>
          </div>
        </header>
      ) : null;
    }

    renderFooter() {
      let { user } = this.props;
      let activePage = this.props.location.pathname.split('/').pop();
      return (activePage !== 'activate') ? (
        <footer className="page-footer" style={{paddingTop: 0}}>
          <div className="footer-copyright">
              <div className="footer-text">
                Copyright 2018 © Terrapin Ticketing, LLC
              </div>
              <div className="social-icons valign-wrapper">
                <a href="mailto:info@terrapinticketing.com" target="_blank"><img src={require("../assets/img/social-icons/email.png")} /></a>
                <a href="http://facebook.com/terrapinticketing" target="_blank"><img src={require("../assets/img/social-icons/facebook.png")} /></a>
                <a href="http://instagram.com/terrapinticketing" target="_blank"><img src={require("../assets/img/social-icons/instagram.png")} /></a>
                <a href="http://www.twitter.com/terrapintickets" target="_blank"><img src={require("../assets/img/social-icons/twitter.png")} /></a>
                <a href="https://www.linkedin.com/company/18278533/" target="_blank"><img src={require("../assets/img/social-icons/linkedin.png")} /></a>
              </div>
            </div>
        </footer>
      ) : null;
    }

    render() {
      const { user, location } = this.props;
      let children = (this.state.mounted) ? this.props.children : null;
      return (
        <ReactCSSTransitionGroup
          component="div"
          className="transition-content"
          transitionAppear={true}
          transitionAppearTimeout={600}
          transitionEnterTimeout={600}
          transitionLeaveTimeout={200}
          transitionName="Appear" >
          {this.renderHeader()}
          <main onClick={() => this.setState({ topNavOpen: false })} className='page-content'>
            {children}
          </main>
          {this.renderFooter()}
        </ReactCSSTransitionGroup>
      );
    }
};

  PageLayout.propTypes = {
    children: PropTypes.node
  };
  return connect(mapStateToProps, { })(PageLayout);
};
