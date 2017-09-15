import React from 'react';
import EthereumTx from 'ethereumjs-tx';
import web3 from '../../../components/Web3.js';

// let encodedAbi = ticketInstance.methods.buyTicket().encodeABI();
//
// let txParams = {
//   nonce: null,
//   chainId: null,
//   to: ticketInstance.options.address,
//   value: (price).toString(16),
//   gas: 4700000,
//   data: encodedAbi
// };
//
// console.log(ticketInstance.options.address);
//
// return web3.eth.getTransactionCount(walletAddress)
//   .then((count) => txParams.nonce = count)
//   .then(() => web3.eth.net.getId())
//   .then((id) => txParams.chainId = id)
//   // .then(() => web3.eth.gasPrice())
//   // .then((price) => txParams.gasPrice = price)
//   .then(() => {
//     const tx = new EthereumTx(txParams);
//     tx.sign(new Buffer(privateKey));
//     const serializedTx = tx.serialize();
//
//     console.log('serializedTx: ', serializedTx);
//
//     return web3.eth.sendSignedTransaction(serializedTx.toString('hex'))
//       .then((data) => {
//         console.log('data: ', data);
//       });
//   });

class TxComponent extends React.Component {
  // static propTypes = {
  //   store: PropTypes.object.isRequired,
  //   routes: PropTypes.object.isRequired,
  // }
  constructor(props) {
    super(props);
    this.state = {
      showConfirmModal: false
    };
  }

  executeTx() {
    let { user, txInfo } = this.props;
    let { instance, method, args, price } = txInfo;

    let encodedAbi = instance.methods[method](...args).encodeABI();

    let txParams = {
      nonce: null,
      chainId: null,
      to: instance.options.address,
      value: (price).toString(16),
      gas: 4700000,
      data: encodedAbi
    };

    return web3.eth.getTransactionCount(user.walletAddress)
      .then((count) => txParams.nonce = count)
      .then(() => web3.eth.net.getId())
      .then((id) => txParams.chainId = id)
      // .then(() => web3.eth.gasPrice())
      // .then((price) => txParams.gasPrice = price)
      .then(() => {
        // decode private key
        // const tx = new EthereumTx(txParams);
        // tx.sign(new Buffer(privateKey));
        // const serializedTx = tx.serialize();
        //
        // console.log('serializedTx: ', serializedTx);
        //
        // return web3.eth.sendSignedTransaction(serializedTx.toString('hex'))
        //   .then((data) => {
        //     console.log('data: ', data);
        //   });
      });
  }

  renderModal() {
    let { user } = this.props;

    return (
      <div className="">
        <span>{user.walletAddress}</span>
        <input type="password">Password</input>
        <button onClick={this.executeTx}>Confirm</button>
      </div>
    );
  }

  render() {
    let { text } = this.props;

    return (
      <button onClick={() => { this.setState({ showConfirmModal: true }); }}>
        {text}
      </button>
    );
  }
}

export default TxComponent;
