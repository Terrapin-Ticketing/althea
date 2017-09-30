import React from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import axios from 'axios'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.props.getContractInfo();
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <div style={{ height: '100%' }}>
          <Router history={browserHistory} children={this.props.routes} />
        </div>
      </Provider>
    )
  }
}

const getContractInfo = () => {
  return (dispatch, getState) => {
    return axios.get(`${TERRAPIN_URL}/terrapin-station`)
    .then((res) => {
      dispatch({
        type: 'SET_CONTRACT_INFO',
        payload: res.data
      });
    });
  }
};

const mapDispatchToProps = {
  getContractInfo
}

const mapStateToProps = (state) => {
  return {
    test: {}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
