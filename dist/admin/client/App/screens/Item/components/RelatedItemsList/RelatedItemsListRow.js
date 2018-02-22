'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDnd = require('react-dnd');

var _FieldTypes = require('FieldTypes');

var _actions = require('../../actions');

var _ListControl = require('../../../List/components/ListControl');

var _ListControl2 = _interopRequireDefault(_ListControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RelatedItemsListRow extends _react.Component {
	render() {
		const { columns, item, connectDragSource, connectDropTarget, refList } = this.props;
		const cells = columns.map((col, i) => {
			const ColumnType = _FieldTypes.Columns[col.type] || _FieldTypes.Columns.__unrecognised__;
			const linkTo = !i ? `${Keystone.adminPath}/${refList.path}/${item.id}` : undefined;
			return _react2.default.createElement(ColumnType, { key: col.path, list: refList, col: col, data: item, linkTo: linkTo });
		});

		// add sortable icon when applicable
		if (connectDragSource) {
			cells.unshift(_react2.default.createElement(_ListControl2.default, { key: '_sort', type: 'sortable', dragSource: connectDragSource }));
		}

		const row = _react2.default.createElement(
			'tr',
			{ key: 'i' + item.id },
			cells
		);

		if (connectDropTarget) {
			return connectDropTarget(row);
		} else {
			return row;
		}
	}
}
RelatedItemsListRow.propTypes = {
	columns: _react.PropTypes.array.isRequired,
	dispatch: _react.PropTypes.func.isRequired,
	dragNewSortOrder: _react2.default.PropTypes.number,
	index: _react.PropTypes.number,
	item: _react.PropTypes.object.isRequired,
	refList: _react.PropTypes.object.isRequired,
	relatedItemId: _react.PropTypes.string.isRequired,
	relationship: _react.PropTypes.object.isRequired,
	// Injected by React DnD:
	isDragging: _react.PropTypes.bool, // eslint-disable-line react/sort-prop-types
	connectDragSource: _react.PropTypes.func, // eslint-disable-line react/sort-prop-types
	connectDropTarget: _react.PropTypes.func, // eslint-disable-line react/sort-prop-types
	connectDragPreview: _react.PropTypes.func };

module.exports = exports = RelatedItemsListRow;

// Expose Sortable

/**
 * Implements drag source.
 */
const dragItem = {
	beginDrag(props) {
		const send = _extends({}, props);
		// props.dispatch(setDragBase(props.item, props.index));
		return _extends({}, send);
	},
	endDrag(props, monitor, component) {
		// Dropped outside of the drop target, reset rows
		if (!monitor.didDrop()) {
			props.dispatch((0, _actions.resetItems)());
			return;
		}

		const draggedItem = props.item;
		const prevSortOrder = draggedItem.sortOrder;
		const newSortOrder = props.dragNewSortOrder;

		// Dropping on self
		if (prevSortOrder === newSortOrder) {
			props.dispatch((0, _actions.resetItems)());
			return;
		}

		// dropped on a target
		const { columns, refList, relationship, relatedItemId, item } = props;
		props.dispatch((0, _actions.reorderItems)({ columns, refList, relationship, relatedItemId, item, prevSortOrder, newSortOrder }));
	}
};

/**
 * Implements drag target.
 */
const dropItem = {
	drop(props, monitor, component) {
		return _extends({}, props);
	},
	hover(props, monitor, component) {
		// reset row alerts
		// if (props.rowAlert.success || props.rowAlert.fail) {
		// props.dispatch(setRowAlert({
		// 	reset: true,
		// }));
		// }

		const dragged = monitor.getItem().index;
		const over = props.index;

		// self
		if (dragged === over) {
			return;
		}

		// Since the items are moved on hover, we need to store the new sort order from the dragged over item so we can use it to reorder when the item is dropped.
		props.dispatch((0, _actions.moveItem)({
			prevIndex: dragged,
			newIndex: over,
			relationshipPath: props.relationship.path,
			newSortOrder: props.item.sortOrder
		}));
		monitor.getItem().index = over;
	}
};

/**
 * Specifies the props to inject into your component.
 */
function dragProps(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
		connectDragPreview: connect.dragPreview()
	};
}

function dropProps(connect) {
	return {
		connectDropTarget: connect.dropTarget()
	};
};

// exports.Sortable = RelatedItemsListRow;
exports.Sortable = (0, _reactDnd.DragSource)('item', dragItem, dragProps)((0, _reactDnd.DropTarget)('item', dropItem, dropProps)(RelatedItemsListRow));