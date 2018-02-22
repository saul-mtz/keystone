'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.setDragBase = setDragBase;
exports.resetDragPage = resetDragPage;
exports.resetDragItems = resetDragItems;
exports.setDragItem = setDragItem;
exports.setDragIndex = setDragIndex;
exports.setRowAlert = setRowAlert;
exports.moveItem = moveItem;
exports.reorderItems = reorderItems;
exports.resetItems = resetItems;

var _constants = require('../constants');

var _actions = require('../actions');

function setDragBase(item, index) {
	return dispatch => {
		dispatch(resetDragPage());
		dispatch(resetDragItems());
		if (item) {
			dispatch(setDragItem(item));
			if (index) {
				dispatch(setDragIndex(index));
			}
		}
	};
};

function resetDragPage() {
	return {
		type: _constants.RESET_DRAG_PAGE
	};
}

function resetDragItems() {
	return {
		type: _constants.RESET_DRAG_ITEMS
	};
}

function setDragItem(item) {
	return {
		type: _constants.SET_DRAG_ITEM,
		item
	};
}

function setDragIndex(index) {
	return {
		type: _constants.SET_DRAG_INDEX,
		index
	};
}

function setRowAlert(data) {
	return {
		type: _constants.SET_ROW_ALERT,
		data
	};
}

function moveItem(prevIndex, newIndex, options) {
	return {
		type: _constants.DRAG_MOVE_ITEM,
		prevIndex,
		newIndex,
		options
	};
}

function reorderItems(item, prevSortOrder, newSortOrder, goToPage) {
	// // reset drag
	// defaultDrag();
	return (dispatch, getState) => {
		if (goToPage) {
			// TODO FIGURE OUT IF THIS IS A RACE CONDITION
			dispatch((0, _actions.setCurrentPage)(goToPage));
		}
		const state = getState();
		const list = state.lists.currentList;

		// Send the item, previous sortOrder and the new sortOrder
		// we should get the proper list and new page results in return
		list.reorderItems(item, prevSortOrder, newSortOrder, {
			search: state.active.search,
			filters: state.active.filters,
			sort: state.active.sort,
			columns: state.active.columns,
			page: state.lists.page
		}, (err, items) => {
			// If err, flash the row alert
			if (err) {
				dispatch(resetItems(item.id));
				// return this.resetItems(this.findItemById[item.id]);
			} else {
				dispatch((0, _actions.itemsLoaded)(items));
				dispatch(setRowAlert({
					success: item.id,
					fail: false
				}));
			}
		});
	};
}

function resetItems(itemId) {
	return (dispatch, getState) => {
		const state = getState();
		const { page, drag } = state.lists;

		if (page.index !== drag.page) {
			// We are not on the original page so we need to move back to it
			dispatch((0, _actions.setCurrentPage)(drag.page));
			dispatch((0, _actions.loadItems)({
				fail: true,
				id: itemId
			}));
			// reset drag
			// return defaultDrag();
		}

		// Reset the list if dragout or error
		dispatch(setRowAlert({
			success: false,
			fail: itemId
		}));
		// we use the cached clone since this is the same page
		// the clone contains the proper index numbers which get overwritten on drag
		// _items.results = drag.clonedItems;
		// defaultDrag();
		// this.notifyChange();
	};
}