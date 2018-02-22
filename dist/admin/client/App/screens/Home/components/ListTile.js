'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Displays information about a list and lets you create a new one.
 */
var ListTile = _react2.default.createClass({
	displayName: 'ListTile',

	propTypes: {
		count: _react2.default.PropTypes.string,
		hideCreateButton: _react2.default.PropTypes.bool,
		href: _react2.default.PropTypes.string,
		label: _react2.default.PropTypes.string,
		path: _react2.default.PropTypes.string,
		spinner: _react2.default.PropTypes.object
	},
	render() {
		var opts = {
			'data-list-path': this.props.path
		};
		return _react2.default.createElement(
			'div',
			_extends({ className: 'dashboard-group__list' }, opts),
			_react2.default.createElement(
				'span',
				{ className: 'dashboard-group__list-inner' },
				_react2.default.createElement(
					_reactRouter.Link,
					{ to: this.props.href, className: 'dashboard-group__list-tile' },
					_react2.default.createElement(
						'div',
						{ className: 'dashboard-group__list-label' },
						this.props.label
					),
					_react2.default.createElement(
						'div',
						{ className: 'dashboard-group__list-count' },
						this.props.spinner || this.props.count
					)
				),
				!this.props.hideCreateButton && _react2.default.createElement(_reactRouter.Link, {
					to: this.props.href + '?create',
					className: 'dashboard-group__list-create octicon octicon-plus',
					title: 'Create',
					tabIndex: '-1'
				})
			)
		);
	}
});

module.exports = ListTile;