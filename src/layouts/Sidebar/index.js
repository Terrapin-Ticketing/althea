import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import './Sidebar.scss';

export const Sidebar = (props) => {
  let { event, openTicketRedeemModal } = props;
  return (
    <div className="navigation-container">
      <div className="nav-controls">
        <input className="burger-check" id="burger-check" type="checkbox" />
        <label htmlFor="burger-check" className="burger"></label>
        <label htmlFor="burger-check" className="burger-space"></label>
        <div className='navigation'>
          <span className='nav-item'><Link to={`/event/${event.id}/manage/preview`} className='nav-item' activeClassName='page-layout__nav-item--active'>Preview</Link></span>
          <span className='nav-item'><Link to={`/event/${event.id}/manage/stats`} className='nav-item' activeClassName='page-layout__nav-item--active'>Stats</Link></span>
          <span className='nav-item'><Link to={`/event/${event.id}/manage/unsoldTickets`} className='nav-item' activeClassName='page-layout__nav-item--active'>Unsold Tickets</Link></span>
          <span className='nav-item'><Link to={`/event/${event.id}/manage/soldTickets`} className='nav-item' activeClassName='page-layout__nav-item--active'>Sold Tickets</Link></span>
          <span className='nav-item'><Link onClick={() => openTicketRedeemModal()} className='nav-item' activeClassName='page-layout__nav-item--active'>Redeem Tickets</Link></span>
          <span className='nav-item'><Link className='nav-item'>Edit Event</Link></span>
          <span className='nav-item'><Link className='nav-item'>Edit Branding</Link></span>
          <span className='nav-item'><Link className='nav-item'>Delete Event</Link></span>
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
