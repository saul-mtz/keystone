'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ItemsTableCell = require('../../components/ItemsTableCell');

var _ItemsTableCell2 = _interopRequireDefault(_ItemsTableCell);

var _ItemsTableValue = require('../../components/ItemsTableValue');

var _ItemsTableValue2 = _interopRequireDefault(_ItemsTableValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GeoPointColumn = _react2.default.createClass({
	displayName: 'GeoPointColumn',
	propTypes: {
		col: _react2.default.PropTypes.object,
		data: _react2.default.PropTypes.object
	},
	renderValue() {
		const value = this.props.data.fields[this.props.col.path];
		if (!value || !value.length) return null;

		const formattedValue = `${value[1]}, ${value[0]}`;
		const formattedTitle = `Lat: ${value[1]} Lng: ${value[0]}`;

		return _react2.default.createElement(
			_ItemsTableValue2.default,
			{ title: formattedTitle, field: this.props.col.type },
			formattedValue
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

module.exports = GeoPointColumn;