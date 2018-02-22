'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A list item of the mobile navigation
 */

const MobileListItem = _react2.default.createClass({
	displayName: 'MobileListItem',
	propTypes: {
		children: _react2.default.PropTypes.node.isRequired,
		className: _react2.default.PropTypes.string,
		href: _react2.default.PropTypes.string.isRequired,
		onClick: _react2.default.PropTypes.func
	},
	render() {
		return _react2.default.createElement(
			_reactRouter.Link,
			{
				className: this.props.className,
				to: this.props.href,
				onClick: this.props.onClick,
				tabIndex: '-1'
			},
			this.props.children
		);
	}
});

module.exports = MobileListItem;