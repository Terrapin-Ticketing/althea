import React from 'react';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.props.getContractInfo();
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <div style={{ height: '100%' }}>
          <Router history={browserHistory} children={this.props.routes} />
        </div>
      </Provider>
    );
  }
}

const getContractInfo = () => {
  return async(dispatch, getState) => {
    console.log('herer');
    let res;
    try {
      res = await axios.get(`${EOTW_URL}/terrapin-station`);
    } catch (e) {
      console.log('err', e);
    }
    console.log('eredd');
    dispatch({
      type: 'SET_CONTRACT_INFO',
      payload: res.data
    });
  };
};

const mapDispatchToProps = {
  getContractInfo
};

const mapStateToProps = (state) => {
  return {
    test: {}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
