import React from 'react';
import { browserHistory, IndexLink, Link } from 'react-router';
import { connect } from 'react-redux';
import './Navigation.scss';

async function logout(store) {
  await store.dispatch({
    type: 'CLEAR_EVENTS',
    payload: null
  });

  await store.dispatch({
    type: 'LOGOUT',
    payload: null
  });

  browserHistory.push('/login');
}

export const Navigation = (props) => {
  const { store, logout } = props;
  const { user } = store.getState().auth;

  return (
    <div className="navigation-container">
      <div className="nav-controls">
        <input className="burger-check" id="burger-check" type="checkbox" />
        <label htmlFor="burger-check" className="burger"></label>
        <IndexLink to='/'><img className="nav-logo" src={require('../assets/img/logo-square.png')} /></IndexLink>
        <label htmlFor="burger-check" className="burger-space"></label>
        <div className='navigation'>
          {(!user) ? (<span className='nav-item'><Link to='/signup' className='nav-item' activeClassName='page-layout__nav-item--active'>Signup</Link></span>) : null}
          {(!user) ? (<span className='nav-item'><Link to='/login' className='nav-item' activeClassName='page-layout__nav-item--active'>Login</Link></span>): null}
          <span className='nav-item'><Link to='/events' className='nav-item' activeClassName='page-layout__nav-item--active'>Events</Link></span>
          {/* <span className='nav-item'><Link to='/createEvent' className='nav-item' activeClassName='page-layout__nav-item--active'>Create Event</Link></span> */}
          {(user) ? (<span className='nav-item'><Link to='/user' className='nav-item' activeClassName='page-layout__nav-item--active'>My Profile</Link></span>) : null}
          {(user) ? (<span className='nav-item'><Link onClick={() => logout(store, props)} className='nav-item' activeClassName='page-layout__nav-item--active'>Logout</Link></span>) : null}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
