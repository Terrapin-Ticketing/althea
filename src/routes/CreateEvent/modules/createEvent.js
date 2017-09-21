import web3 from '../../../components/Web3.js';
import EthereumTx from 'ethereumjs-tx';
import crypto from 'crypto';
import pasync from 'pasync';

export const CREATE_EVENT = 'CREATE_EVENT';

let gwei = 1000000000;

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
  return async function(dispatch, getState) {
    // TODO: Update this
    let { user } = getState().auth;
    let { abis, terrapinAddress } = getState().terrapin;
    let terrapinInstance = getContractInstance(abis.terrapin.abi, terrapinAddress);
    console.log('instance Addr:', terrapinInstance.options.address);

    let chainId = await web3.eth.net.getId();
    let nonce = await web3.eth.getTransactionCount(user.walletAddress);

    let gasPrice = `0x${(gwei * 2000).toString(16)}`;
    // let gasPrice = gwei * 30;
    let gas = `0x${(470000).toString(16)}`;

    console.log('Total Gas Cost:', web3.utils.fromWei(gasPrice * gas, 'ether'));

    let encodedAbi = terrapinInstance.methods.createEvent(web3.utils.fromAscii(name)).encodeABI();

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

    let privateKey = decryptPrivateKey(password, user.encryptedPrivateKey).substring(2);

    privateKey = Buffer.from(privateKey, 'hex');

    const tx = new EthereumTx(txParams);
    tx.sign(new Buffer(privateKey));

    const serializedTx = tx.serialize();

    // terrapinInstance.events.EventCreated({}, function(err, data) {
    //   if (err) return console.log('EventCreated ERROR:', err);
    //   console.log('event recieved');
    //   let eventAddress = data.returnValues[0];
    //   let eventInstance = getContractInstance(abis.event.abi, eventAddress);
    //
    //   // make transactions
    //
    //   let privateKey = decryptPrivateKey(password, user.encryptedPrivateKey).substring(2);
    //   privateKey = Buffer.from(privateKey, 'hex');
    //
    //   console.log('sending ticket creation tx:');
    //
    //   // let batch = new web3.BatchRequest();
    //   console.log(Array(qty).fill(1), qty);
    //   pasync.eachSeries(Array(qty).fill(1), () => {
    //     let txParams = {
    //       nonce: `0x${nonceBase10.toString(16)}`,
    //       chainId,
    //       to: eventInstance.options.address,
    //       value: 0,
    //       gas,
    //       gasPrice,
    //       data: eventInstance.methods.printTicket(price).encodeABI()
    //     };
    //
    //     console.log('TX: ', txParams);
    //
    //     nonceBase10++;
    //
    //     const tx = new EthereumTx(txParams);
    //     tx.sign(new Buffer(privateKey));
    //
    //     const serializedTx = tx.serialize();
    //
    //     return web3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`)
    //       .then((data) => {
    //         console.log('returned ticket', data);
    //       });
    //   });
    //
    // });

    let data = await web3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`);

    console.log('Event Created');

    // get event address
    let eventAddresses = await terrapinInstance.methods.getEvents().call();

    console.log('eventAddresses', eventAddresses);

    let mostRecent;
    return pasync.eachSeries(eventAddresses, async (eventAddress) => {
      console.log('in here');
      let eventInstance = getContractInstance(abis.event.abi, eventAddress);
      let owner = await eventInstance.methods.owner().call();
      if (owner === user.walletAddress) {
        mostRecent = eventInstance;
      }
    })
    .then(async () => {
      if (mostRecent) {
        let N = qty;
        let nonceInterval = Array.apply(null, {length: N}).map(Number.call, Number);

        return pasync.each(nonceInterval, async (i) => {
          let encodedAbi = mostRecent.methods.printTicket(parseInt(price)).encodeABI();

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
          console.log('made ticket', x);
        });
      }
    });


    // console.log('data', data);

    // eth.getTransaction("0xfcbf47472733c0922552aa617fc7cb1226c346edc022fbe09ea521dfb75f7699")

    // console.log('CREATING EVent!!!');
    // return new Promise((resolve, reject) => {
    //   web3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`)
    //     .on('transactionHash', async function(hash) {
    //       console.log('transactionHash', hash);
    //       let x = await web3.eth.getTransaction(hash);
    //       console.log('transaction:', x);
    //     })
    //     .on('receipt', function(receipt) {
    //       console.log('receipt', receipt);
    //     })
    //     .on('confirmation', function(confirmationNumber, receipt) {
    //       console.log('confirmation', confirmationNumber, receipt);
    //     })
    //     .on('error', (err) => {
    //       console.log('ERROR: ', err);
    //       reject(err);
    //     }); // If a out of gas error, the second parameter is the receipt.;
    // });
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
