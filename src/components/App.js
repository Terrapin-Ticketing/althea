import React from 'react';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {StripeProvider} from 'react-stripe-elements';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
  }


  render() {
    return (
      <Provider store={this.props.store}>
        <StripeProvider apiKey={STRIPE_PUBLIC_KEY}>
            <div style={{ height: '100%' }}>
              <Router history={browserHistory} children={this.props.routes} />
            </div>
        </StripeProvider>
      </Provider>
    );
  }
}

const mapDispatchToProps = {
};

const mapStateToProps = (state) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
