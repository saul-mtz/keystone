'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ItemsTableCell = require('../../components/ItemsTableCell');

var _ItemsTableCell2 = _interopRequireDefault(_ItemsTableCell);

var _ItemsTableValue = require('../../components/ItemsTableValue');

var _ItemsTableValue2 = _interopRequireDefault(_ItemsTableValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UrlColumn = _react2.default.createClass({
	displayName: 'UrlColumn',
	propTypes: {
		col: _react2.default.PropTypes.object,
		data: _react2.default.PropTypes.object
	},
	renderValue() {
		var value = this.props.data.fields[this.props.col.path];
		if (!value) return;

		// if the value doesn't start with a prototcol, assume http for the href
		var href = value;
		if (href && !/^(mailto\:)|(\w+\:\/\/)/.test(href)) {
			href = 'http://' + value;
		}

		// strip the protocol from the link if it's http(s)
		var label = value.replace(/^https?\:\/\//i, '');

		return _react2.default.createElement(
			_ItemsTableValue2.default,
			{ to: href, padded: true, exterior: true, field: this.props.col.type },
			label
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

module.exports = UrlColumn;