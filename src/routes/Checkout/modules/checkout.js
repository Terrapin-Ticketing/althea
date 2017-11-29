import axios from 'axios';
import web3 from '../../../components/Web3.js';
import ethTx from '../../../components/ethTx.js';

export const CHECKOUT = 'CHECKOUT';
export const SET_TX_LIST = 'SET_TX_LIST';


let getContractInstance = (abi, address) => {
  const instance = new web3.eth.Contract(abi, address);
  return instance;
};

export function getEtherPrice() {
  return async (dispatch, getState) => {
    // let res = JSON.parse(await axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR'));
    // console.log('ETHER PRICE:', res.USD, res);
    // dispatch({
    //   type: 'none',
    //   payload: []
    // });
    return await ethTx.getEtherPrice();
  };
}

export function priceToEther(usdPrice) {
  return async (dispatch, getState) => {
    let weiPrice = await ethTx.usdToWei(usdPrice);
    console.log('weiPrice', weiPrice);
    // TODO: current place
    // return amount of ether needed


    return weiPrice;
  };
}

export function checkout(something) {
  return async (dispatch, getState) => {
  };
}

export const buyTicketsWithEther = (order) => {
  return async (dispatch, getState) => {
    let { ticketQty: qty, eventAddress } = order;

    let { user } = getState().auth;

    let { walletAddress: payToAddress, abis } = getState().terrapin;
    // let eventInstance = getContractInstance(abis.event.abi, eventAddress);
    // let usdPrice = await eventInstance.methods.getTicketPrice(web3.utils.fromAscii('GA')).call();

    // amount of ether to send in tx
    console.log('order.total', order.total);

    let value = await ethTx.usdToWei(order.total);
    console.log('wei:', value);

    let tx = await ethTx.createTx(user, payToAddress, null, value);
    console.log(tx);

    // wait until this goes through

    // let res = await axios.post(`${EOTW_URL}/buy-ticket`, {
    //   token: null,
    //   fees: 150, // should be calculated later
    //   qty: order.ticketQty,
    //   eventAddress: order.eventAddress,
    //   walletAddress,
    //   paymentType: 'USD'
    // });

    // let ticketInstances = order.ticketInstances;
    // let nonce = await web3.eth.getTransactionCount(walletAddress);
    // let chainId = await web3.eth.net.getId();
    // let gas = `0x${(4700000).toString(16)}`;
    // let gasPrice = `0x${(GAS_PRICE * 1).toString(16)}`;
    //
    // let isBreak = 0;
    // let transactionsList = [];

    // await pasync.eachSeries(ticketInstances, async (ticketInstance) => {
    //   if (isBreak >= qty) return;
    //   // let ticketOwner = await ticketInstance.methods.owner().call();
    //
    //   let isForSale = await ticketInstance.methods.isForSale().call();
    //
    //   if (isForSale) {
    //     let ticketPrice = parseInt(await ticketInstance.methods.usdPrice().call()); // TODO: this will need to be modified
    //
    //     let fee = Math.ceil((5000 / etherPrice) * wei);
    //
    //     let weiPrice = Math.ceil((ticketPrice / etherPrice) * wei) + fee;
    //
    //     ticketInstance.events.Log().on('data', (data) => {
    //       console.log('LOGS ARE WORKING!!! Tell Michael', data);
    //     });
    //
    //     console.log('ticket:', ticketInstance.options.address);
    //     console.log('orig owner:', await ticketInstance.methods.owner().call());
    //
    //     let encodedAbi = ticketInstance.methods.buyTicket().encodeABI();
    //     let txParams = {
    //       nonce,
    //       chainId,
    //       to: ticketInstance.options.address,
    //       value: weiPrice,
    //       gas,
    //       gasPrice,
    //       data: encodedAbi
    //     };
    //
    //     let tx = new EthereumTx(txParams);
    //     tx.sign(new Buffer(privateKey));
    //     let serializedTx = tx.serialize();
    //
    //     let transasction = await web3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`);
    //     transactionsList.push(transasction);
    //
    //     console.log('new owner:', await ticketInstance.methods.owner().call());
    //     nonce++;
    //     isBreak++;
    //   }
    // });

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

    console.log(order);

    let res = await axios.post(`${EOTW_URL}/buy-ticket`, {
      token,
      fees: 150, // should be calculated later
      qty: order.ticketQty,
      eventAddress: order.eventAddress,
      walletAddress,
      paymentType: 'USD'
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
