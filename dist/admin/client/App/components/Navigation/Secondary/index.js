'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _elemental = require('../../../elemental');

var _active = require('../../../screens/List/actions/active');

var _NavItem = require('./NavItem');

var _NavItem2 = _interopRequireDefault(_NavItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SecondaryNavigation = _react2.default.createClass({
	displayName: 'SecondaryNavigation',
	propTypes: {
		currentListKey: _react2.default.PropTypes.string,
		lists: _react2.default.PropTypes.array.isRequired
	},
	getInitialState() {
		return {};
	},
	// Handle resizing and hide this nav on mobile (i.e. < 768px) screens
	componentDidMount() {
		this.handleResize();
		window.addEventListener('resize', this.handleResize);
	},
	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	},
	handleResize() {
		this.setState({
			navIsVisible: this.props.lists && Object.keys(this.props.lists).length > 0 && window.innerWidth >= 768
		});
	},
	// Render the navigation
	renderNavigation(lists) {
		const navigation = Object.keys(lists).map(key => {
			const list = lists[key];
			// Get the link and the classname
			const href = list.external ? list.path : `${Keystone.adminPath}/${list.path}`;
			const isActive = this.props.currentListKey && this.props.currentListKey === list.path;
			const className = isActive ? 'active' : null;
			const onClick = evt => {
				// If it's the currently active navigation item and we're not on the item view,
				// clear the query params on click
				if (isActive && !this.props.itemId) {
					evt.preventDefault();
					this.props.dispatch((0, _active.setActiveList)(this.props.currentList, this.props.currentListKey));
				}
			};

			return _react2.default.createElement(
				_NavItem2.default,
				{
					key: list.path,
					path: list.path,
					className: className,
					href: href,
					onClick: onClick
				},
				list.label
			);
		});

		return _react2.default.createElement(
			'ul',
			{ className: 'app-nav app-nav--secondary app-nav--left' },
			navigation
		);
	},
	render() {
		if (!this.state.navIsVisible) return null;

		return _react2.default.createElement(
			'nav',
			{ className: 'secondary-navbar' },
			_react2.default.createElement(
				_elemental.Container,
				{ clearFloatingChildren: true },
				this.renderNavigation(this.props.lists)
			)
		);
	}
}); /**
     * The secondary navigation links to inidvidual lists of a section
     */

module.exports = (0, _reactRedux.connect)(state => {
	return {
		currentList: state.lists.currentList
	};
})(SecondaryNavigation);