'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.loadItems = loadItems;
exports.downloadItems = downloadItems;
exports.itemsLoaded = itemsLoaded;
exports.itemLoadingError = itemLoadingError;
exports.deleteItems = deleteItems;

var _constants = require('../constants');

var _constants2 = require('../../../../constants');

function loadItems(options = {}) {
	return (dispatch, getState) => {
		let currentLoadCounter = getState().lists.loadCounter + 1;

		dispatch({
			type: _constants.LOAD_ITEMS,
			loadCounter: currentLoadCounter
		});

		// Take a snapshot of the current redux state.
		const state = getState();
		// Hold a reference to the currentList in state.
		const currentList = state.lists.currentList;

		currentList.loadItems({
			search: state.active.search,
			filters: state.active.filters,
			sort: state.active.sort,
			columns: state.active.columns,
			page: state.lists.page
		}, (err, items) => {

			// Create a new state snapshot and compare the current active list id
			// to the id of the currentList referenced above.
			// If they are the same, then this is the latest fetch request, we may resolve this normally.
			// If these are not the same, then it means that this is not the latest fetch request.
			// BAIL OUT!

			if (getState().active.id !== currentList.id) return;
			if (getState().lists.loadCounter > currentLoadCounter) return;
			if (items) {

				// if (page.index !== drag.page && drag.item) {
				// 	// add the dragging item
				// 	if (page.index > drag.page) {
				// 		_items.results.unshift(drag.item);
				// 	} else {
				// 		_items.results.push(drag.item);
				// 	}
				// }
				// _itemsResultsClone = items.results.slice(0);
				//

				// TODO Reenable this
				// if (options.success && options.id) {
				// 	// flashes a success background on the row
				// 	_rowAlert.success = options.id;
				// }
				// if (options.fail && options.id) {
				// 	// flashes a failure background on the row
				// 	_rowAlert.fail = options.id;
				// }

				// Successfully resolve this request in redux and set the loadCounter back to zero.
				dispatch(itemsLoaded(items));
			} else {
				// Catch this error in redux and set the loadCounter back to zero.
				dispatch(itemLoadingError(err));
			}
		});
	};
}

function downloadItems(format, columns) {
	return (dispatch, getState) => {
		const state = getState();
		const active = state.active;
		const currentList = state.lists.currentList;
		const url = currentList.getDownloadURL({
			search: active.search,
			filters: active.filters,
			sort: active.sort,
			columns: columns ? currentList.expandColumns(columns) : active.columns,
			format: format
		});
		window.open(url);
	};
}

function itemsLoaded(items) {
	return {
		type: _constants.ITEMS_LOADED,
		items
	};
}

/**
 * Dispatched when unsuccessfully trying to load the items, will redispatch
 * loadItems after NETWORK_ERROR_RETRY_DELAY milliseconds until we get items back
 */
function itemLoadingError() {
	return dispatch => {
		dispatch({
			type: _constants.ITEM_LOADING_ERROR,
			err: 'Network request failed'
		});
		setTimeout(() => {
			dispatch(loadItems());
		}, _constants2.NETWORK_ERROR_RETRY_DELAY);
	};
}

function deleteItems(ids) {
	return (dispatch, getState) => {
		const list = getState().lists.currentList;
		list.deleteItems(ids, (err, data) => {
			// TODO ERROR HANDLING
			dispatch(loadItems());
		});
	};
}