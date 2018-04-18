import { connect } from 'react-redux'

import Login from '../components/Login'

const mapDispatchToProps = {
  ...require('../modules/login')
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
