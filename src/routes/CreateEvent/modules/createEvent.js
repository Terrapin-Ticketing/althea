import web3 from '../../../components/Web3.js';
import EthereumTx from 'ethereumjs-tx';
import crypto from 'crypto';
import pasync from 'pasync';

export const CREATE_EVENT = 'CREATE_EVENT';

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

export const createEvent = (name, qty, price, password) => {
  return (dispatch, getState) => {
    // TODO: Update this
    let { user } = getState().auth;
    let { abis, terrapinAddress } = getState().terrapin;
    let terrapinInstance = getContractInstance(abis.terrapin.abi, terrapinAddress);
    console.log('instance Addr:', terrapinInstance.options.address);

    // estimate gas cost
    // let gasCost = terrapinInstance.methods.createEvent(name).estimateGas().then(() => {
    //   console.log('gasCost:', gasCost);
    // });

    let encodedAbi = terrapinInstance.methods.createEvent(web3.utils.fromAscii(name)).encodeABI();

    let txParams = {
      nonce: null,
      chainId: null,
      to: terrapinInstance.options.address,
      value: 0,
      gas: `0x${(4700000).toString(16)}`,
      gasPrice: `0x${(4000000000).toString(16)}`,
      data: encodedAbi
    };

    // terrapinInstance.events.EventCreated({}, (err, data) => {
    //   if (err) return console.log('EventCreated ERROR:', err);
    //   console.log('event triggred', data);
    // });

    // return terrapinInstance.methods.createEvent(name).estimateGas()
    //   .then((data) => {
    //     console.log('gas:', data);
    //   })
    //   .then(() => )

    return web3.eth.getTransactionCount(user.walletAddress)
      .then((count) => txParams.nonce = `0x${count.toString(16)}`)
      .then(() => web3.eth.net.getId())
      .then((id) => txParams.chainId = id)
      .then(() => {
        console.log(txParams);

        let privateKey = decryptPrivateKey(password, user.encryptedPrivateKey).substring(2);

        privateKey = Buffer.from(privateKey, 'hex');


        const tx = new EthereumTx(txParams);
        tx.sign(new Buffer(privateKey));

        const serializedTx = tx.serialize();

        console.log('CREATING EVent!!!');

        return web3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`)
          .then((data) => {
            console.log('returnedf rom signing!!!!');
            // event listen

            // let { abis, terrapinAddress } = getState().events;
            // let terrapinInstance = getContractInstance(abis.terrapin.abi, terrapinAddress);

            // qty, price,

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
};
export default function createEventReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
