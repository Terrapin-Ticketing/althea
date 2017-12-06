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
        <div>
          <nav>
            <div className="nav-wrapper">
              <div className="brand-logo">
                <img onClick={() => browserHistory.push('/')} className="responsive-img" src={require('../assets/img/logo-white-side-text.png')} />
              </div>
              {/* <img style={{width: 300}} src={require('../assets/img/logo-side-text.png')} /> */}
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to='/events' className="nav-item" activeClassName='active'>Events</Link></li>
              </ul>
            </div>
          </nav>
        <div className='page-content'>
          {this.props.children}
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
