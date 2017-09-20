import web3 from '../../../components/Web3.js';
import EthereumTx from 'ethereumjs-tx';
import crypto from 'crypto';

export const CREATE_EVENT = 'CREATE_EVENT'

let getContractInstance = (abi, address) => {
  const instance = new web3.eth.Contract(abi, address);
  return instance;
};

let dcryptPrivateKey = (key, ciphered) => {
  let algorithm = 'aes256';
  let inputEncoding = 'utf8';
  let outputEncoding = 'hex';

  let decipher = crypto.createDecipher(algorithm, key);
  let deciphered = decipher.update(ciphered, outputEncoding, inputEncoding);
  deciphered += decipher.final(inputEncoding);
  return deciphered;
};

export const createEvent = (name, qty, price, password) => {
  return (dispatch, getState) => {
    // TODO: Update this
    let { user } = getState().auth;

    let { abis, terrapinAddress } = getState().terrapin.terrapin;
    let terrapinInstance = getContractInstance(abis.terrapin.abi, terrapinAddress);


    // estimate gas cost
    // let gasCost = terrapinInstance.methods.createEvent(name).estimateGas();

    let encodedAbi = terrapinInstance.methods.createEvent(web3.utils.fromAscii(name)).encodeABI();

    let txParams = {
      nonce: null,
      chainId: null,
      // to: terrapinInstance.options.address,
      to: terrapinInstance.options.address,
      // to: '0xa546087dbb5f03a47b19781e71f19916bf963ae9',
      value: 0,
      // value: (gasCost).toString(16),
      gas: 4700000,
      data: encodedAbi
    };

    return web3.eth.getTransactionCount(user.walletAddress)
      .then((count) => txParams.nonce = count)
      .then(() => web3.eth.net.getId())
      .then((id) => txParams.chainId = id)
      .then(() => {
        // prompt for private key

        let privateKey = dcryptPrivateKey(password, user.encryptedPrivateKey).substring(2);

        privateKey = Buffer.from(privateKey, 'hex');


        const tx = new EthereumTx(txParams);
        tx.sign(new Buffer(privateKey));

        const serializedTx = tx.serialize();

        return web3.eth.sendSignedTransaction(serializedTx.toString('hex'))
          .then((data) => {
            console.log('data: ', data);
          });
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
}
export default function createEventReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
