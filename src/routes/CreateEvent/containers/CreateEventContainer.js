import { connect } from 'react-redux';
const defaultActions = require('../modules/createEvent');

const mapDispatchToProps = {
  ...defaultActions
};

import CreateEvent from '../components/CreateEvent';

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
