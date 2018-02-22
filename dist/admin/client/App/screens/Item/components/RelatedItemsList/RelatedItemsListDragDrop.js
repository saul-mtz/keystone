'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDnd = require('react-dnd');

var _reactDndHtml5Backend = require('react-dnd-html5-backend');

var _reactDndHtml5Backend2 = _interopRequireDefault(_reactDndHtml5Backend);

var _RelatedItemsListRow = require('./RelatedItemsListRow');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RelatedItemsListDragDrop extends _react.Component {
	render() {
		const { items } = this.props;
		return _react2.default.createElement(
			'tbody',
			null,
			items.results.map((item, i) => {
				return _react2.default.createElement(_RelatedItemsListRow.Sortable, _extends({
					key: item.id,
					index: i,
					item: item
				}, this.props));
			})
		);
	}
};
RelatedItemsListDragDrop.propTypes = {
	columns: _react.PropTypes.array.isRequired,
	dispatch: _react2.default.PropTypes.func.isRequired,
	dragNewSortOrder: _react2.default.PropTypes.number,
	items: _react.PropTypes.array.isRequired,
	list: _react.PropTypes.object.isRequired,
	refList: _react.PropTypes.object.isRequired,
	relatedItemId: _react.PropTypes.string.isRequired,
	relationship: _react.PropTypes.object.isRequired
};

module.exports = (0, _reactDnd.DragDropContext)(_reactDndHtml5Backend2.default)(RelatedItemsListDragDrop);