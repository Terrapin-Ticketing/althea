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
      payload: {}
    });
    browserHistory.push('login');
  };

  const PageLayout = class PageLayout extends Component {

    constructor(props) {
      super(props);
      this.state = { mounted: false };
    }

    componentDidMount() {
      this.setState({ mounted: true });
    }

    render() {
      // const { store, logout } = props;
      // const { user } = store.getState().auth;
      const { user } = this.props;
      let children = (this.state.mounted) ? this.props.children : null;

      return (
        <ReactCSSTransitionGroup
          transitionAppear={true}
          transitionAppearTimeout={600}
          transitionEnterTimeout={600}
          transitionLeaveTimeout={200}
          transitionName="Appear" >
          <nav>
            <div className="nav-wrapper">
              <div className="brand-logo">
                <img onClick={() => browserHistory.push('/')} className="responsive-img" src={require('../assets/img/logo-white-side-text.png')} />
              </div>
              {/* <img style={{width: 300}} src={require('../assets/img/logo-side-text.png')} /> */}
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to='/events' className="nav-item" activeClassName='active'>Events</Link></li>
                {(!user) ? (<li><Link to='/login' className="nav-item" activeClassName='active'>Login</Link></li>) : null}
                {(user) ? (<li className='nav-item'><Link to='/my-profile' className='nav-item' activeClassName='page-layout__nav-item--active'>My Profile</Link></li>) : null}
                {(user) ? (<li className='nav-item'><Link onClick={() => logout()} className='nav-item' activeClassName='page-layout__nav-item--active'>Logout</Link></li>) : null}
              </ul>
            </div>
          </nav>
        <div className='page-content'>
          {children}
        </div>
      </ReactCSSTransitionGroup>
      );
    }
  };

  PageLayout.propTypes = {
    children: PropTypes.node
  };
  return connect(mapStateToProps, { })(PageLayout);
};
