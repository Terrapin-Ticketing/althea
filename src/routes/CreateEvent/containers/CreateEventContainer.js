import { connect } from 'react-redux';
const mapDispatchToProps = require('../modules/createEvent');

import CreateEvent from '../components/CreateEvent';

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
