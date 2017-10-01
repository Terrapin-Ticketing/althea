import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authenticate extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      console.log('auth did mount');
      let { user } = this.props;
      if (!user || _.isEmpty(user)) {
        console.log('no user');
        this.props.router.push('/login');
      }
    }

    render() {
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
