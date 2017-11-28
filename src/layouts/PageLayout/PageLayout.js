import React, { Component } from 'react';
import { IndexLink, Link, browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Sidebar from '../Sidebar';
import './PageLayout.scss';


const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  };
};

export default (store) => {
  const logout = () => {
    store.dispatch({
      type: 'LOGOUT',
      payload: {}
    });
    browserHistory.push('login');
  };

  const PageLayout = class PageLayout extends Component {
    render() {
      const { user } = this.props;
      return (
        <div className='container'>
          <div className="top-bar">
            <div className="logo-container">
              <IndexLink to='/'><img style={{width: 300}} src={require('../assets/img/logo-side-text.png')} /></IndexLink>
            </div>
            <div className="navigation-container">
              <div className="nav-controls">
                <input className="burger-check" id="burger-check" type="checkbox" />
                <label htmlFor="burger-check" className="burger"></label>
                <label htmlFor="burger-check" className="burger-space"></label>
              </div>
            </div>
            <div className="top-navigation">
              <span className='nav-item'><Link to='/events' className="nav-item" activeClassName='active'>Events</Link></span>
              <span className='nav-item'><Link to='/createEvent' className="nav-item" activeClassName='active'>Create Event</Link></span>
              {(user) ? <span className='nav-item'><Link to='/user' className="nav-item" activeClassName='active'>My Account</Link></span> : null }
              {(!user) ? <span className='nav-item'><Link to='/login' className="nav-item" activeClassName='active'>Login</Link></span> : null }
              {(user) ? <span className='nav-item'><Link style={{cursor: 'pointer'}} className="nav-item" onClick={() => logout()}>Logout</Link></span> : null }
              {/* <Link to='#'>Help</Link> */}
            </div>
          </div>
          <div className="page-container">
            {/* <Sidebar store={store}/> */}
            <div className='page-content'>
              {this.props.children}
            </div>
          </div>
        </div>
      );
    }
  };

  PageLayout.propTypes = {
    children: PropTypes.node
  };
  return connect(mapStateToProps, { })(PageLayout);
};
