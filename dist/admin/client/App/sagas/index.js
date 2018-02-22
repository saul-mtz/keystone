'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

var _constants = require('../screens/List/constants');

var actions = _interopRequireWildcard(_constants);

var _updateParams = require('./updateParams');

var _updateParams2 = _interopRequireDefault(_updateParams);

var _actions = require('../screens/List/actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Load the items
 */
function* loadTheItems() {
	yield (0, _effects.put)((0, _actions.loadItems)());
	yield (0, _updateParams2.default)();
}
/**
 * Debounce the search loading new items by 500ms
 */
function* debouncedSearch() {
	const searchString = yield (0, _effects.select)(state => state.active.search);
	if (searchString) {
		yield (0, _reduxSaga.delay)(500);
	}
	yield (0, _updateParams2.default)();
}

function* rootSaga() {
	// Block loading on all items until the first load comes in
	yield (0, _effects.take)(actions.INITIAL_LIST_LOAD);
	yield (0, _effects.put)((0, _actions.loadItems)());
	// Search debounced
	yield (0, _effects.fork)(_reduxSaga.takeLatest, actions.SET_ACTIVE_SEARCH, debouncedSearch);
	// If one of the other active properties changes, update the query params and load the new items
	yield (0, _effects.fork)(_reduxSaga.takeLatest, [actions.SET_ACTIVE_SORT, actions.SET_ACTIVE_COLUMNS, actions.SET_CURRENT_PAGE, actions.SET_ACTIVE_LIST, actions.ADD_FILTER, actions.CLEAR_FILTER, actions.CLEAR_ALL_FILTERS], _updateParams2.default);
	// Whenever another list is loaded, load the items
	yield (0, _effects.fork)(_reduxSaga.takeLatest, [actions.INITIAL_LIST_LOAD], loadTheItems);
}

exports.default = rootSaga;