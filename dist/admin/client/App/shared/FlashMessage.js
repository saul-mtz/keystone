'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A single flash message component. Used by FlashMessages.js
 */

const FlashMessage = _react2.default.createClass({
	displayName: 'FlashMessage',

	propTypes: {
		message: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string]).isRequired,
		type: _react.PropTypes.string
	},
	// Render the message
	renderMessage(message) {
		// If the message is only a string, render the string
		if (typeof message === 'string') {
			return _react2.default.createElement(
				'span',
				null,
				message
			);
		}

		// Get the title and the detail of the message
		const title = message.title ? _react2.default.createElement(
			'h4',
			null,
			message.title
		) : null;
		const detail = message.detail ? _react2.default.createElement(
			'p',
			null,
			message.detail
		) : null;
		// If the message has a list attached, render a <ul>
		const list = message.list ? _react2.default.createElement(
			'ul',
			{ style: { marginBottom: 0 } },
			message.list.map((item, i) => _react2.default.createElement(
				'li',
				{ key: `i${i}` },
				item
			))
		) : null;

		return _react2.default.createElement(
			'span',
			null,
			title,
			detail,
			list
		);
	},
	render() {
		const { message, type } = this.props;

		return _react2.default.createElement(
			_elemental.Alert,
			{ color: type },
			this.renderMessage(message)
		);
	}
});

module.exports = FlashMessage;