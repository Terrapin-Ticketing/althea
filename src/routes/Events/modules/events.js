import axios from 'axios';
import pasync from 'pasync';
import EthereumTx from 'ethereumjs-tx';
import crypto from 'crypto';
import web3 from '../../../components/Web3.js';

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

// ------------------------------------
// Constants
// ------------------------------------
export const GET_EVENTS = 'GET_EVENTS';
export const CLICK_BUY_TICKET = 'CLICK_BUY_TICKET';
export const BUY_TICKET = 'BUY_TICKET';
export const SET_EVENTS = 'SET_EVENTS';

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */
export function getEvents() {
  return (dispatch, getState) => {
    // TODO: Update this
    const { abis, terrapinAddress } = getState().terrapin;
    console.log('abis: ', abis);
    let terrapinInstance = getContractInstance(abis.terrapin.abi, terrapinAddress);

    return Promise.resolve()
      .then(() => terrapinInstance.methods.getEvents().call())
      .then((eventAddrs) => {
        console.log('eventAddrs: ', eventAddrs);
        let eventInstances = [];

        return pasync.eachSeries(eventAddrs, (eventAddr) => {
          let eventInstance = getContractInstance(abis.event.abi, eventAddr);
          // tickets, name
          let eventObj = { address: eventAddr };
          return Promise.resolve()
            .then(() => eventInstance.methods.owner().call())
            .then((owner) => {
              eventObj.owner = owner;
            })
            .then(() => eventInstance.methods.name().call())
            .then((name) => {
              eventObj.name = web3.utils.toAscii(name);
            })
            .then(() => eventInstance.methods.getTickets().call())
            .then((ticketAddrs) => {
              let tickets = [];
              return pasync.eachSeries(ticketAddrs, (ticketAddr) => {
                let ticketInstance = getContractInstance(abis.ticket.abi, ticketAddr);
                let ticketObj = {};
                return ticketInstance.methods.price().call()
                  .then((price) => ticketObj.price = price)
                  .then(() => ticketInstance.methods.owner().call())
                  .then((owner) => ticketObj.owner = owner)
                  .then(() => tickets.push(ticketObj));
              })
                // set this events tickets
                .then(() => {
                  eventObj.tickets = tickets;
                });
            })
            .then(() => eventInstances.push(eventObj));
        })
        .then(() => {
          console.log('setEvents');
          dispatch({
            type: SET_EVENTS,
            payload: eventInstances
          });
        })
        .then(() => {
          console.log('complete');
        });
      });
  };
}

export const clickBuyTicket = () => {
  return (dispatch, getState) => {
    // TODO: Update this
    web3.getsomething
      .then((res) => {
        dispatch({
          type: CLICK_BUY_TICKET,
          payload: res.user
        });
      })
      .catch((err) => {

      });
  };
};

export const buyTicket = (event, password) => {
  return (dispatch, getState) => {
    console.log('event: ', event);
    console.log('password: ', password);
    console.log('getState().auth.user.encryptedPrivateKey: ', getState().auth.user.encryptedPrivateKey);
    let privateKey = decryptPrivateKey(password, getState().auth.user.encryptedPrivateKey).substring(2);
    privateKey = Buffer.from(privateKey, 'hex');
    const walletAddress = getState().auth.user.walletAddress;

    const { abis, terrapinAddress } = getState().terrapin;
    const owner = event.owner;

    const eventInstance = getContractInstance(abis.event.abi, event.id);

    let eventOwner;
    return web3.eth.getBalance(walletAddress)
      .then((balance) => {
        console.log('Balance BEFORE buy: ', balance);
      })
      .then(() => eventInstance.methods.owner().call())
      .then((owner) => {
        console.log('eventOwner', owner);
        eventOwner = owner;
      })
      .then(() => eventInstance.methods.getTickets().call())
      .then((ticketAddrs) => {
        let i;
        let isAvailable = false;
        // grab first available
        let hasBought = false;
        return pasync.eachSeries(ticketAddrs, (ticketAddr) => {
          console.log('ticketAddr', ticketAddr);
          let ticketInstance = getContractInstance(abis.ticket.abi, ticketAddr);
          return ticketInstance.methods.owner().call()
            .then((owner) => {
              if (owner === eventOwner && !hasBought) {
                hasBought = true;
                // web3.eth.accounts.privateKeyToAccount(privateKey);
                return Promise.resolve()
                  .then(() => {
                    return ticketInstance.methods.price().call()
                      .then((price) => {
                        console.log('price: ', typeof price);
                        console.log('static: ', typeof 1000000000000000000);
                        let encodedAbi = ticketInstance.methods.buyTicket().encodeABI();
                        let txParams = {
                          nonce: null,
                          chainId: null,
                          to: ticketInstance.options.address,
                          value: parseInt(price),
                          gas: `0x${(4700000).toString(16)}`,
                          gasPrice: `0x${(4000000000).toString(16)}`,
                          data: encodedAbi
                        };

                        return web3.eth.getTransactionCount(walletAddress)
                          .then((count) => txParams.nonce = `0x${count.toString(16)}`)
                          .then(() => web3.eth.net.getId())
                          .then((id) => txParams.chainId = id)
                          // .then(() => web3.eth.gasPrice())
                          // .then((price) => txParams.gasPrice = price)
                          .then(() => {
                            const tx = new EthereumTx(txParams);
                            tx.sign(new Buffer(privateKey));
                            const serializedTx = tx.serialize();

                            console.log('serializedTx: ', serializedTx);

                            return web3.eth.sendSignedTransaction(`0x${serializedTx.toString('hex')}`)
                              .then((data) => {
                                console.log('data: ', data);
                              })
                              .catch((err) => {
                                console.log('oh shit', err);
                              });
                          });

                      })
                      .then(() => web3.eth.getBalance(walletAddress))
                      .then((balance) => {
                        console.log('Balance AFTER buy: ', balance);
                      })
                      .catch((err) => {
                        console.log('err:', err);
                      });
                  });
              }
            });
        })
        .then(() => {
          // console.log('buyableTicketAddr', buyableTicketInstance);
        });
      });
  };
};

export const actions = {
  getEvents,
  clickBuyTicket,
  buyTicket
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_EVENTS]: (state, action) => {
    return {
      ...state,
      events: action.payload
    };
  },
  [SET_EVENTS]: (state, action) => {
    let events = action.payload.map((event) =>{
      let qty = event.tickets.reduce((sum, ticket) => { return (ticket.owner === event.owner) ? sum + 1 : 0; }, 0);
      return {
        id: event.address,
        name: event.name,
        qty: qty,
        price: event.tickets[0] ? event.tickets[0].price : 'N/A'
      };
    });
    return {
      ...state,
      events: events
    };
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  events: []
};

export default function loginReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
