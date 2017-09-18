import React from 'react';
import { IndexLink, Link } from 'react-router';
import PropTypes from 'prop-types';
import Header from '../Header';
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
      <Header store={store}/>
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
