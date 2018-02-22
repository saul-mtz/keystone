'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ItemsTableCell = require('../../components/ItemsTableCell');

var _ItemsTableCell2 = _interopRequireDefault(_ItemsTableCell);

var _ItemsTableValue = require('../../components/ItemsTableValue');

var _ItemsTableValue2 = _interopRequireDefault(_ItemsTableValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LocalFileColumn = _react2.default.createClass({
	displayName: 'LocalFileColumn',

	renderValue: function () {
		var value = this.props.data.fields[this.props.col.path];
		if (!value || !value.filename) return;
		return value.filename;
	},
	render: function () {
		var value = this.props.data.fields[this.props.col.path];
		var href = value && value.url ? value.url : null;
		var label = value && value.filename ? value.filename : null;
		return _react2.default.createElement(
			_ItemsTableCell2.default,
			{ href: href, padded: true, interior: true, field: this.props.col.type },
			_react2.default.createElement(
				_ItemsTableValue2.default,
				null,
				label
			)
		);
	}
});

module.exports = LocalFileColumn;