import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChartistGraph from 'react-chartist';
import Loading from '../../../components/shared/Loading';
import Price from '../../../components/shared/Price';

import './Stats.scss';

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  async componentDidMount() {
    let { event } = this.props;
    await this.props.getStats(event._id);
    document.title = `Stats - ${this.props.event.name} Event Manager - Terrapin Ticketing`;
  }

  render() {
    let { event, stats: { transfersVsBuys, transferTimeline }} = this.props;
    if (!transfersVsBuys) {
      return (
        <Loading />
      );
    }

    return (
      <div>
        {/* <div className='manager-header'>
          <h2>Quick Stats</h2>
          <div className='spacing'></div>
          <div className='order-container'>
            <button className="waves-effect waves-light btn terrapin-green">Filter</button>
          </div>
        </div> */}
        <div className='stats-content'>
          {/* <div className='quick-stats'>
            <h2>Transfers vs Buys</h2>
            <ChartistGraph data={transfersVsBuys} options={{}} type='Pie' />
          </div> */}
          <div className='timeline'>
            <h2>Secondary Market Activity</h2>
              <ChartistGraph
                data={transferTimeline}
                options={{
                  height: '500px',
                  showArea: false,
                  fullWidth: true,
                  low: 0,
                  axisY: {
                    onlyInteger: true,
                    offset: 20
                  }
                }}
                type='Line' />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  ...require('./reducer')
};

const mapStateToProps = (state) => {
  return {
    event: state.eventManager.currentEvent,
    stats: state.stats.stats,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
