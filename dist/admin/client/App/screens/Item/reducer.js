'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Item reducer, handles the item data and loading
                                                                                                                                                                                                                                                                   */


var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initialState = {
	data: null,
	id: null,
	loading: false,
	ready: false,
	error: null,
	relationshipData: {},
	drag: {
		clonedItems: false,
		newSortOrder: null,
		relationshipPath: false
	}
};

function item(state = initialState, action) {
	switch (action.type) {
		case _constants.SELECT_ITEM:
			return (0, _objectAssign2.default)({}, state, {
				ready: false,
				id: action.id,
				data: null
			});
		case _constants.LOAD_DATA:
			return (0, _objectAssign2.default)({}, state, {
				loading: true
			});
		case _constants.DATA_LOADING_SUCCESS:
			return (0, _objectAssign2.default)({}, state, {
				data: action.data,
				loading: false,
				ready: true,
				error: null
			});
		case _constants.DATA_LOADING_ERROR:
			return (0, _objectAssign2.default)({}, state, {
				data: null,
				loading: false,
				ready: true,
				error: action.error
			});
		case _constants.DRAG_MOVE_ITEM:
			const currentItems = state.relationshipData[action.relationshipPath].results;
			// Cache a copy of the current items to reset the items when dismissing a drag and drop if a cached copy doesn't already exist
			const clonedItems = state.drag.clonedItems || currentItems;
			const item = currentItems[action.prevIndex];
			// Remove item at prevIndex from array and save that array in
			// itemsWithoutItem
			let itemsWithoutItem = currentItems.slice(0, action.prevIndex).concat(currentItems.slice(action.prevIndex + 1, currentItems.length));
			// Add item back in at new index
			itemsWithoutItem.splice(action.newIndex, 0, item);
			const newRelationshipData = (0, _objectAssign2.default)({}, state.relationshipData[action.relationshipPath], {
				results: itemsWithoutItem
			});
			return (0, _objectAssign2.default)({}, state, {
				drag: {
					newSortOrder: action.newSortOrder,
					clonedItems: clonedItems,
					relationshipPath: action.relationshipPath
				},
				relationshipData: _extends({}, state.relationshipData, {
					[action.relationshipPath]: newRelationshipData
				})
			});
		case _constants.DRAG_RESET_ITEMS:
			const originalRelationshipData = (0, _objectAssign2.default)({}, state.relationshipData[state.drag.relationshipPath], {
				results: state.drag.clonedItems
			});
			return (0, _objectAssign2.default)({}, state, {
				drag: {
					newSortOrder: null,
					clonedItems: false,
					relationshipPath: false
				},
				relationshipData: _extends({}, state.relationshipData, {
					[state.drag.relationshipPath]: originalRelationshipData
				})
			});
		case _constants.LOAD_RELATIONSHIP_DATA:
			return (0, _objectAssign2.default)({}, state, {
				// Reset drag and drop when relationship data is loaded
				drag: {
					newSortOrder: null,
					clonedItems: false,
					relationshipPath: false
				},
				relationshipData: _extends({}, state.relationshipData, {
					[action.relationshipPath]: action.data
				})
			});
		default:
			return state;
	}
}

exports.default = item;