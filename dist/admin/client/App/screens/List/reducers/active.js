'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initialState = {
	columns: [],
	filters: [],
	search: '',
	sort: {
		input: '',
		isDefaultSort: false,
		paths: [],
		rawInput: ''
	}
};

/**
 * Manage the active state
 */
function active(state = initialState, action) {
	switch (action.type) {
		case _constants.SET_ACTIVE_LIST:
			return (0, _objectAssign2.default)({}, state, {
				id: action.id,
				columns: action.list.expandColumns(action.list.defaultColumns),
				filters: [],
				search: '',
				sort: action.list.expandSort(action.list.defaultSort)
			});
		case _constants.SET_ACTIVE_SEARCH:
			return (0, _objectAssign2.default)({}, state, {
				search: action.searchString
			});
		case _constants.SET_ACTIVE_SORT:
			return (0, _objectAssign2.default)({}, state, {
				sort: action.sort
			});
		case _constants.SET_ACTIVE_COLUMNS:
			return (0, _objectAssign2.default)({}, state, {
				columns: action.columns
			});
		case _constants.ADD_FILTER:
			return (0, _objectAssign2.default)({}, state, {
				// Override existing filter with field path,
				// otherwise add to filters array
				filters: _lodash2.default.unionWith([action.filter], state.filters, (stateFilter, actionFilter) => {
					return stateFilter.field.path === actionFilter.field.path;
				})
			});
		case _constants.SET_FILTERS:
			return (0, _objectAssign2.default)({}, state, {
				filters: action.filters
			});
		case _constants.CLEAR_FILTER:
			let newFilters = _lodash2.default.filter(state.filters, filter => {
				return filter.field.path !== action.path;
			});
			return (0, _objectAssign2.default)({}, state, {
				filters: newFilters
			});
		case _constants.CLEAR_ALL_FILTERS:
			return (0, _objectAssign2.default)({}, state, {
				filters: []
			});
		default:
			return state;
	}
}

exports.default = active;