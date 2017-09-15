import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authenticate extends React.Component {
    componentDidMount() {
      let { user } = this.props;
      if (!user || _.isEmpty(user)) {
        this.props.router.push('/login');
      }
    }

    render() {
      return (<ComposedComponent {...this.props} />);
    }
  }

  function mapStateToProps(state) {
    return {
      user: state.auth.user
    };
  }

  return connect(mapStateToProps, {})(Authenticate);
}
