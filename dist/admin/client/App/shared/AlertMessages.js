'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../elemental');

var _string = require('../../utils/string');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This renders alerts for API success and error responses.
 *   Error format: {
 *     error: 'validation errors' // The unique error type identifier
 *     detail: { ... } // Optional details specific to that error type
 *   }
 *   Success format: {
 *     success: 'item updated', // The unique success type identifier
 *     details: { ... } // Optional details specific to that success type
 *   }
 *   Eventually success and error responses should be handled individually
 *   based on their type. For example: validation errors should be displayed next
 *   to each invalid field and signin errors should promt the user to sign in.
 */
var AlertMessages = _react2.default.createClass({
	displayName: 'AlertMessages',
	propTypes: {
		alerts: _react2.default.PropTypes.shape({
			error: _react2.default.PropTypes.Object,
			success: _react2.default.PropTypes.Object
		})
	},
	getDefaultProps() {
		return {
			alerts: {}
		};
	},
	renderValidationErrors() {
		let errors = this.props.alerts.error.detail;
		if (errors.name === 'ValidationError') {
			errors = errors.errors;
		}
		let errorCount = Object.keys(errors).length;
		let alertContent;
		let messages = Object.keys(errors).map(path => {
			if (errorCount > 1) {
				return _react2.default.createElement(
					'li',
					{ key: path },
					(0, _string.upcase)(errors[path].error || errors[path].message)
				);
			} else {
				return _react2.default.createElement(
					'div',
					{ key: path },
					(0, _string.upcase)(errors[path].error || errors[path].message)
				);
			}
		});

		if (errorCount > 1) {
			alertContent = _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'h4',
					null,
					'There were ',
					errorCount,
					' errors creating the new item:'
				),
				_react2.default.createElement(
					'ul',
					null,
					messages
				)
			);
		} else {
			alertContent = messages;
		}

		return _react2.default.createElement(
			_elemental.Alert,
			{ color: 'danger' },
			alertContent
		);
	},
	render() {
		let { error, success } = this.props.alerts;

		if (error) {
			// Render error alerts
			switch (error.error) {
				case 'validation errors':
					return this.renderValidationErrors();
				case 'error':
					if (error.detail.name === 'ValidationError') {
						return this.renderValidationErrors();
					} else {
						return _react2.default.createElement(
							_elemental.Alert,
							{ color: 'danger' },
							(0, _string.upcase)(error.error)
						);
					}
				default:
					return _react2.default.createElement(
						_elemental.Alert,
						{ color: 'danger' },
						(0, _string.upcase)(error.error)
					);
			}
		}

		if (success) {
			// Render success alerts
			return _react2.default.createElement(
				_elemental.Alert,
				{ color: 'success' },
				(0, _string.upcase)(success.success)
			);
		}

		return null; // No alerts, render nothing
	}
});

module.exports = AlertMessages;