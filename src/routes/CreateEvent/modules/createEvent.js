import web3 from '../../../components/Web3.js';
import ethTx from '../../../components/ethTx.js';
import moment from 'moment';

export const CREATE_EVENT = 'CREATE_EVENT';

let getContractInstance = (abi, address) => {
  const instance = new web3.eth.Contract(abi, address);
  return instance;
};

export const createEvent = (name, usdPrice, imageUrl, date, venueName, venueAddress, venueCity, venueState, venueZip, qty) => {
  return async function(dispatch, getState) {
    let { user } = getState().auth;
    let { abis, terrapinAddress } = getState().terrapin;
    let terrapinInstance = getContractInstance(abis.terrapin.abi, terrapinAddress);
    // console.log(moment(date).unix());
    // TODO: set up date
    let startDate = moment().unix();
    let endDate = moment().add(1, 'days').unix();

    let encodedAbi = terrapinInstance.methods.createEvent(
      web3.utils.fromAscii(name),
      qty,
      usdPrice,
      startDate,
      endDate
    ).encodeABI();

    let address = terrapinInstance.options.address;
    await ethTx.createTx(user, address, encodedAbi);
    dispatch({
      type: CREATE_EVENT,
      payload: ''
    });
  };
};

export const actions = {
  createEvent
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CREATE_EVENT]: (state, action) => {
    return {
      ...state
    };
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
};
export default function createEventReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
