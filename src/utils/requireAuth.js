import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authenticate extends React.Component {
    componentDidMount() {
      let { user } = this.props;
      if (!user || _.isEmpty(user) || !user.privateKey) {
        this.props.router.push('/login');
      }
    }

    componentWillReceiveProps() {
      let { user } = this.props;
      console.log('should happen', user);
      if (!user.privateKey) {
        console.log('should be gone');
        // if we lost user.privateKey, return to login
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
