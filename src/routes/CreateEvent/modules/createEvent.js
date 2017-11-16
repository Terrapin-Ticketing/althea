import web3 from '../../../components/Web3.js';
import EthereumTx from 'ethereumjs-tx';
import pasync from 'pasync';

export const CREATE_EVENT = 'CREATE_EVENT';

let gwei = 1000000000;

let getContractInstance = (abi, address) => {
  const instance = new web3.eth.Contract(abi, address);
  return instance;
};

export const createEvent = (name, usdPrice, imageUrl, date, venueName, venueAddress, venueCity, venueState, venueZip, qty) => {
  return async function(dispatch, getState) {
    // TODO: Update this
    let { user } = getState().auth;
    let { abis, terrapinAddress } = getState().terrapin;
    let terrapinInstance = getContractInstance(abis.terrapin.abi, terrapinAddress);

    let chainId = await web3.eth.net.getId();
    let nonce = await web3.eth.getTransactionCount(user.walletAddress);

    let gasPrice = `0x${(GAS_PRICE).toString(16)}`;
    // let gasPrice = gwei * 30;
    let gas = `0x${(4700000).toString(16)}`;

    // let values = [ name, usdPrice, imageUrl, date, venueName, venueAddress, venueCity, venueState, venueZip ].map(web3.utils.fromAscii);
    let values = [ name, usdPrice, date ].map(web3.utils.fromAscii);
    let encodedAbi = terrapinInstance.methods.createEvent(...values).encodeABI();

    let txParams = {
      nonce: nonce++,
      chainId,
      to: terrapinInstance.options.address,
      value: 0,
      gas,
      gasPrice,
      data: encodedAbi
    };

    // nonce++;

    let privateKey = user.privateKey;

    const tx = new EthereumTx(txParams);
    tx.sign(new Buffer(privateKey));
    const serializedTx = tx.serialize();

    let data = await web3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`);

    // get event address
    let eventAddresses = await terrapinInstance.methods.getEvents().call();
    let mostRecent;
    await pasync.eachSeries(eventAddresses, async (eventAddress) => {
      let eventInstance = getContractInstance(abis.event.abi, eventAddress);
      let owner = await eventInstance.methods.owner().call();
      if (owner === user.walletAddress) {
        mostRecent = eventInstance;
      }
    });

    if (mostRecent) {
      let N = qty;
      let nonceInterval = Array.apply(null, {length: N}).map(Number.call, Number);

      return pasync.each(nonceInterval, async (i) => {
        let encodedAbi = mostRecent.methods.printTicket(parseInt(usdPrice)).encodeABI();

        let txParams = {
          nonce: nonce + i,
          chainId,
          to: mostRecent.options.address,
          value: 0,
          gas,
          gasPrice,
          data: encodedAbi
        };

        const tx = new EthereumTx(txParams);
        tx.sign(new Buffer(privateKey));

        const serializedTx = tx.serialize();
        let x = await web3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`);
      });
    }
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
