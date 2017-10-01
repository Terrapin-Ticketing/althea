import { connect } from 'react-redux';
const modules = require('../modules/unlock');
const authModules = require('../../../store/authentication').actions;

let mapDispatchToProps = {
  ...modules,
  ...authModules
};

import Unlock from '../components/Unlock';

const mapStateToProps = (state) => {
  return {
    previousLocation: state.unlock.previousLocation
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Unlock);
