import web3 from './Web3.js';
import EthereumTx from 'ethereumjs-tx';

export default async (user, encodedAbi, address) => {
  let chainId = await web3.eth.net.getId();
  let nonce = await web3.eth.getTransactionCount(user.walletAddress);

  let gasPrice = `0x${(GAS_PRICE * 1).toString(16)}`;
  let gas = `0x${(4700000).toString(16)}`;

  let txParams = {
    nonce: nonce++,
    chainId,
    to: address,
    value: 0,
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
