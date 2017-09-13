import axios from 'axios';
import pasync from 'pasync';
import web3 from '../../../components/Web3.js';
import EthereumTx from 'ethereumjs-tx';

let getContractInstance = (abi, address) => {
  const instance = new web3.eth.Contract(abi, address);
  return instance;
}

// ------------------------------------
// Constants
// ------------------------------------
export const GET_EVENTS = 'GET_EVENTS'
export const CLICK_BUY_TICKET = 'CLICK_BUY_TICKET'
export const BUY_TICKET = 'BUY_TICKET'
export const SET_CONTRACT_INFO = 'SET_CONTRACT_INFO'
export const SET_EVENTS = 'SET_EVENTS'

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const getEvents = () => {
  return (dispatch, getState) => {
    // TODO: Update this
    const { abis, terrapinAddr } = getState().events;
    let terrapinInstance = getContractInstance(abis.terrapin.abi, terrapinAddr);
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
              .then(() => eventObj.tickets = tickets)
            })
            .then(() => eventInstances.push(eventObj))
        })
        .then(() => {
          dispatch({
            type: SET_EVENTS,
            payload: eventInstances
          })
        });
      })
  }
}

export const getContractInfo = () => {
  return (dispatch, getState) => {
    return axios.get(`${API_URL}/contract-info`)
      .then((res) => {
        dispatch({
          type: SET_CONTRACT_INFO,
          payload: res.data
        })
      });
  }
}

export const clickBuyTicket = () => {
  return (dispatch, getState) => {
    // TODO: Update this
    web3.getsomething
      .then((res) => {
        dispatch({
          type    : CLICK_BUY_TICKET,
          payload : res.user
        })
      })
      .catch((err) => {

      });
  }
}

export const buyTicket = (event) => {
  return (dispatch, getState) => {
    const privateKey = getState().login.privateKey || Buffer.from('f84ba7dbc834f31c5b120870c353aaa6de7b79fbf5d58619b02d1a846d0f5eab', 'hex');
    const { abis, terrapinAddr } = getState().events;
    const owner = event.owner;

    const eventInstance = getContractInstance(abis.event.abi, event.id);

    let eventOwner;
    return eventInstance.methods.owner().call()
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
              if (owner === eventOwner && !hasBought) {
                hasBought = true;

                // web3.eth.accounts.privateKeyToAccount(privateKey);
                return web3.eth.getAccounts()
                  .then((accounts) => {

                    console.log('Accounts: ', accounts);


                    return ticketInstance.methods.price().call()
                      .then((price) => {
                        let encodedAbi = ticketInstance.methods.buyTicket().encodeABI();

                        // hexString = yourNumber.toString(16);
                        // yourNumber = parseInt(hexString, 16);

                        let txParams = {
                          to: ticketInstance.options.address,
                          value: (price + 100000000).toString(16),
                          gas: 4700000,
                          data: encodedAbi
                        }

                        console.log('something');

                        const tx = new EthereumTx(txParams);
                        console.log('here');
                        tx.sign(new Buffer(privateKey));
                        const serializedTx = tx.serialize();

                        console.log('serializedTx: ', serializedTx);

                        // console.log(web3.eth.net.getId());

                        // return web3.eth.accounts.signTransaction({
                        // }, '0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318')
                        //   .then((x) => {
                        //     console.log('signed!!', x);
                        //     // broadcast transaction
                        //   })
                        //   .catch((er) => {
                        //     console.log('thing:', er);
                        //   });
                        return web3.eth.sendSignedTransaction(serializedTx.toString('hex'))
                          .then((data) => {
                            console.log('data: ', data);
                          });
                      })
                      .then(() => {
                        console.log('after buy');
                        console.log('bal:', web3.eth.getBalance(accounts[0]));
                      })
                      .catch((err) => {
                        console.log('err:', err);
                      })
                  })
              }
            });
        })
        .then(() => {
          console.log('buyableTicketAddr', buyableTicketInstance);
        });
      });
  }
}

export const actions = {
  getEvents,
  clickBuyTicket,
  buyTicket,
  getContractInfo
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_EVENTS]  : (state, action) => {
    return {
      ...state,
      events: action.payload
    }
  },
  [SET_CONTRACT_INFO]  : (state, action) => {
    return {
      ...state,
      abis: JSON.parse(action.payload.abis),
      terrapinAddr: action.payload.terrapinAddr
    }
  },
  [SET_EVENTS]: (state, action) => {
    let events = action.payload.map((event) =>{
      let qty = event.tickets.reduce((sum, ticket) => { return (ticket.owner == event.owner) ? sum + 1 : 0 }, 0);
      return {
        id: event.address,
        name: event.name,
        qty: qty,
        price: event.tickets[0].price
      }
    });
    return {
      ...state,
      events: events
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    events: [],
    abis: null,
    terrapinAddr: null
}
export default function loginReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
