// import React from 'react';
// import { connect } from 'react-redux';
//
// export default function(ComposedComponent) {
//   class Authenticate extends React.Component {
//     componentWillMount() {
//       if (!this.props.isAuthenticated) {
//         this.context.router.push('/login');
//       }
//     }
//
//     componentWillUpdate(nextProps) {
//       if (!nextProps.isAuthenticated) {
//         this.context.router.push('/');
//       }
//     }
//
//     render() {
//       const { isAuthenticated } = this.props;
//
//       let render;
//       if (isAuthenticated) {
//         render = (
//             <ComposedComponent {...this.props} />
//         );
//       } else {
//         render = (
//           <div className=""></div>
//         );
//       }
//
//       return (render);
//     }
//   }
//
//   Authenticate.propTypes = {
//     isAuthenticated: React.PropTypes.bool.isRequired
//   };
//
//   Authenticate.contextTypes = {
//     router: React.PropTypes.object.isRequired
//   };
//
//   function mapStateToProps(state) {
//     return {
//       isAuthenticated: state.auth.isAuthenticated,
//       user: state.auth.user
//     };
//   }
//
//   return connect(mapStateToProps, {})(Authenticate);
// }
