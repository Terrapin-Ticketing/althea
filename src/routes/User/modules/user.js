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
        let isRedeemed = await ticketInstance.methods.isRedeemed().call();
        if (owner === user.walletAddress) {
          tickets.push({
            id: ticketInstance.options.address,
            eventId: eventInstance.options.address,
            name: web3.utils.toAscii(await eventInstance.methods.name().call()),
            price: await ticketInstance.methods.price().call(),
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

export const redeemTicket = (password, data) => {
  return async (dispatch, getState) => {
    let { walletAddress, privateKey } = getState().auth.user;

    let sections = data.split('-');
    let { eventAddress, ticketAddress } = JSON.parse(sections[0]);
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

export const createQrCode = (eventAddress, ticketAddress, password) => {
  return (dispatch, getState) => {
    // let { encryptedPrivateKey } = getState().auth.user;
    // let privateKey = decryptPrivateKey(password, encryptedPrivateKey).substring(2);
    // let privateKeyx = Buffer.from(privateKey, 'hex');
    //
    // let message = `${eventAddress}${ticketAddress}`; // message to sign
    //
    // // ecsign requires a sha3 string
    // let messageHash = web3.utils.sha3(message);
    // let messageHashx = Buffer.from(messageHash.substring(2), 'hex');
    // let signedMessage = ethUtils.ecsign(messageHashx, privateKeyx);
    // let signedHash = ethUtils.toRpcSig(signedMessage.v, signedMessage.r, signedMessage.s).toString('hex');
    //
    // // QR CODE:
    // // [
    // //   message, // store raw values
    // //   messageHashx, // ecrecover
    // //   signedHash // rpcSig
    // // ]
    //
    // let qrCodeHex = `${message}-0x${messageHashx.toString('hex')}-${signedHash}`;
    //
    // console.log('qrCodeHex', qrCodeHex);
    //
    // return qrCodeHex;

    // // recover from ecsign
    // let sigDecoded = ethUtils.fromRpcSig(signedHash);
    // let pubkey = ethUtils.ecrecover(messageHashx, sigDecoded.v, sigDecoded.r, sigDecoded.s);
    // let walletAddress = ethUtils.publicToAddress(pubkey).toString('hex');
    // console.log('walletAddress: ', walletAddress);

    // var check1 = pubkey.toString('hex') ==
    //     ethUtils.privateToPublic(privkey).toString('hex');
    // var check2 = ethUtils.publicToAddress(pubkey).toString('hex') ==
    //     ethUtils.privateToAddress(privkey).toString('hex');
    //
    // ethUtils.ecrecover(data, vrs.v, vrs.r, vrs.s);
    //
    // console.log(eventAddress, ticketAddress, password);

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
