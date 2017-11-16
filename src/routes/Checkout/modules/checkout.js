import axios from 'axios';
import web3 from '../../../components/Web3.js';
import EthereumTx from 'ethereumjs-tx';
import pasync from 'pasync';

export const CHECKOUT = 'CHECKOUT';
export const SET_TX_LIST = 'SET_TX_LIST';

const gwei = 1000000000;
const wei = 1000000000000000000;

let getContractInstance = (abi, address) => {
  const instance = new web3.eth.Contract(abi, address);
  return instance;
};

async function requestEtherPrice() {
  let etherPrice = await new Promise((resolve) => {
    resolve(30600);
  });
  return etherPrice;
}

export function getEtherPrice() {
  return async (dispatch, getState) => {
    // let res = JSON.parse(await axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR'));
    // console.log('ETHER PRICE:', res.USD, res);
    // dispatch({
    //   type: 'none',
    //   payload: []
    // });
    return await requestEtherPrice();
  };
}

export function checkout(something) {
  return async (dispatch, getState) => {
  };
}

export const buyTicketsWithEther = (order) => {
  return async (dispatch, getState) => {
    let { ticketQty: qty, eventAddress } = order;

    let etherPrice = await requestEtherPrice();

    let { walletAddress } = getState().auth.user;

    let { privateKey } = getState().auth.user;

    // let { abis } = getState().terrapin;

    // let eventInstance = getContractInstance(abis.event.abi, eventAddress);
    // let eventOwner = await eventInstance.methods.owner().call();

    let ticketInstances = order.ticketInstances;
    let nonce = await web3.eth.getTransactionCount(walletAddress);
    let chainId = await web3.eth.net.getId();
    let gas = `0x${(4700000).toString(16)}`;
    let gasPrice = `0x${(GAS_PRICE).toString(16)}`;

    let isBreak = 0;
    let transactionsList = [];
    await pasync.eachSeries(ticketInstances, async (ticketInstance) => {
      if (isBreak >= qty) return;
      // let ticketOwner = await ticketInstance.methods.owner().call();

      let isForSale = await ticketInstance.methods.isForSale().call();

      if (isForSale) {
        let ticketPrice = parseInt(await ticketInstance.methods.usdPrice().call()); // TODO: this will need to be modified

        let fee = Math.ceil((5000 / etherPrice) * wei);

        let weiPrice = Math.ceil((ticketPrice / etherPrice) * wei) + fee;

        ticketInstance.events.Log().on('data', (data) => {
          console.log('got some data', data);
        });

        console.log('ticket:', ticketInstance.options.address);
        console.log('orig owner:', await ticketInstance.methods.owner().call());

        let encodedAbi = ticketInstance.methods.buyTicket().encodeABI();
        let txParams = {
          nonce,
          chainId,
          to: ticketInstance.options.address,
          value: weiPrice,
          gas,
          gasPrice,
          data: encodedAbi
        };

        let tx = new EthereumTx(txParams);
        tx.sign(new Buffer(privateKey));
        let serializedTx = tx.serialize();

        let transasction = await web3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`);
        transactionsList.push(transasction);

        console.log('new owner:', await ticketInstance.methods.owner().call());
        nonce++;
        isBreak++;
      }
    });

    dispatch({
      type: SET_TX_LIST,
      payload: transactionsList
    });

    return true;
  };
};

export const buyTicketsStripe = (token, order) => {
  return async (dispatch, getState) => {
    let { walletAddress } = getState().auth.user;
    let { abis } = getState().terrapin;

    // let ticketInstance = await getAvailableTicket(eventAddress, abis);
    let ticketInstances = order.ticketInstances;

    let res = await axios.post(`${EOTW_URL}/buy-ticket`, {
      token,
      fees: 150, // should be calculated later
      ticketAddresses: ticketInstances.map((instance) => instance.options.address),
      walletAddress
    });

    dispatch({
      type: SET_TX_LIST,
      payload: res.data
    });

    return res.data;
  };
};

export const actions = {
  checkout,
  getEtherPrice,
  buyTicketsWithEther
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CHECKOUT]: (state, action) => {
    return {
      ...state
    };
  },
  [SET_TX_LIST]: (state, action) => {
    return {
      ...state,
      txList: action.payload
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
