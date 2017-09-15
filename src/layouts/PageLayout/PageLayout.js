import React from 'react';
import { IndexLink, Link } from 'react-router';
import PropTypes from 'prop-types';
import './PageLayout.scss';

function logout(store) {
  store.dispatch({
    type: 'LOGOUT',
    payload: null
  });

}

export default (store) => {

  const PageLayout = ({ children }) => (
    <div className='container text-center'>
      <IndexLink to='/'><img src={require('../assets/img/logo.png')} /></IndexLink>
      <div className='navigation'>
        <span className='nav-item'><IndexLink to='/' className='nav-item' activeClassName='page-layout__nav-item--active'>Home</IndexLink></span>
        <span className='nav-item'><Link to='/signup' className='nav-item' activeClassName='page-layout__nav-item--active'>Signup</Link></span>
        <span className='nav-item'><Link to='/login' className='nav-item' activeClassName='page-layout__nav-item--active'>Login</Link></span>
        <span className='nav-item'><Link to='/events' className='nav-item' activeClassName='page-layout__nav-item--active'>Events</Link></span>
        <span className='nav-item'><Link to='/createEvent' className='nav-item' activeClassName='page-layout__nav-item--active'>Create Event</Link></span>
        <span className='nav-item'><Link to='/user' className='nav-item' activeClassName='page-layout__nav-item--active'>My Profile</Link></span>
        <span className='nav-item'><Link onClick={() => logout(store)} className='nav-item' activeClassName='page-layout__nav-item--active'>Logout</Link></span>
      </div>
      <div className='page-layout__viewport'>
        {children}
      </div>
    </div>
  );

  PageLayout.propTypes = {
    children: PropTypes.node
  };

  return PageLayout;
};
