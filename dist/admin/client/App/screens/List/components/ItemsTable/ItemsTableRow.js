'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ListControl = require('../ListControl');

var _ListControl2 = _interopRequireDefault(_ListControl);

var _FieldTypes = require('FieldTypes');

var _reactDnd = require('react-dnd');

var _actions = require('../../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ItemsRow = _react2.default.createClass({
	displayName: 'ItemsRow',

	propTypes: {
		columns: _react2.default.PropTypes.array,
		id: _react2.default.PropTypes.any,
		index: _react2.default.PropTypes.number,
		items: _react2.default.PropTypes.object,
		list: _react2.default.PropTypes.object,
		// Injected by React DnD:
		isDragging: _react2.default.PropTypes.bool, // eslint-disable-line react/sort-prop-types
		connectDragSource: _react2.default.PropTypes.func, // eslint-disable-line react/sort-prop-types
		connectDropTarget: _react2.default.PropTypes.func, // eslint-disable-line react/sort-prop-types
		connectDragPreview: _react2.default.PropTypes.func },
	renderRow(item) {
		const itemId = item.id;
		const rowClassname = (0, _classnames2.default)({
			'ItemList__row--dragging': this.props.isDragging,
			'ItemList__row--selected': this.props.checkedItems[itemId],
			'ItemList__row--manage': this.props.manageMode,
			'ItemList__row--success': this.props.rowAlert.success === itemId,
			'ItemList__row--failure': this.props.rowAlert.fail === itemId
		});
		// item fields
		var cells = this.props.columns.map((col, i) => {
			var ColumnType = _FieldTypes.Columns[col.type] || _FieldTypes.Columns.__unrecognised__;
			var linkTo = !i ? `${Keystone.adminPath}/${this.props.list.path}/${itemId}` : undefined;
			return _react2.default.createElement(ColumnType, { key: col.path, list: this.props.list, col: col, data: item, linkTo: linkTo });
		});

		// add sortable icon when applicable
		if (this.props.list.sortable) {
			cells.unshift(_react2.default.createElement(_ListControl2.default, { key: '_sort', type: 'sortable', dragSource: this.props.connectDragSource }));
		}

		// add delete/check icon when applicable
		if (!this.props.list.nodelete) {
			cells.unshift(this.props.manageMode ? _react2.default.createElement(_ListControl2.default, { key: '_check', type: 'check', active: this.props.checkedItems[itemId] }) : _react2.default.createElement(_ListControl2.default, { key: '_delete', onClick: e => this.props.deleteTableItem(item, e), type: 'delete' }));
		}

		var addRow = _react2.default.createElement(
			'tr',
			{ key: 'i' + item.id, onClick: this.props.manageMode ? e => this.props.checkTableItem(item, e) : null, className: rowClassname },
			cells
		);

		if (this.props.list.sortable) {
			return (
				// we could add a preview container/image
				// this.props.connectDragPreview(this.props.connectDropTarget(addRow))
				this.props.connectDropTarget(addRow)
			);
		} else {
			return addRow;
		}
	},
	render() {
		return this.renderRow(this.props.item);
	}
});

module.exports = exports = ItemsRow;

// Expose Sortable

/**
 * Implements drag source.
 */
const dragItem = {
	beginDrag(props) {
		const send = _extends({}, props);
		props.dispatch((0, _actions.setDragBase)(props.item, props.index));
		return _extends({}, send);
	},
	endDrag(props, monitor, component) {
		if (!monitor.didDrop()) {
			props.dispatch((0, _actions.resetItems)(props.id));
			return;
		}
		const page = props.currentPage;
		const pageSize = props.pageSize;

		// If we were dropped onto a page change target, then droppedOn.prevSortOrder etc will be
		// set by that target, and we should use those values. If we were just dropped onto a new row
		// then we need to calculate these values ourselves.
		const droppedOn = monitor.getDropResult();

		const prevSortOrder = droppedOn.prevSortOrder || props.sortOrder;
		// To explain the following line, suppose we are on page 3 and there are 10 items per page.
		// Previous to this page, there are (3 - 1)*10 = 20 items before us. If we have index 6
		// on this page, then we're the 7th item to display (index starts from 0), and so we
		// want to update the display order to 20 + 7 = 27.
		const newSortOrder = droppedOn.newSortOrder || (page - 1) * pageSize + droppedOn.index + 1;

		// If we were dropped on a page change target, then droppedOn.gotToPage will be set, and we should
		// pass this to reorderItems, which will then change the page for the user.
		props.dispatch((0, _actions.reorderItems)(props.item, prevSortOrder, newSortOrder, Number(droppedOn.goToPage)));
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
		if (props.rowAlert.success || props.rowAlert.fail) {
			props.dispatch((0, _actions.setRowAlert)({
				reset: true
			}));
		}

		const dragged = monitor.getItem().index;
		const over = props.index;

		// self
		if (dragged === over) {
			return;
		}

		props.dispatch((0, _actions.moveItem)(dragged, over, props));
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

exports.Sortable = (0, _reactDnd.DragSource)('item', dragItem, dragProps)((0, _reactDnd.DropTarget)('item', dropItem, dropProps)(ItemsRow));