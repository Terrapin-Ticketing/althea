webpackJsonp([4],{

/***/ 638:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "login", function() { return login; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actions", function() { return actions; });
/* harmony export (immutable) */ __webpack_exports__["default"] = loginReducer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jsonwebtoken__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jsonwebtoken___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jsonwebtoken__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_setAuthorizationToken__ = __webpack_require__(163);




// ------------------------------------
// Constants
// ------------------------------------

function decryptPrivateKey() {}
// * SYM DECRYPT *
//
// var decipher = crypto.createDecipher(algorithm, key);
// var deciphered = decipher.update(ciphered, outputEncoding, inputEncoding);
// deciphered += decipher.final(inputEncoding);
//
// console.log(deciphered);
// assert.equal(deciphered, text, 'Deciphered text does not match!');


/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

var login = function login(email, password) {
  return function (dispatch, getState) {
    return __WEBPACK_IMPORTED_MODULE_0_axios___default()({
      url: "http://localhost:8080" + '/login',
      method: 'post',
      data: { email: email, password: password },
      withCredentials: true
    }).then(function (res) {
      var token = res.data.token;

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_setAuthorizationToken__["a" /* default */])(token);
      dispatch({
        type: 'LOGIN',
        payload: __WEBPACK_IMPORTED_MODULE_1_jsonwebtoken___default.a.decode(token)
      });
    }).catch(function (err) {
      throw err;
    });
  };
};

var actions = {
  login: login
};

// ------------------------------------
// Action Handlers
// ------------------------------------
var ACTION_HANDLERS = {};

// ------------------------------------
// Reducer
// ------------------------------------
var initialState = {};
function loginReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}

/***/ }),

/***/ 643:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_login__ = __webpack_require__(638);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Login__ = __webpack_require__(872);



/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */



/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

var mapDispatchToProps = {
  login: __WEBPACK_IMPORTED_MODULE_1__modules_login__["login"]
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    user: state.user,
    loginError: state.loginError
  };
};

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const counter = (state) => state.counter
    const tripleCount = createSelector(counter, (count) => count * 3)
    const mapStateToProps = (state) => ({
      counter: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(__WEBPACK_IMPORTED_MODULE_2__components_Login__["a" /* default */]));

/***/ }),

/***/ 872:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Login_scss__ = __webpack_require__(881);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Login_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__Login_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_router__ = __webpack_require__(38);








var Login = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(Login, _Component);

  function Login(props) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Login);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

    _this.state = {
      email: '',
      password: '',
      loginError: null
    };
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Login, [{
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      var _this2 = this;

      e.preventDefault();
      this.props.login(this.state.email, this.state.password).then(function () {
        console.log('no err');
        __WEBPACK_IMPORTED_MODULE_6_react_router__["browserHistory"].push('/events');
      }).catch(function (err) {
        // email already taken
        console.log(err);
        _this2.setState({ loginError: 'You entered the wrong login information. Please try again.' });
        // this.setState({loginError: err.message});
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        'form',
        { className: 'login-container', onSubmit: this.handleSubmit },
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          'label',
          { className: 'label' },
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
            'span',
            null,
            'Email:'
          ),
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('input', { type: 'text', value: this.state.email, onChange: function onChange(e) {
              _this3.setState({ email: e.target.value });
            } })
        ),
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          'label',
          { className: 'label' },
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
            'span',
            null,
            'Password:'
          ),
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('input', { type: 'text', value: this.state.password, onChange: function onChange(e) {
              _this3.setState({ password: e.target.value });
            } })
        ),
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          'span',
          { className: 'error' },
          this.state.loginError ? this.state.loginError : null
        ),
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          'span',
          { className: 'user' },
          this.props.user ? this.props.user : null
        ),
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          'button',
          { type: 'submit' },
          'Login'
        )
      );
    }
  }]);

  return Login;
}(__WEBPACK_IMPORTED_MODULE_4_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (Login);

/***/ }),

/***/ 881:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

});
//# sourceMappingURL=4.756ca0ef0ac97771eca4.js.map