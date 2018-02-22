'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDnd = require('react-dnd');

var _reactDndHtml5Backend = require('react-dnd-html5-backend');

var _reactDndHtml5Backend2 = _interopRequireDefault(_reactDndHtml5Backend);

var _ItemsTableRow = require('./ItemsTableRow');

var _ItemsTableDragDropZone = require('./ItemsTableDragDropZone');

var _ItemsTableDragDropZone2 = _interopRequireDefault(_ItemsTableDragDropZone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ItemsTableDragDrop = _react2.default.createClass({
	displayName: 'ItemsTableDragDrop',
	propTypes: {
		columns: _react2.default.PropTypes.array,
		id: _react2.default.PropTypes.any,
		index: _react2.default.PropTypes.number,
		items: _react2.default.PropTypes.object,
		list: _react2.default.PropTypes.object
	},
	render() {
		return _react2.default.createElement(
			'tbody',
			null,
			this.props.items.results.map((item, i) => {
				return _react2.default.createElement(_ItemsTableRow.Sortable, _extends({ key: item.id,
					index: i,
					sortOrder: item.sortOrder || 0,
					id: item.id,
					item: item
				}, this.props));
			}),
			_react2.default.createElement(_ItemsTableDragDropZone2.default, this.props)
		);
	}
});

module.exports = (0, _reactDnd.DragDropContext)(_reactDndHtml5Backend2.default)(ItemsTableDragDrop);