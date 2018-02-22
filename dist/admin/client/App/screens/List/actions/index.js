'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.downloadItems = exports.moveItem = exports.setRowAlert = exports.reorderItems = exports.resetItems = exports.setDragBase = exports.deleteItems = exports.itemLoadingError = exports.itemsLoaded = exports.loadItems = exports.setActiveSort = exports.setActiveColumns = exports.setActiveSearch = exports.setActiveFilters = exports.clearAllFilters = exports.clearFilter = exports.setFilter = undefined;
exports.selectList = selectList;
exports.loadInitialItems = loadInitialItems;
exports.setCurrentPage = setCurrentPage;

var _constants = require('../constants');

var _active = require('./active');

var _items = require('./items');

var _dragdrop = require('./dragdrop');

/**
 * Select a list, and set it as the active list. Called whenever the main
 * List component mounts or the list changes.
 *
 * @param  {String} id The list ID, passed via this.props.params.listId
 */
function selectList(id) {
	return (dispatch, getState) => {
		dispatch({
			type: _constants.SELECT_LIST,
			id
		});
		dispatch((0, _active.setActiveList)(getState().lists.data[id], id));
	};
}

function loadInitialItems() {
	return {
		type: _constants.INITIAL_LIST_LOAD
	};
}

/**
 * Set the current page
 *
 * @param {Number} index The page number we want to be on
 */
function setCurrentPage(index) {
	return {
		type: _constants.SET_CURRENT_PAGE,
		index: parseInt(index)
	};
}

// Export all actions from here again for easier usability, that they're split up
// should be an implementation detail of List

exports.setFilter = _active.setFilter;
exports.clearFilter = _active.clearFilter;
exports.clearAllFilters = _active.clearAllFilters;
exports.setActiveFilters = _active.setActiveFilters;
exports.setActiveSearch = _active.setActiveSearch;
exports.setActiveColumns = _active.setActiveColumns;
exports.setActiveSort = _active.setActiveSort;
exports.loadItems = _items.loadItems;
exports.itemsLoaded = _items.itemsLoaded;
exports.itemLoadingError = _items.itemLoadingError;
exports.deleteItems = _items.deleteItems;
exports.setDragBase = _dragdrop.setDragBase;
exports.resetItems = _dragdrop.resetItems;
exports.reorderItems = _dragdrop.reorderItems;
exports.setRowAlert = _dragdrop.setRowAlert;
exports.moveItem = _dragdrop.moveItem;
exports.downloadItems = _items.downloadItems;