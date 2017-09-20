import { combineReducers } from 'redux'
import locationReducer from './location'
import authenticationReducer from './authentication'
import terrapinReducer from './terrapin'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    auth: authenticationReducer,
    terrapin: terrapinReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
