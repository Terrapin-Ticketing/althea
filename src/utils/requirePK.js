import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authenticate extends React.Component {
    constructor(props) {
      super(props);
    }

    componentWillMount() {
      let { user } = this.props;
      if (!user || _.isEmpty(user) || !user.privateKey) {
        this.props.router.push('/unlock-account');
      }
    }

    render() {
      console.log('requirePK props: ', this.props);
      return (<ComposedComponent {...this.props} />);
    }
  }

  const mapDispatchToProps = {
  };

  function mapStateToProps(state) {
    return {
      user: state.auth.user
    };
  }

  return connect(mapStateToProps, mapDispatchToProps)(Authenticate);
}
