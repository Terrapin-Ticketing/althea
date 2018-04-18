import { connect } from 'react-redux'
import Signup from '../components/Signup'

const mapDispatchToProps = {
  ...require('../modules/signup')
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
