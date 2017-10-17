import EthereumTx from 'ethereumjs-tx';
import ethUtils from 'ethereumjs-util';
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
        let isRedeemed = await ticketInstance.methods.isRedeemed().call();
        if (owner === user.walletAddress) {
          tickets.push({
            id: ticketInstance.options.address,
            eventId: eventInstance.options.address,
            name: web3.utils.toAscii(await eventInstance.methods.name().call()),
            price: await ticketInstance.methods.usdPrice().call(),
            isRedeemed
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
    if (!user || !user.walletAddress) return;

    let { abis, terrapinAddress } = getState().terrapin;
    let terrapinInstance = getContractInstance(abis.terrapin.abi, terrapinAddress);

    let eventAddresses = await terrapinInstance.methods.getEvents().call();

    let events = [];
    return pasync.eachSeries(eventAddresses, async (eventAddress) => {
      let eventInstance = getContractInstance(abis.event.abi, eventAddress);
      let owner = await eventInstance.methods.owner().call();
      console.log(')  owner:', owner, user.walletAddress);

      if (owner === user.walletAddress) {
        let ticketAddreses = await eventInstance.methods.getTickets().call();

        let ticketInstance = getContractInstance(abis.ticket.abi, ticketAddreses[0]);

        events.push({
          id: eventInstance.options.address,
          name: web3.utils.toAscii(await eventInstance.methods.name().call()),
          qty: ticketAddreses.length,
          price: await (ticketInstance.methods.usdPrice().call())
        });

        dispatch({
          type: SET_USER_EVENTS,
          payload: events
        });
      }
    });
  };
};

export const transferTicket = (ticketAddress, recipientAddress) => {
  return async (dispatch, getState) => {
    let privateKey = getState().auth.user;

    const { abis } = getState().terrapin;
    const ticketInstance = getContractInstance(abis.ticket.abi, ticketAddress);

    let chainId = await web3.eth.net.getId();
    let nonce = await web3.eth.getTransactionCount(getState().auth.user.walletAddress);

    let encodedAbi = ticketInstance.methods.transferTicket(recipientAddress).encodeABI();
    let txParams = {
      nonce: nonce,
      chainId: chainId,
      to: ticketAddress, // with 0x
      gas: `0x${(4700000).toString(16)}`,
      gasPrice: `0x${(4000000000).toString(16)}`,
      data: encodedAbi
    };

    const tx = new EthereumTx(txParams);
    tx.sign(new Buffer(privateKey));
    const serializedTx = tx.serialize();
    let transaction = await web3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`);
    console.log('transfered ticket: ', transaction);
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

export const redeemTicket = (data) => {
  return async (dispatch, getState) => {
    let { walletAddress, privateKey } = getState().auth.user;

    let sections = data.split('-');
    let { eventAddress, ticketAddress } = JSON.parse(sections[0]);

    console.log('WE shouldnt create the message from the given message. this allows someone to trick a user into signing a fraud message then scanning it in themselves');
    let messageHash = sections[1];

    let signedMessage = sections[2];

    // recover from ecsign
    let sigDecoded = ethUtils.fromRpcSig(signedMessage);
    let messageHashx = Buffer.from(messageHash.substring(2), 'hex');
    let pubkey = ethUtils.ecrecover(messageHashx, sigDecoded.v, sigDecoded.r, sigDecoded.s);
    let recoveredAddress = `0x${ethUtils.publicToAddress(pubkey).toString('hex')}`;

    const { abis } = getState().terrapin;
    const ticketInstance = getContractInstance(abis.ticket.abi, ticketAddress);

    let ticketOwner = await ticketInstance.methods.owner().call();
    if (ticketOwner.toLowerCase() !== recoveredAddress.toLowerCase()) {
      throw new Error('This ticket is not owned by signer');
    }

    let isRedeemed = await ticketInstance.methods.isRedeemed().call();

    console.log('isRedeemed', isRedeemed);
    if (isRedeemed) throw new Error('This ticket has already been redeemed');

    let encodedAbi = ticketInstance.methods.redeemTicket().encodeABI();
    let txParams = {
      nonce: await web3.eth.getTransactionCount(walletAddress),
      chainId: await web3.eth.net.getId(),
      to: ticketAddress, // with 0x
      gas: `0x${(4700000).toString(16)}`,
      gasPrice: `0x${(4000000000).toString(16)}`,
      value: 0,
      data: encodedAbi
    };

    const tx = new EthereumTx(txParams);
    tx.sign(new Buffer(privateKey));
    const serializedTx = tx.serialize();
    let transaction = await web3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`);
    return transaction;
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
