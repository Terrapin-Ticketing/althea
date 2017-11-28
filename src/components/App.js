import React from 'react';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {StripeProvider} from 'react-stripe-elements';

const { getContractInfo } = require('../store/terrapin').actions;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
  }

  async componentDidMount() {
    await this.props.getContractInfo();
    this.setState({ isLoading: false });
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <StripeProvider apiKey={STRIPE_PUBLIC_KEY}>
          { this.state.isLoading ? <span>isLoading</span> : (
            <div style={{ height: '100%' }}>
              <Router history={browserHistory} children={this.props.routes} />
            </div>
          )}
        </StripeProvider>
      </Provider>
    );
  }
}

const mapDispatchToProps = {
  getContractInfo
};

const mapStateToProps = (state) => {
  return {
    test: {}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
