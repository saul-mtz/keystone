'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.setActiveSearch = setActiveSearch;
exports.setActiveSort = setActiveSort;
exports.setActiveColumns = setActiveColumns;
exports.setActiveList = setActiveList;
exports.clearFilter = clearFilter;
exports.clearAllFilters = clearAllFilters;
exports.setActiveFilters = setActiveFilters;
exports.setFilter = setFilter;

var _constants = require('../constants');

/*
* This method is a util, but has such a specific use that it is being left within
* the file that uses it.
*/
function createFilterObject(path, value, currentListFields) {
	const field = currentListFields[path];
	if (!field) {
		console.warn('Invalid Filter path specified:', path);
		return;
	}
	return {
		field,
		value
	};
}

/**
 * Active actions
 */
function setActiveSearch(searchString) {
	return {
		type: _constants.SET_ACTIVE_SEARCH,
		searchString
	};
}

function setActiveSort(path) {
	return (dispatch, getState) => {
		// TODO Decouple from state somehow
		const list = getState().lists.currentList;
		const sort = list.expandSort(path);
		dispatch({
			type: _constants.SET_ACTIVE_SORT,
			sort
		});
	};
}

function setActiveColumns(columns) {
	return (dispatch, getState) => {
		// TODO Decouple from state somehow
		const list = getState().lists.currentList;
		const expandedColumns = list.expandColumns(columns);
		dispatch({
			type: _constants.SET_ACTIVE_COLUMNS,
			columns: expandedColumns
		});
	};
}

function setActiveList(list, id) {
	return {
		type: _constants.SET_ACTIVE_LIST,
		list,
		id
	};
}

/**
 * Filtering actions
 */

function clearFilter(path) {
	return {
		type: _constants.CLEAR_FILTER,
		path
	};
}

function clearAllFilters() {
	return {
		type: _constants.CLEAR_ALL_FILTERS
	};
}

// This is being used on first page load to set all filters from params
function setActiveFilters(filters) {
	return (dispatch, getState) => {
		const currentList = getState().lists.currentList;
		// For each filter, assemble it from the current list's fields
		const assembledFilters = filters.map(filter => {
			const path = filter.path;
			const value = Object.assign({}, filter);
			delete value.path;
			return createFilterObject(path, value, currentList.fields);
		});
		// Remove any filters that were not able to be assembled
		const nonEmptyFilters = assembledFilters.filter(filter => filter);
		dispatch({
			type: _constants.SET_FILTERS,
			filters: nonEmptyFilters
		});
	};
}

function setFilter(path, value) {
	return (dispatch, getState) => {
		const state = getState();
		const activeFilters = state.active.filters;
		const currentList = state.lists.currentList;
		// Get current filter
		let filter = activeFilters.filter(i => i.field.path === path)[0];
		// If a filter exists already, update its value
		if (filter) {
			filter.value = value;
			// Otherwise construct a new one
		} else {
			filter = createFilterObject(path, value, currentList.fields);
			if (!filter) {
				return;
			}
		}
		dispatch({
			type: _constants.ADD_FILTER,
			filter
		});
	};
}