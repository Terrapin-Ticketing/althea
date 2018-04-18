import { connect } from 'react-redux'

import Events from '../components/Events'

const mapDispatchToProps = {
  ...require('../modules/events')
}

const mapStateToProps = (state) => {
  return {
    events: state.events.events,
    user: state.auth.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)
