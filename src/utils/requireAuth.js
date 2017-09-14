import React from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authenticate extends React.Component {
    componentDidMount() {
      console.log('did mount: ', this.props.user);
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    console.log('user: ', state);
    return {
      // user: state.login.user
    };
  }

  return connect(mapStateToProps, {})(Authenticate);
}
