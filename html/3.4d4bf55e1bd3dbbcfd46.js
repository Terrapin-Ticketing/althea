webpackJsonp([3],{

/***/ 639:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signup", function() { return signup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actions", function() { return actions; });
/* harmony export (immutable) */ __webpack_exports__["default"] = signupReducer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jsonwebtoken__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jsonwebtoken___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jsonwebtoken__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_setAuthorizationToken__ = __webpack_require__(163);




// ------------------------------------
// Constants
// ------------------------------------
/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

var signup = function signup(email, password, privateKey) {
  return function (dispatch, getState) {
    return __WEBPACK_IMPORTED_MODULE_0_axios___default()({
      url: "http://localhost:8080" + '/signup',
      method: 'post',
      data: { email: email, password: password, privateKey: privateKey },
      withCredentials: true
    }).then(function (res) {
      var token = res.data.token;

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_setAuthorizationToken__["a" /* default */])(token);
      return dispatch({
        type: 'LOGIN', // don't know why SIGNUP_SUCCESS doesnt work
        payload: __WEBPACK_IMPORTED_MODULE_1_jsonwebtoken___default.a.decode(token)
      });
    }).catch(function (err) {
      throw err;
    });
  };
};

var actions = {
  signup: signup
};

// ------------------------------------
// Action Handlers
// ------------------------------------
var ACTION_HANDLERS = {};

// ------------------------------------
// Reducer
// ------------------------------------
var initialState = {};

function signupReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}

/***/ }),

/***/ 644:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_signup__ = __webpack_require__(639);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Signup__ = __webpack_require__(873);



/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */



/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

var mapDispatchToProps = {
  signup: __WEBPACK_IMPORTED_MODULE_1__modules_signup__["signup"]
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    user: state.user
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

/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(__WEBPACK_IMPORTED_MODULE_2__components_Signup__["a" /* default */]));

/***/ }),

/***/ 873:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Signup_scss__ = __webpack_require__(882);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Signup_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__Signup_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_router__ = __webpack_require__(38);








var Signup = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(Signup, _Component);

  function Signup(props) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Signup);

    var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Signup.__proto__ || Object.getPrototypeOf(Signup)).call(this, props));

    _this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      privateKey: '',
      signupError: null
    };
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Signup, [{
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      var _this2 = this;

      var _state = this.state,
          password = _state.password,
          confirmPassword = _state.confirmPassword,
          email = _state.email,
          privateKey = _state.privateKey;

      e.preventDefault();
      if (password === confirmPassword) {
        this.props.signup(email, password, privateKey).then(function () {
          __WEBPACK_IMPORTED_MODULE_6_react_router__["browserHistory"].push('/user');
        }).catch(function (err) {
          // email already taken
          _this2.setState({ signupError: 'That email is already in use. Please try again.' });
        });
      } else {
        this.setState({ signupError: 'Your passwords don\'t match! Please try again.' });
      }
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
          'label',
          { className: 'label' },
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
            'span',
            null,
            'Confirm Password:'
          ),
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('input', { type: 'text', value: this.state.confirmPassword, onChange: function onChange(e) {
              _this3.setState({ confirmPassword: e.target.value });
            } })
        ),
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          'label',
          { className: 'label' },
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
            'span',
            null,
            'Private Key (optional):'
          ),
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('input', { type: 'text', value: this.state.privateKey, onChange: function onChange(e) {
              _this3.setState({ privateKey: e.target.value });
            } })
        ),
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          'span',
          { className: 'error' },
          this.state.signupError ? this.state.signupError : this.props.signupError ? this.props.signupError : null
        ),
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          'button',
          { type: 'submit' },
          'Signup'
        )
      );
    }
  }]);

  return Signup;
}(__WEBPACK_IMPORTED_MODULE_4_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = (Signup);

/***/ }),

/***/ 882:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

});
//# sourceMappingURL=3.4d4bf55e1bd3dbbcfd46.js.map