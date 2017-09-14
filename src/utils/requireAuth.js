import React from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authenticate extends React.Component {
    componentDidMount() {
      if (!this.props.user) {

      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      user: state.login.user
    };
  }

  return connect(mapStateToProps, {})(Authenticate);
}
