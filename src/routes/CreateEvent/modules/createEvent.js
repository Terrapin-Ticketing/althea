export const CREATE_EVENT = 'CREATE_EVENT'

let getContractInstance = (abi, address) => {
  const instance = new web3.eth.Contract(abi, address);
  return instance;
};


export const createEvent = (name, qty, price) => {
  return (dispatch, getState) => {
    // TODO: Update this
    let contractInstance = getContractInstance(getState().events.abis.terrapin.abi, getState().events.terrapinAddress);
    return contractInstance.methods.getEvents().call({from: '0x5d45ab7cc622298ef32de3cca7f8dc5a45c296d5'}, (err, data) => {
    });
  }
}

export const actions = {
  createEvent
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CREATE_EVENT]  : (state, action) => {
    return {
      ...state
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
}
export default function createEventReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
