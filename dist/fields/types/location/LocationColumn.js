'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ItemsTableCell = require('../../components/ItemsTableCell');

var _ItemsTableCell2 = _interopRequireDefault(_ItemsTableCell);

var _ItemsTableValue = require('../../components/ItemsTableValue');

var _ItemsTableValue2 = _interopRequireDefault(_ItemsTableValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SUB_FIELDS = ['street1', 'suburb', 'state', 'postcode', 'country'];

var LocationColumn = _react2.default.createClass({
	displayName: 'LocationColumn',
	propTypes: {
		col: _react2.default.PropTypes.object,
		data: _react2.default.PropTypes.object
	},
	renderValue() {
		const value = this.props.data.fields[this.props.col.path];
		if (!value || !Object.keys(value).length) return null;

		const output = [];

		SUB_FIELDS.map(i => {
			if (value[i]) {
				output.push(value[i]);
			}
		});
		return _react2.default.createElement(
			_ItemsTableValue2.default,
			{ field: this.props.col.type, title: output.join(', ') },
			output.join(', ')
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

module.exports = LocationColumn;