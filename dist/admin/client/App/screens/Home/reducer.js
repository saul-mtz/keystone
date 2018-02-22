'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initialState = {
	counts: {},
	loading: false,
	error: null
};

function home(state = initialState, action) {
	switch (action.type) {
		case _constants.LOAD_COUNTS:
			return (0, _objectAssign2.default)({}, state, {
				loading: true
			});
		case _constants.COUNTS_LOADING_SUCCESS:
			return (0, _objectAssign2.default)({}, state, {
				loading: false,
				counts: action.counts,
				error: null
			});
		case _constants.COUNTS_LOADING_ERROR:
			return (0, _objectAssign2.default)({}, state, {
				loading: false,
				error: action.error
			});
		default:
			return state;
	}
}

exports.default = home;