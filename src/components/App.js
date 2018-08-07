import React from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'

class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <div style={{ flex: 1, display: 'flex', background: 'linear-gradient(150deg, #f9f9f9 10%, #fff 100%)' }}>
          <Router history={browserHistory} children={this.props.routes} /> {/* eslint react/no-children-prop: 1 */}
        </div>
      </Provider>
    )
  }
}

export default App
