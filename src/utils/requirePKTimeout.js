import React from 'react';
import { connect } from 'react-redux';
const { clearPK } = require('../store/authentication').actions;

let idleTime = 0;
let interval;
function startInterval(props) {
  //Increment the idle time counter every minute.
  interval = setInterval(async () => {
    idleTime++;
    console.log('timeout: ', idleTime);
    if (idleTime > 10) { // 20 minute timeout
      await props.clearPK();
      props.router.push('/unlock-account');
      idleTime = 0;
    }
  }, 600); // 1 minute
}

function stopInterval() {
  clearInterval(interval);
}

(function setActivityListeners() {
  console.log('setting global listeners');
  // //Zero the idle timer on mouse movement.
  document.addEventListener('mousemove', () => {
    idleTime = 0;
  }, false);
  document.addEventListener('keydown', () => {
    idleTime = 0;
  }, false);
})();

export default function(ComposedComponent) {
  class Authenticate extends React.Component {
    constructor(props) {
      super(props);
    }

    componentWillUnmount() {
      stopInterval();
    }

    componentDidMount() {
      console.log('hoc pk did mount');
      if (this.props.user) {
        startInterval(this.props);
      }
    }

    render() {
      return (<ComposedComponent {...this.props} />);
    }
  }

  const mapDispatchToProps = {
    clearPK
  };

  function mapStateToProps(state) {
    return {
      user: state.auth.user
    };
  }

  return connect(mapStateToProps, mapDispatchToProps)(Authenticate);
}
