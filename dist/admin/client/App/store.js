'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reactRouterRedux = require('react-router-redux');

var _redux = require('redux');

var _reactRouter = require('react-router');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxSaga = require('redux-saga');

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _main = require('./screens/List/reducers/main');

var _main2 = _interopRequireDefault(_main);

var _active = require('./screens/List/reducers/active');

var _active2 = _interopRequireDefault(_active);

var _reducer = require('./screens/Item/reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _reducer3 = require('./screens/Home/reducer');

var _reducer4 = _interopRequireDefault(_reducer3);

var _sagas = require('./sagas');

var _sagas2 = _interopRequireDefault(_sagas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Combine the reducers to one state
const reducers = (0, _redux.combineReducers)({
	lists: _main2.default,
	active: _active2.default,
	item: _reducer2.default,
	home: _reducer4.default,
	routing: _reactRouterRedux.routerReducer
});

const sagaMiddleware = (0, _reduxSaga2.default)();

// Create the store
const store = (0, _redux.createStore)(reducers, (0, _redux.compose)((0, _redux.applyMiddleware)(
// Support thunked actions and react-router-redux
_reduxThunk2.default, (0, _reactRouterRedux.routerMiddleware)(_reactRouter.browserHistory), sagaMiddleware),
// Support the Chrome DevTools extension
window.devToolsExtension ? window.devToolsExtension() : f => f));

sagaMiddleware.run(_sagas2.default);

exports.default = store;