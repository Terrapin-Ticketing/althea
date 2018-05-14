import { connect } from 'react-redux';

import PayoutModal from './PayoutModal';

const mapDispatchToProps = {
  ...require('./reducer'),
  ...require('../../../routes/EventManager/Payments/reducer.js')
};

const mapStateToProps = (state) => {
  return {
    payout: state.payoutModal.payout
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PayoutModal);
