import EthereumTx from 'ethereumjs-tx';
import crypto from 'crypto';
import web3 from '../../../components/Web3.js';
import pasync from 'pasync';

export const GET_USER_INFO = 'GET_USER_INFO';
export const SET_USER_EVENTS = 'SET_USER_EVENTS';
export const SET_USER_TICKETS = 'SET_USER_TICKETS';
export const GET_USER_TICKETS = 'GET_USER_TICKETS';
export const GET_USER_EVENTS = 'GET_USER_EVENTS';

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
  return async (dispatch, getState) => {
    let { user } = getState().auth;

    let { abis, terrapinAddress } = getState().terrapin;
    let terrapinInstance = getContractInstance(abis.terrapin.abi, terrapinAddress);

    let eventAddresses = await terrapinInstance.methods.getEvents().call();

    let tickets = [];
    return pasync.eachSeries(eventAddresses, async (eventAddress) => {
      let eventInstance = getContractInstance(abis.event.abi, eventAddress);
      let ticketAddreses = await eventInstance.methods.getTickets().call();

      return pasync.eachSeries(ticketAddreses, async (ticketAddress) => {
        let ticketInstance = getContractInstance(abis.ticket.abi, ticketAddress);
        let owner = await ticketInstance.methods.owner().call();
        if (owner === user.walletAddress) {
          tickets.push({
            id: ticketInstance.options.address,
            eventId: eventInstance.options.address,
            name: web3.utils.toAscii(await eventInstance.methods.name().call()),
            price: await ticketInstance.methods.price().call(),
          });

          dispatch({
            type: SET_USER_TICKETS,
            payload: tickets
          });
        }
      });
    });
  };
};

export const getUserEvents = () => {
  return async (dispatch, getState) => {
    let { user } = getState().auth;

    let { abis, terrapinAddress } = getState().terrapin;
    let terrapinInstance = getContractInstance(abis.terrapin.abi, terrapinAddress);

    let eventAddresses = await terrapinInstance.methods.getEvents().call();

    let events = [];
    return pasync.eachSeries(eventAddresses, async (eventAddress) => {
      let eventInstance = getContractInstance(abis.event.abi, eventAddress);
      let owner = await eventInstance.methods.owner().call();
      if (owner === user.walletAddress) {
        let ticketAddreses = await eventInstance.methods.getTickets().call();

        let ticketInstance = getContractInstance(abis.ticket.abi, ticketAddreses[0]);

        events.push({
          id: eventInstance.options.address,
          name: web3.utils.toAscii(await eventInstance.methods.name().call()),
          qty: ticketAddreses.length,
          price: await (ticketInstance.methods.price().call())
        });

        dispatch({
          type: SET_USER_EVENTS,
          payload: events
        });
      }
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
};

export const getUserBalance = () => {
  return (dispatch, getState) => {
    web3.eth.getBalance(getState().auth.user.walletAddress)
      .then((balance) => {
        dispatch({
          type: 'SET_USER_BALANCE',
          payload: balance
        });
      });
  };
};

export const createQrCode = (eventAddress, ticketAddress, password) => {
  return (dispatch, getState) => {
    let { encryptedPrivateKey } = getState().auth.user;
    let privateKey = decryptPrivateKey(password, encryptedPrivateKey).substring(2);
    privateKey = Buffer.from(privateKey, 'hex');

    console.log(eventAddress, ticketAddress, password);

    // `${eventAddress}${ticketAddress}`
    // signed(`${eventAddress}${ticketAddress}`)

    // does this public key own a ticket to this event!?
    // await eventInstance.methods.getTickets().call()
    // find if this person owns a ticket
    // set ticket to "redeemed"
  };
};

// export const actions = {
//   // getUserTickets,
//   getUserEvents,
//   getUserBalance,
//   transferTicket
// };

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_USER_INFO]: (state, action) => {
    return {
      ...state
    };
  },
  [SET_USER_TICKETS]: (state, action) => {
    return {
      ...state,
      tickets: action.payload
    };
  },
  [SET_USER_EVENTS]: (state, action) => {
    return {
      ...state,
      events: action.payload
    };
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {};
export default function loginReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
