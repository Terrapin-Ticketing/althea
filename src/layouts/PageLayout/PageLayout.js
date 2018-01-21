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
    browserHistory.push('/login');
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

          <header className="header terrapin-green z-depth-2" >
            <img src={require('../assets/img/tt-logo-white.svg')} className="logo img-responsive" style={{height: 55}} />
            <input className="menu-btn" checked={this.state.topNavOpen} type="checkbox" id="menu-btn" />
            <label className="menu-icon" onClick={() => this.setState({ topNavOpen: !this.state.topNavOpen })} htmlFor="menu-btn"><span className="navicon"></span></label>
            <ul className="menu">
              <li><Link to="/events" onClick={() => this.setState({topNavOpen: false })}>Events</Link></li>
              {(!user) ? (<li><Link to='/login' onClick={() => this.setState({topNavOpen: false })} className="nav-item" activeClassName='active'>Login</Link></li>) : null}
               {(user) ? (<li><Link to='/my-profile' onClick={() => this.setState({topNavOpen: false })} className='nav-item' activeClassName='page-layout__nav-item--active'>My Tickets</Link></li>) : null}
               <li><Link to='/help' onClick={() => this.setState({topNavOpen: false })} className='nav-item' activeClassName='page-layout__nav-item--active'>Help</Link></li>
               {(user) ? (<li><Link onClick={() => logout()} className='nav-item' activeClassName='page-layout__nav-item--active'>Logout</Link></li>) : null}
            </ul>
          </header>
          <main onClick={() => this.setState({ topNavOpen: false })} className='page-content'>
            {children}
          </main>
          <footer className="page-footer" style={{paddingTop: 0}}>
            {/* <div className="container">
              <div className="row">
                <div className="col l6 s12">
                  <h5 className="white-text">Terrapin Ticketing</h5>
                  <p className="grey-text text-lighten-4">Terrapin Ticketing is a group of technologists, entrepreneurs, and live music fans that are on a mission to improve the experience that happens before getting into the events we love.
We make ticketing fast, safe, and easy so fans can focus on enjoying the show.</p>
                </div>
                <div className="col l4 offset-l2 s12">
                  <h5 className="white-text">Links</h5>
                  <ul>
                    <li><a className="grey-text text-lighten-3" href="#!">Link 1</a></li>
                    <li><a className="grey-text text-lighten-3" href="#!">Link 2</a></li>
                    <li><a className="grey-text text-lighten-3" href="#!">Link 3</a></li>
                    <li><a className="grey-text text-lighten-3" href="#!">Link 4</a></li>
                  </ul>
                </div>
              </div>
            </div> */}
            <div className="footer-copyright">
              <div className="container">
              © 2018 Terrapin Ticketing
              {/* <a className="grey-text text-lighten-4 right" href="#!">More Links</a> */}
              </div>
            </div>
          </footer>
        </ReactCSSTransitionGroup>
      );
    }
};

  PageLayout.propTypes = {
    children: PropTypes.node
  };
  return connect(mapStateToProps, { })(PageLayout);
};
