'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _evalDependsOn = require('../../../../../../fields/utils/evalDependsOn');

var _evalDependsOn2 = _interopRequireDefault(_evalDependsOn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _react2.default.createClass({
	displayName: 'FormHeading',
	propTypes: {
		options: _react2.default.PropTypes.object
	},
	render() {
		if (!(0, _evalDependsOn2.default)(this.props.options.dependsOn, this.props.options.values)) {
			return null;
		}
		return _react2.default.createElement(
			'h3',
			{ className: 'form-heading' },
			this.props.content
		);
	}
});