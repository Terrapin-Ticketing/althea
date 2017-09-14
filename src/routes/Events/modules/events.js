import axios from 'axios';
import pasync from 'pasync';
import web3 from '../../../components/Web3.js';
import EthereumTx from 'ethereumjs-tx';

let getContractInstance = (abi, address) => {
  const instance = new web3.eth.Contract(abi, address);
  return instance;
};

// ------------------------------------
// Constants
// ------------------------------------
export const GET_EVENTS = 'GET_EVENTS';
export const CLICK_BUY_TICKET = 'CLICK_BUY_TICKET';
export const BUY_TICKET = 'BUY_TICKET';
export const SET_CONTRACT_INFO = 'SET_CONTRACT_INFO';
export const SET_EVENTS = 'SET_EVENTS';

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const getEvents = () => {
  return (dispatch, getState) => {
    // TODO: Update this
    const { abis, terrapinAddress } = getState().events;
    let terrapinInstance = getContractInstance(abis.terrapin.abi, terrapinAddress);

    return Promise.resolve()
      .then(() => terrapinInstance.methods.getEvents().call())
      .then((eventAddrs) => {
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
              .then(() => eventObj.tickets = tickets);
            })
            .then(() => eventInstances.push(eventObj));
        })
        .then(() => {
          dispatch({
            type: SET_EVENTS,
            payload: eventInstances
          });
        });
      });
  };
};

export const getContractInfo = () => {
  return (dispatch, getState) => {
    return axios.get(`${TERRAPIN_URL}/terrapin-station`)
      .then((res) => {

        console.log('res: ', res);

        dispatch({
          type: SET_CONTRACT_INFO,
          payload: res.data
        });
      });
  };
};

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

export const buyTicket = (event) => {
  return (dispatch, getState) => {
    const privateKey = getState().login.privateKey || Buffer.from('0c431ec27c9755e19abfc557f9698c1119ffcd61751a73b2e2adfc8302414cdc', 'hex');
    const walletAddress = '0xad77ace9da2427848c74f1dd397c5f10d2b761c5';

    const { abis, terrapinAddress } = getState().events;
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
        console.log('ticketAddrs', ticketAddrs);
        return pasync.eachSeries([ticketAddrs[0]], (ticketAddr) => {
          let ticketInstance = getContractInstance(abis.ticket.abi, ticketAddr);
          return ticketInstance.methods.owner().call()
            .then((owner) => {

              console.log('herereer');

              if (owner === eventOwner && !hasBought) {
                hasBought = true;

                // web3.eth.accounts.privateKeyToAccount(privateKey);
                return web3.eth.getAccounts()
                  .then((accounts) => {

                    console.log('Accounts: ', accounts);


                    return ticketInstance.methods.price().call()
                      .then((price) => {
                        let encodedAbi = ticketInstance.methods.buyTicket().encodeABI();

                        let txParams = {
                          nonce: null,
                          chainId: null,
                          to: ticketInstance.options.address,
                          value: (price).toString(16),
                          gas: 4700000,
                          // gasPrice: null,
                          data: encodedAbi
                        };

                        console.log(ticketInstance.options.address);

                        return web3.eth.getTransactionCount(walletAddress)
                          .then((count) => txParams.nonce = count)
                          .then(() => web3.eth.net.getId())
                          .then((id) => txParams.chainId = id)
                          // .then(() => web3.eth.gasPrice())
                          // .then((price) => txParams.gasPrice = price)
                          .then(() => {
                            const tx = new EthereumTx(txParams);
                            tx.sign(new Buffer(privateKey));
                            const serializedTx = tx.serialize();

                            console.log('serializedTx: ', serializedTx);

                            return web3.eth.sendSignedTransaction(serializedTx.toString('hex'))
                              .then((data) => {
                                console.log('data: ', data);
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
  buyTicket,
  getContractInfo
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
  [SET_CONTRACT_INFO]: (state, action) => {
    return {
      ...state,
      abis: JSON.parse(action.payload.abis),
      terrapinAddress: action.payload.terrapinAddress
    };
  },
  [SET_EVENTS]: (state, action) => {
    let events = action.payload.map((event) =>{
      let qty = event.tickets.reduce((sum, ticket) => { return (ticket.owner === event.owner) ? sum + 1 : 0; }, 0);
      return {
        id: event.address,
        name: event.name,
        qty: qty,
        price: event.tickets[0].price
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
  events: [],
  abis: null,
  terrapinAddress: null
};

export default function loginReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
