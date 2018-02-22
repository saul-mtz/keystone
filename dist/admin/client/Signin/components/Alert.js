'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Renders an Alert. Pass either an isInvalid and invalidMessage prop, or set
 * the signedOut prop to true to show the standard signed out message
 */

const AlertView = function (props) {
	if (props.isInvalid) {
		return _react2.default.createElement(
			_elemental.Alert,
			{ key: 'error', color: 'danger', style: { textAlign: 'center' } },
			props.invalidMessage
		);
	} else if (props.signedOut) {
		return _react2.default.createElement(
			_elemental.Alert,
			{ key: 'signed-out', color: 'info', style: { textAlign: 'center' } },
			'You have been signed out.'
		);
	} else {
		// Can't return "null" from stateless components
		return _react2.default.createElement('span', null);
	}
};

AlertView.propTypes = {
	invalidMessage: _react2.default.PropTypes.string,
	isInvalid: _react2.default.PropTypes.bool,
	signedOut: _react2.default.PropTypes.bool
};

module.exports = AlertView;