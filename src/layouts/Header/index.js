import React from 'react';
import { IndexLink, Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Header.scss';

function logout(store) {
  store.dispatch({
    type: 'LOGOUT',
    payload: null
  });

}

export const Header = (props) => {
  const { store, logout } = props;
  const { user } = store.getState().auth;
  return (
    <div className='container text-center'>
      <IndexLink to='/'><img src={require('../assets/img/logo.png')} /></IndexLink>
      <div className='navigation'>
        {(!user) ? (<span className='nav-item'><Link to='/signup' className='nav-item' activeClassName='page-layout__nav-item--active'>Signup</Link></span>) : null}
        {(!user) ? (<span className='nav-item'><Link to='/login' className='nav-item' activeClassName='page-layout__nav-item--active'>Login</Link></span>): null}
        <span className='nav-item'><Link to='/events' className='nav-item' activeClassName='page-layout__nav-item--active'>Events</Link></span>
        <span className='nav-item'><Link to='/createEvent' className='nav-item' activeClassName='page-layout__nav-item--active'>Create Event</Link></span>
        {(user) ? (<span className='nav-item'><Link to='/user' className='nav-item' activeClassName='page-layout__nav-item--active'>My Profile</Link></span>) : null}
        {(user) ? (<span className='nav-item'><Link onClick={() => logout(store)} className='nav-item' activeClassName='page-layout__nav-item--active'>Logout</Link></span>) : null}
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  logout
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
