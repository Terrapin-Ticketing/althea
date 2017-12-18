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
      this.setState({
        mounted: true,
        topNavOpen: false
      });
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

          <header className="header terrapin-green z-depth-2">
            <img src={require('../assets/img/tt-logo-white.svg')} className="logo img-responsive" style={{height: 55}} />
            <input className="menu-btn" checked={this.state.topNavOpen} type="checkbox" id="menu-btn" />
            <label className="menu-icon" onClick={() => this.setState({ topNavOpen: !this.state.topNavOpen })} htmlFor="menu-btn"><span className="navicon"></span></label>
            <ul className="menu">
              <li><Link to="events" onClick={() => this.setState({topNavOpen: false })}>Events</Link></li>
              {(!user) ? (<li><Link to='/login' onClick={() => this.setState({topNavOpen: false })} className="nav-item" activeClassName='active'>Login</Link></li>) : null}
               {(user) ? (<li><Link to='/my-profile' onClick={() => this.setState({topNavOpen: false })} className='nav-item' activeClassName='page-layout__nav-item--active'>My Profile</Link></li>) : null}
               {(user) ? (<li><Link onClick={() => logout()} className='nav-item' activeClassName='page-layout__nav-item--active'>Logout</Link></li>) : null}
            </ul>
          </header>
          <div onClick={() => this.setState({ topNavOpen: false })} className='page-content'>
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
