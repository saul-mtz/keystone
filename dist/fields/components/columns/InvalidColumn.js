'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ItemsTableCell = require('../../components/ItemsTableCell');

var _ItemsTableCell2 = _interopRequireDefault(_ItemsTableCell);

var _ItemsTableValue = require('../../components/ItemsTableValue');

var _ItemsTableValue2 = _interopRequireDefault(_ItemsTableValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InvalidColumn = _react2.default.createClass({
	displayName: 'InvalidColumn',
	propTypes: {
		col: _react2.default.PropTypes.object
	},
	renderValue() {
		return _react2.default.createElement(
			_ItemsTableValue2.default,
			{ field: this.props.col.type },
			'(Invalid Type: ',
			this.props.col.type,
			')'
		);
	},
	render() {
		return _react2.default.createElement(
			_ItemsTableCell2.default,
			null,
			this.renderValue()
		);
	}
});

module.exports = InvalidColumn;