import React from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './AppearTransition.scss';

export default function(ComposedComponent) {
  class TransitionComponent extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {

    }

    render() {
      return (
        <ReactCSSTransitionGroup
              transitionAppear={true}
              transitionAppearTimeout={600}
              transitionEnterTimeout={600}
              transitionLeaveTimeout={200}
              transitionName="Appear"
            >
          <ComposedComponent {...this.props} />
        </ReactCSSTransitionGroup>
      );
    }
  }

  const mapDispatchToProps = { };

  function mapStateToProps(state) {
    return { };
  }

  return connect(mapStateToProps, mapDispatchToProps)(TransitionComponent);
}
