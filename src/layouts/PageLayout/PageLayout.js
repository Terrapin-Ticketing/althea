import React from 'react';
import { IndexLink, Link } from 'react-router';
import PropTypes from 'prop-types';
// import Sidebar from '../Sidebar';
import './PageLayout.scss';

export default (store) => {
  console.log('store: ', store.getState());
  const { user } = store.getState().auth;
  const PageLayout = ({ children }) => {
    return (
      <div className='container'>
        <div className="top-bar">
          <div className="left-column">
            <IndexLink to='/'><img style={{width: 300}} src={require('../assets/img/logo-side-text.png')} /></IndexLink>
          </div>
          <div className="right-column">
            <Link to='/events' activeClassName='active'>Events</Link>
            <Link to='/createEvent' activeClassName='active'>Create Event</Link>
            {(user) ? <Link to='/user' activeClassName='active'>My Account</Link> : null }
            {(!user) ? <Link to='/login' activeClassName='active'>Sign Up</Link> : null }
            <Link to='#'>Help</Link>
          </div>
        </div>
        <div className="page-container">
          {/* <Sidebar store={store}/> */}
          <div className='page-content'>
            {children}
          </div>
        </div>
      </div>
    );
  };

  PageLayout.propTypes = {
    children: PropTypes.node
  };

  return PageLayout;
};
