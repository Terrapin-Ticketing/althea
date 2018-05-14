import { connect } from 'react-redux';

import PayoutEntry from './PayoutEntry';

const payoutModalReducer = require('../PayoutModal/reducer');

const mapDispatchToProps = {
  ...payoutModalReducer
};

const mapStateToProps = (state) => {
  return {
    payoutModalOpen: state.payoutModal.isOpen,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PayoutEntry);
