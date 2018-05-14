import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import locationReducer from './location';
import authenticationReducer from './authentication';
import transferTicketModalReducer from '../components/shared/TransferTicketModal/reducer';
import sellTicketModalReducer from '../components/shared/SellTicketModal/reducer';
import payoutModalReducer from 'components/shared/PayoutModal/reducer';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    auth: authenticationReducer,
    form: formReducer,
    transferTicketModal: transferTicketModalReducer,
    sellTicketModal: sellTicketModalReducer,
    payoutModal: payoutModalReducer,
    ...asyncReducers,
  });
};

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
