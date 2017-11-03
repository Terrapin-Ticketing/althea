import axios from 'axios';
import web3 from '../../../components/Web3.js';
import EthereumTx from 'ethereumjs-tx';
import pasync from 'pasync';

export const CHECKOUT = 'CHECKOUT';

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

async function getAvailableTicket(eventAddress, abis) {
  let eventInstance = getContractInstance(abis.event.abi, eventAddress);
  let eventOwner = await eventInstance.methods.owner().call();

  let ticketAddresses = await eventInstance.methods.getTickets().call();

  let isBreak = false;
  let availableTicket;
  await pasync.eachSeries(ticketAddresses, async (ticketAddress) => {
    if (isBreak) return;
    let ticketInstance = getContractInstance(abis.ticket.abi, ticketAddress);
    let ticketOwner = await ticketInstance.methods.owner().call();

    if (ticketOwner === eventOwner) {
      availableTicket = ticketInstance;

      // let newOwner = await ticketInstance.methods.owner().call();
      isBreak = true;
    }
  });
  return availableTicket;
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

    let { abis } = getState().terrapin;

    let eventInstance = getContractInstance(abis.event.abi, eventAddress);
    let eventOwner = await eventInstance.methods.owner().call();

    let ticketInstances = order.ticketInstances;
    let nonce = await web3.eth.getTransactionCount(walletAddress);
    let chainId = await web3.eth.net.getId();
    let gas = `0x${(4700000).toString(16)}`;
    let gasPrice = `0x${(gwei * 20).toString(16)}`;

    let isBreak = 0;
    let transactionsList = [];
    await pasync.eachSeries(ticketInstances, async (ticketInstance) => {
      if (isBreak >= qty) return;
      let ticketOwner = await ticketInstance.methods.owner().call();

      if (ticketOwner === eventOwner) {
        let ticketPrice = parseInt(await ticketInstance.methods.usdPrice().call()); // TODO: this will need to be modified

        let fee = Math.ceil((50 / etherPrice) * wei);

        let weiPrice = Math.ceil((ticketPrice / etherPrice) * wei) + fee;

        ticketInstance.events.Log().on('data', (data) => {
          console.log('got some data', data);
        });

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

        // let newOwner = await ticketInstance.methods.owner().call();
        nonce++;
        isBreak++;
      }
    });
    return transactionsList;
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
