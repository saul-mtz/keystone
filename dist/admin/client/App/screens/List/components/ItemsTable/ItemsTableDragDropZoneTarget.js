'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDnd = require('react-dnd');

var _actions = require('../../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let timeoutID = false;

// drop target
/**
 * THIS IS ORPHANED AND ISN'T RENDERED AT THE MOMENT
 * THIS WAS DONE TO FINISH THE REDUX INTEGRATION, WILL REWRITE SOON
 * - @mxstbr
 */

var ItemsTableDragDropZoneTarget = _react2.default.createClass({
	displayName: 'ItemsTableDragDropZoneTarget',
	propTypes: {
		className: _react2.default.PropTypes.string,
		connectDropTarget: _react2.default.PropTypes.func,
		isOver: _react2.default.PropTypes.bool,
		pageItems: _react2.default.PropTypes.string
	},
	componentDidUpdate() {
		if (timeoutID && !this.props.isOver) {
			clearTimeout(timeoutID);
			timeoutID = false;
		}
	},
	render() {
		const { pageItems, page, isOver, dispatch } = this.props;
		let { className } = this.props;
		if (isOver) {
			className += page === this.props.currentPage ? ' is-available ' : ' is-waiting ';
		}
		return this.props.connectDropTarget(_react2.default.createElement(
			'div',
			{
				className: className,
				onClick: e => {
					dispatch((0, _actions.setCurrentPage)(page));
				}
			},
			pageItems
		));
	}
});

/**
 * Implements drag target.
 */
const dropTarget = {
	drop(props, monitor, component) {
		// we send manual data to endDrag to send this item to the correct page
		const { page } = props.drag;
		const targetPage = props.page;
		const pageSize = props.pageSize;

		const item = monitor.getItem();
		item.goToPage = props.page;
		item.prevSortOrder = item.sortOrder;
		// Work out the new sort order. If the new page is greater, we'll put it at the start of the page, and
		// if it's smaller we'll put it at the end of the page.
		item.newSortOrder = targetPage < page ? targetPage * pageSize : targetPage * pageSize - (pageSize - 1);
		return item;
	}
};
/**
 * Specifies the props to inject into your component.
 */
function dropProps(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver()
	};
};

module.exports = (0, _reactDnd.DropTarget)('item', dropTarget, dropProps)(ItemsTableDragDropZoneTarget);