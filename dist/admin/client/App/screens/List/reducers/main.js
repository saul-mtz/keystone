'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _List = require('../../../../utils/List');

var _List2 = _interopRequireDefault(_List);

var _constants = require('../constants');

var _constants2 = require('../../Item/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initialState = {
	loadingRef: null,
	loadCounter: 0,
	currentList: null,
	loading: false,
	ready: false,
	error: null,
	data: {},
	items: {
		results: [],
		count: null
	},
	page: {
		size: null,
		index: undefined
	},
	rowAlert: {
		success: false,
		fail: false
	},
	drag: {
		page: 1,
		item: false,
		clonedItems: false,
		index: false
	}
};

// Rekey the lists in the state with their paths for easier matching with the
// URL parameters
const initialLists = Keystone.lists;
for (const name in initialLists) {
	if ({}.hasOwnProperty.call(initialLists, name)) {
		const currentList = initialLists[name];
		initialState.data[currentList.path] = new _List2.default(currentList);
		initialState.data[currentList.path].items = {
			results: [],
			count: null
		};
	}
}

/**
 * Manage all lists
 */
function lists(state = initialState, action) {
	switch (action.type) {
		case _constants.SELECT_LIST:
			const list = state.data[action.id];
			list.id = action.id;
			let items = {
				results: [],
				count: null
			};
			// If we have cached items, instead of resetting state.items put the
			// cached items in the state
			if (list.items.count !== null) {
				items = list.items;
			}
			return (0, _objectAssign2.default)({}, state, {
				currentList: list,
				ready: false,
				items: items,
				page: _extends({}, state.page, {
					index: 1,
					size: list.perPage
				})
			});
		case _constants.LOAD_ITEMS:
			let loading = true;
			let ready = state.ready;
			// If we have cached items ready, don't show a loading indicator
			// while we fetch the new items in the background
			if (state.items.count !== null && loading === false) {
				loading = false;
				ready = true;
			}
			return (0, _objectAssign2.default)({}, state, {
				loading,
				ready,
				loadCounter: action.loadCounter
			});
		case _constants.ITEMS_LOADED:
			// Cache the items in state.data so we can show the already existing
			// items on the next round trip while fetching the new items in the
			// background
			const cachedList = state.data[state.currentList.id];
			cachedList.items = action.items;
			return (0, _objectAssign2.default)({}, state, {
				loading: false,
				ready: true,
				error: null,
				items: action.items,
				data: _extends({}, state.data, {
					[state.currentList.id]: cachedList
				}),
				loadCounter: 0
			});
		case _constants.ITEM_LOADING_ERROR:
			return (0, _objectAssign2.default)({}, state, {
				loading: true,
				ready: true,
				error: action.err,
				loadCounter: 0
			});
		case _constants2.DELETE_ITEM:
			const newItems = {
				results: state.items.results.filter(el => el.id !== action.id),
				count: state.items.count - 1
			};
			const newCachedList = state.data[state.currentList.id];
			newCachedList.items = newItems;
			return (0, _objectAssign2.default)({}, state, {
				items: newItems,
				data: _extends({}, state.data, {
					[state.currentList.id]: newCachedList
				})
			});
		case _constants.SET_CURRENT_PAGE:
			return (0, _objectAssign2.default)({}, state, {
				loading: true,
				page: _extends({}, state.page, {
					index: action.index
				})
			});
		case _constants.SET_ROW_ALERT:
			if (action.data.reset === true) {
				return (0, _objectAssign2.default)({}, state, {
					rowAlert: {
						success: false,
						fail: false
					}
				});
			}
			return (0, _objectAssign2.default)({}, state, {
				rowAlert: _extends({}, state.rowAlert, action.data)
			});
		case _constants.RESET_DRAG_PAGE:
			return (0, _objectAssign2.default)({}, state, {
				drag: _extends({}, state.drag, {
					page: state.page.index
				})
			});
		case _constants.RESET_DRAG_ITEMS:
			return (0, _objectAssign2.default)({}, state, {
				drag: _extends({}, state.drag, {
					clonedItems: state.items
				})
			});
		case _constants.SET_DRAG_ITEM:
			return (0, _objectAssign2.default)({}, state, {
				drag: _extends({}, state.drag, {
					item: action.item
				})
			});
		case _constants.SET_DRAG_INDEX:
			return (0, _objectAssign2.default)({}, state, {
				drag: _extends({}, state.drag, {
					index: action.index
				})
			});
		case _constants.DRAG_MOVE_ITEM:
			// TODO: option to use manageMode for sortOrder
			const currentItems = state.items.results;
			const item = currentItems[action.prevIndex];
			// Remove item at prevIndex from array and save that array in
			// itemsWithoutItem
			let itemsWithoutItem = currentItems.slice(0, action.prevIndex).concat(currentItems.slice(action.prevIndex + 1, currentItems.length));
			// Add item back in at new index
			itemsWithoutItem.splice(action.newIndex, 0, item);
			return (0, _objectAssign2.default)({}, state, {
				items: _extends({}, state.items, {
					results: itemsWithoutItem
				})
			});
		default:
			return state;
	}
}

exports.default = lists;