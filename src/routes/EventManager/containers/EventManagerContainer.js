import { connect } from 'react-redux';

import EventManager from '../components/EventManager';

const mapDispatchToProps = {
  ...require('../modules/eventManager')
};

const mapStateToProps = (state) => {
  return {
    event: state.eventManager.currentEvent,
    transactions: state.eventManager.transactions
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventManager);
