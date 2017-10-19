import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
const { setRedirectUrl } = require('../store/location').actions;

export default function(ComposedComponent) {
  class Authenticate extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      let { user } = this.props;
      if (!user || _.isEmpty(user)) {
        this.props.setRedirectUrl(this.props.route.path);
        this.props.router.push('/login');
      }
    }

    render() {
      return (<ComposedComponent {...this.props} />);
    }
  }

  const mapDispatchToProps = {
    setRedirectUrl
  };

  function mapStateToProps(state) {
    return {
      user: state.auth.user
    };
  }

  return connect(mapStateToProps, mapDispatchToProps)(Authenticate);
}
