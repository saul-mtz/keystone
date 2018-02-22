'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PrimaryNavItem = ({ children, className, href, label, title, to, active }) => {
	const itemClassName = (0, _classnames2.default)('primary-navbar__item', className);

	const Button = to ? _react2.default.createElement(
		_reactRouter.Link,
		{
			className: 'primary-navbar__link',
			key: title,
			tabIndex: '-1',
			title: title,
			to: to
			// Block clicks on active link
			, onClick: evt => {
				if (active) evt.preventDefault();
			}
		},
		children
	) : _react2.default.createElement(
		'a',
		{
			className: 'primary-navbar__link',
			href: href,
			key: title,
			tabIndex: '-1',
			title: title
		},
		children
	);

	return _react2.default.createElement(
		'li',
		{
			className: itemClassName,
			'data-section-label': label
		},
		Button
	);
}; /**
    * A item in the primary navigation. If it has a "to" prop it'll render a
    * react-router "Link", if it has a "href" prop it'll render a simple "a" tag
    */

PrimaryNavItem.displayName = 'PrimaryNavItem';
PrimaryNavItem.propTypes = {
	children: _react.PropTypes.node.isRequired,
	className: _react.PropTypes.string,
	href: _react.PropTypes.string,
	label: _react.PropTypes.string,
	title: _react.PropTypes.string,
	to: _react.PropTypes.string
};

module.exports = PrimaryNavItem;