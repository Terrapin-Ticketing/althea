import React from 'react';
import { IndexLink, Link } from 'react-router';
import PropTypes from 'prop-types';
import Navigation from '../Navigation';
import './PageLayout.scss';

export default (store) => {
  const PageLayout = ({ children }) => (
    <div className='container'>
      <div className="top-bar">
        <IndexLink to='/'><img src={require('../assets/img/logo-square.png')} /></IndexLink>
      </div>
      <div className="page-container">
        <Navigation store={store}/>
        <div className='page-content'>
          {children}
        </div>
      </div>
    </div>
  );

  PageLayout.propTypes = {
    children: PropTypes.node
  };

  return PageLayout;
};
