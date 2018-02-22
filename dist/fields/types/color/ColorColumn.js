'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ItemsTableCell = require('../../components/ItemsTableCell');

var _ItemsTableCell2 = _interopRequireDefault(_ItemsTableCell);

var _ItemsTableValue = require('../../components/ItemsTableValue');

var _ItemsTableValue2 = _interopRequireDefault(_ItemsTableValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ColorColumn = _react2.default.createClass({
	displayName: 'ColorColumn',
	propTypes: {
		col: _react2.default.PropTypes.object,
		data: _react2.default.PropTypes.object
	},
	renderValue() {
		const value = this.props.data.fields[this.props.col.path];
		if (!value) return null;

		const colorBoxStyle = {
			backgroundColor: value,
			borderRadius: 3,
			display: 'inline-block',
			height: 18,
			marginRight: 10,
			verticalAlign: 'middle',
			width: 18
		};

		return _react2.default.createElement(
			_ItemsTableValue2.default,
			{ truncate: false, field: this.props.col.type },
			_react2.default.createElement(
				'div',
				{ style: { lineHeight: '18px' } },
				_react2.default.createElement('span', { style: colorBoxStyle }),
				_react2.default.createElement(
					'span',
					{ style: { display: 'inline-block', verticalAlign: 'middle' } },
					value
				)
			)
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

module.exports = ColorColumn;