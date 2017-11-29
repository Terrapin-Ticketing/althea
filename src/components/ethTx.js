import web3 from './Web3.js';
import EthereumTx from 'ethereumjs-tx';

const wei = 1000000000000000000;

export const createTx = async(user, address, encodedAbi, value = 0) => {
  let chainId = await web3.eth.net.getId();
  let nonce = await web3.eth.getTransactionCount(user.walletAddress);

  let gasPrice = `0x${(GAS_PRICE * 1).toString(16)}`;
  let gas = `0x${(4700000).toString(16)}`;

  let txParams = {
    nonce: nonce++,
    chainId,
    to: address,
    value,
    gas,
    gasPrice,
    data: encodedAbi
  };

  let privateKey = user.privateKey;

  const tx = new EthereumTx(txParams);
  tx.sign(new Buffer(privateKey));
  const serializedTx = tx.serialize();

  return await web3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`);
};

export const getEtherPrice = async() => {
  let etherPrice = await new Promise((resolve) => {
    resolve(30600);
  });
  return etherPrice;
};

export const usdToWei = async(usdPrice) => {
  let etherPrice = await getEtherPrice();
  // gas fee
  let weiPrice = Math.ceil((usdPrice / etherPrice) * wei);
  return weiPrice;
};

export default {
  createTx,
  getEtherPrice,
  usdToEther,
  wei
};
