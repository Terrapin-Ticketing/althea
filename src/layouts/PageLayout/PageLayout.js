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
      const { user } = this.props;

      let children = (this.state.mounted) ? this.props.children : null;

      return (
        <div>
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
                </ul>
              </div>
            </nav>
          <div className='page-content'>
            {children}
          </div>
        </ReactCSSTransitionGroup>
      </div>
      );
    }
  };

  PageLayout.propTypes = {
    children: PropTypes.node
  };
  return connect(mapStateToProps, { })(PageLayout);
};
