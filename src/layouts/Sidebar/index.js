import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import './Sidebar.scss';

export const Sidebar = (props) => {
  let { event, title } = props;
  return (
    <div className="navigation-container">
      <div className="nav-controls">
        <input className="burger-check" id="burger-check" type="checkbox" />
        <label htmlFor="burger-check" className="burger"></label>
        <label htmlFor="burger-check" className="burger-space"></label>
        <div className='navigation'>
          <span className='nav-item'><Link to={`/event/${event.urlSafe}/manage/overview`} className='nav-item' activeClassName='page-layout__nav-item--active'>Overview</Link></span>
          <span className='nav-item'><Link to={`/event/${event.urlSafe}/manage/preview`} className='nav-item' activeClassName='page-layout__nav-item--active'>Preview</Link></span>
          <span className='nav-item'><Link to={`/event/${event.urlSafe}/manage/stats`} className='nav-item' activeClassName='page-layout__nav-item--active'>Stats</Link></span>
          <span className='nav-item'><Link to={`/event/${event.urlSafe}/manage/transactions`} className='nav-item' activeClassName='page-layout__nav-item--active'>Transactions</Link></span>
          <span className='nav-item'><Link to={`/event/${event.urlSafe}/manage/transfers`} className='nav-item' activeClassName='page-layout__nav-item--active'>Transfers</Link></span>
          <span className='nav-item'><Link to={`/event/${event.urlSafe}/manage/payments`} className='nav-item' activeClassName='page-layout__nav-item--active'>Payments</Link></span>
          <span className='nav-item'><Link to={`/event/${event.urlSafe}/manage/tickets`} className='nav-item' activeClassName='page-layout__nav-item--active'>Tickets</Link></span>
          <span className='nav-item'><Link className='nav-item'>Settings</Link></span>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
};

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
