import { connect } from 'react-redux';

import PayoutModal from './PayoutModal';

const mapDispatchToProps = require('./reducer');

const mapStateToProps = (state) => {
  return {
    payout: state.payoutModal.payout
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PayoutModal);
