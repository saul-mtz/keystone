'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _FlashMessage = require('./FlashMessage');

var _FlashMessage2 = _interopRequireDefault(_FlashMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FlashMessages = _react2.default.createClass({
	displayName: 'FlashMessages',
	propTypes: {
		messages: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.bool, _react2.default.PropTypes.shape({
			error: _react2.default.PropTypes.array,
			hilight: _react2.default.PropTypes.array,
			info: _react2.default.PropTypes.array,
			success: _react2.default.PropTypes.array,
			warning: _react2.default.PropTypes.array
		})])
	},
	// Render messages by their type
	renderMessages(messages, type) {
		if (!messages || !messages.length) return null;

		return messages.map((message, i) => {
			return _react2.default.createElement(_FlashMessage2.default, { message: message, type: type, key: `i${i}` });
		});
	},
	// Render the individual messages based on their type
	renderTypes(types) {
		return Object.keys(types).map(type => this.renderMessages(types[type], type));
	},
	render() {
		if (!this.props.messages) return null;

		return _react2.default.createElement(
			'div',
			{ className: 'flash-messages' },
			_lodash2.default.isPlainObject(this.props.messages) && this.renderTypes(this.props.messages)
		);
	}
}); /**
     * Render a few flash messages, e.g. errors, success messages, warnings,...
     *
     * Use like this:
     * <FlashMessages
     *   messages={{
     *	   error: [{
     *	     title: 'There is a network problem',
     *	     detail: 'Please try again later...',
     *	   }],
     *   }}
     * />
     *
     * Instead of error, it can also be hilight, info, success or warning
     */

module.exports = FlashMessages;