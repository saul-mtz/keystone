'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ListItem = require('./ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MobileSectionItem = _react2.default.createClass({
	displayName: 'MobileSectionItem',
	propTypes: {
		children: _react2.default.PropTypes.node.isRequired,
		className: _react2.default.PropTypes.string,
		currentListKey: _react2.default.PropTypes.string,
		href: _react2.default.PropTypes.string.isRequired,
		lists: _react2.default.PropTypes.array
	},
	// Render the lists
	renderLists() {
		if (!this.props.lists || this.props.lists.length <= 1) return null;

		const navLists = this.props.lists.map(item => {
			// Get the link and the classname
			const href = item.external ? item.path : `${Keystone.adminPath}/${item.path}`;
			const className = this.props.currentListKey && this.props.currentListKey === item.path ? 'MobileNavigation__list-item is-active' : 'MobileNavigation__list-item';

			return _react2.default.createElement(
				_ListItem2.default,
				{ key: item.path, href: href, className: className, onClick: this.props.onClick },
				item.label
			);
		});

		return _react2.default.createElement(
			'div',
			{ className: 'MobileNavigation__lists' },
			navLists
		);
	},
	render() {
		return _react2.default.createElement(
			'div',
			{ className: this.props.className },
			_react2.default.createElement(
				_reactRouter.Link,
				{
					className: 'MobileNavigation__section-item',
					to: this.props.href,
					tabIndex: '-1',
					onClick: this.props.onClick
				},
				this.props.children
			),
			this.renderLists()
		);
	}
}); /**
     * A mobile section
     */

module.exports = MobileSectionItem;