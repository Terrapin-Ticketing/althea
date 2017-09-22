import EthereumTx from 'ethereumjs-tx';
import crypto from 'crypto';
import web3 from '../../../components/Web3.js'

export const GET_USER_INFO = 'GET_USER_INFO'
export const SET_USER_EVENTS = 'SET_USER_EVENTS'
export const SET_USER_TICKETS = 'SET_USER_TICKETS'
export const GET_USER_TICKETS = 'GET_USER_TICKETS'
export const GET_USER_EVENTS = 'GET_USER_EVENTS'

let getContractInstance = (abi, address) => {
  const instance = new web3.eth.Contract(abi, address);
  return instance;
};

let decryptPrivateKey = (key, ciphered) => {
  let algorithm = 'aes256';
  let inputEncoding = 'utf8';
  let outputEncoding = 'hex';

  let decipher = crypto.createDecipher(algorithm, key);
  let deciphered = decipher.update(ciphered, outputEncoding, inputEncoding);
  deciphered += decipher.final(inputEncoding);
  return deciphered;
};

export const getUserTickets = () => {
  const tickets = [{ id: "0x712982674F171933e0bcad11D6eEc6f3eE782A90", eventId: "0x712982674F171933e0bcad11D6eEc6f3eE782A90", name: "The String Cheese Incident", price: "100" },
  { id: "0x712982674F171933e0bcad11D6eEc6f3eE782A91", eventId: "0x712982674F171933e0bcad11D6eEc6f3eE782A90", name: "Phish", price: "100" },
  { id: "0x712982674F171933e0bcad11D6eEc6f3eE782A92", eventId: "0x712982674F171933e0bcad11D6eEc6f3eE782A90", name: "Widespread Panic", price: "100" },
  { id: "0x712982674F171933e0bcad11D6eEc6f3eE782A93", eventId: "0x712982674F171933e0bcad11D6eEc6f3eE782A90", name: "Greensky Bluegrass", price: "100" }];
  return (dispatch, getState) => {
    dispatch({
      type: SET_USER_TICKETS,
      payload: tickets
    });
  };
};

export const getUserEvents = () => {
  const events = [{ id: "0x712982674F171933e0bcad11D6eEc6f3eE782A90", name: "The String Cheese Incident", qty: 7, price: "100" },
  { id: "0x712982674F171933e0bcad11D6eEc6f3eE782A91", name: "Phish", qty: 7, price: "100" },
  { id: "0x712982674F171933e0bcad11D6eEc6f3eE782A92", name: "Widespread Panic", qty: 7, price: "100" },
  { id: "0x712982674F171933e0bcad11D6eEc6f3eE782A93", name: "Greensky Bluegrass", qty: 7, price: "100" }];
  return (dispatch, getState) => {
    console.log('events: ', events);
    dispatch({
      type: SET_USER_EVENTS,
      payload: events
    });
  };
};

export const transferTicket = (ticketAddress, recipientAddress, password) => {
  return async (dispatch, getState) => {
    let privateKey = decryptPrivateKey(password, getState().auth.user.encryptedPrivateKey).substring(2);
    privateKey = Buffer.from(privateKey, 'hex');

    const { abis } = getState().terrapin;
    const ticketInstance = getContractInstance(abis.ticket.abi, ticketAddress);

    let chainId = await web3.eth.net.getId();
    let nonce = await web3.eth.getTransactionCount(getState().auth.user.walletAddress);

    let encodedAbi = ticketInstance.methods.transferTicket(`0x${recipientAddress}`).encodedAbi();
    let txParams = {
      nonce: nonce,
      chainId: chainId,
      to: `0x${recipientAddress}`,
      gas: `0x${(4700000).toString(16)}`,
      gasPrice: `0x${(4000000000).toString(16)}`,
      data: encodedAbi
    };

    const tx = new EthereumTx(txParams);
    tx.sign(new Buffer(privateKey));
    const serializedTx = tx.serialize();
    let transaction = await web3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`);
    console.log('transfered: ', transaction);
  };
}

export const getUserBalance = (privateKey) => {
  return (dispatch, getState) => {
    web3.eth.getBalance(getState().auth.user.walletAddress)
      .then((balance) => {
        dispatch({
          type: 'SET_USER_BALANCE',
          payload: balance
        });
      });
  }
}

export const actions = {
  // getUserTickets,
  getUserEvents,
  getUserBalance,
  transferTicket
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_USER_INFO]  : (state, action) => {
    return {
      ...state
    }
  },
  [SET_USER_TICKETS]: (state, action) => {
    return {
      ...state,
      tickets: action.payload
    }
  },
  [SET_USER_EVENTS]  : (state, action) => {
    return {
      ...state,
      events: action.payload
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function loginReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
