import axios from 'axios'
import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import setAuthorizationToken from '../utils/setAuthorizationToken'

export const AUTH__SET_USER = 'AUTH__SET_USER'
export const LOGOUT = 'LOGOUT'
export const AUTH__SET_IS_LOADING = 'AUTH__SET_IS_LOADING'
export const AUTH__SET_ERROR_MESSAGE = 'AUTH__SET_ERROR_MESSAGE'

function deleteCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}

function setCookie(name, value, days) {
  let expires = ''
  if (days) {
    let date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/'
}

function setCookieFromToken(token) {
  setAuthorizationToken(token)
  setCookie('cookieToken', token, 2)
}

// ------------------------------------
// Actions
// ------------------------------------
export function setUserFromToken(token) {
  setCookieFromToken(token)
  let user = jwt.decode(token)
  return setUser(user)
}

export function setIsLoading(bool) {
  return { type: AUTH__SET_IS_LOADING, payload: bool }
}

export function setUser(user) {
  return { type: AUTH__SET_USER, payload: user }
}

export function setErrorMessage(message) {
  return { type: AUTH__SET_ERROR_MESSAGE, payload: message }
}

export const setPassword = (passwordToken, password) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true))
    try {
      // if the password doesn't match the local token use axios to get a new one
      let res = await axios({
        url: `${SHAKEDOWN_URL}/set-password/${passwordToken}`, //eslint-disable-line no-undef
        method: 'post',
        data: { password },
        withCredentials: true
      })
      let { data: { token } } = res
      setCookieFromToken(token)
      let user = jwt.decode(token)
      dispatch(setUser(user))
    } catch (e) {
      dispatch(setErrorMessage(e.message))
    }
    dispatch(setIsLoading(false))
  }
}

const ACTION_HANDLERS = {
  [AUTH__SET_IS_LOADING]: (state, action) => {
    return {
      ...state,
      isLoading: action.payload
    }
  },
  [AUTH__SET_ERROR_MESSAGE]: (state, action) => {
    const errorMessage = action.payload
    return {
      ...state,
      hasError: !!errorMessage,
      errorMessage: errorMessage
    }
  },
  [AUTH__SET_USER]: (state, action) => {
    return {
      ...state,
      user: action.payload
    }
  },
  [LOGOUT]: (state) => {
    const parsedCookie = cookie.parse(document.cookie)
    if (parsedCookie.cookieToken) {
      deleteCookie('cookieToken')
      setAuthorizationToken()
    }
    return {
      ...state,
      user: null
    }
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  user: null,
  hasError: false,
  errorMessage: null,
  isLoading: false
}

export default function authenticationReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
