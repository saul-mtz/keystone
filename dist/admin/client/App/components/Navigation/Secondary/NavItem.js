'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A navigation item of the secondary navigation
 */

const SecondaryNavItem = _react2.default.createClass({
	displayName: 'SecondaryNavItem',
	propTypes: {
		children: _react2.default.PropTypes.node.isRequired,
		className: _react2.default.PropTypes.string,
		href: _react2.default.PropTypes.string.isRequired,
		onClick: _react2.default.PropTypes.func,
		path: _react2.default.PropTypes.string,
		title: _react2.default.PropTypes.string
	},
	render() {
		return _react2.default.createElement(
			'li',
			{ className: this.props.className, 'data-list-path': this.props.path },
			_react2.default.createElement(
				_reactRouter.Link,
				{
					to: this.props.href,
					onClick: this.props.onClick,
					title: this.props.title,
					tabIndex: '-1'
				},
				this.props.children
			)
		);
	}
});

module.exports = SecondaryNavItem;