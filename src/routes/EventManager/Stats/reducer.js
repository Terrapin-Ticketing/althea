import axios from 'axios';

// ------------------------------------
// Constants
// ------------------------------------
export const SET_STATS = 'SET_STATS';

export function getStats(id) {
  return async (dispatch, getState) => {
    // TODO: update route
    // let options = {
    //   url: `${SHAKEDOWN_URL}/events/find`,
    //   method: 'post',
    //   json: true,
    //   data: { query: { urlSafe: urlSafeName } },
    //   withCredentials: true
    // };
    // let { data: { events } } = await axios(options);
    let stats = {
      transfersVsBuys: {
        series: [10, 23],
        colors: ['#006666', '#009933']
      },
      transferTimeline: {
        labels: ['5/6', '5/7', '5/8', '5/9', '5/10', '5/11'],
        series: [
          [2, 10, 14, 15, 8, 5],
          [5, 8, 16, 12, 14, 5]
        ]
      }
    };


    dispatch({
      type: SET_STATS,
      payload: stats
    });
  };
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_STATS]: (state, action) => {
    return {
      ...state,
      stats: action.payload
    };
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  stats: []
};

export default function statsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
