'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = updateParams;

var _queryParams = require('../../utils/queryParams');

var _reactRouterRedux = require('react-router-redux');

var _effects = require('redux-saga/effects');

var _actions = require('../screens/List/actions');

/**
 * Update the query params based on the current state
 */
function* updateParams() {
	// Select all the things
	const activeState = yield (0, _effects.select)(state => state.active);
	const currentList = yield (0, _effects.select)(state => state.lists.currentList);
	const location = yield (0, _effects.select)(state => state.routing.locationBeforeTransitions);
	let page = yield (0, _effects.select)(state => state.lists.page.index);

	// Get the data into the right format, set the defaults
	let sort = activeState.sort.rawInput;
	if (sort === currentList.defaultSort) sort = undefined;
	let columns = (0, _queryParams.stringifyColumns)(activeState.columns, currentList.defaultColumnPaths);
	let search = activeState.search;
	let filters = (0, _queryParams.parametizeFilters)(activeState.filters);
	if (page === 1) page = undefined;

	const newParams = (0, _queryParams.updateQueryParams)({
		page,
		columns,
		sort,
		search,
		filters
	}, location);

	// TODO: Starting or clearing a search pushes a new history state, but updating
	// the current search replaces it for nicer history navigation support
	yield (0, _effects.put)((0, _reactRouterRedux.replace)({
		pathname: location.pathname,
		query: newParams
	}));
	yield (0, _effects.put)((0, _actions.loadItems)());
}