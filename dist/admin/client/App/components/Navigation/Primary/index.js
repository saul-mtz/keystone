'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../../elemental');

var _NavItem = require('./NavItem');

var _NavItem2 = _interopRequireDefault(_NavItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PrimaryNavigation = _react2.default.createClass({
	displayName: 'PrimaryNavigation',
	propTypes: {
		brand: _react2.default.PropTypes.string,
		currentSectionKey: _react2.default.PropTypes.string,
		sections: _react2.default.PropTypes.array.isRequired,
		signoutUrl: _react2.default.PropTypes.string
	},
	getInitialState() {
		return {};
	},
	// Handle resizing, hide this navigation on mobile (i.e. < 768px) screens
	componentDidMount() {
		this.handleResize();
		window.addEventListener('resize', this.handleResize);
	},
	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	},
	handleResize() {
		this.setState({
			navIsVisible: window.innerWidth >= 768
		});
	},
	// Render the sign out button
	renderSignout() {
		if (!this.props.signoutUrl) return null;

		return _react2.default.createElement(
			_NavItem2.default,
			{
				label: 'octicon-sign-out',
				href: this.props.signoutUrl,
				title: 'Sign Out'
			},
			_react2.default.createElement('span', { className: 'octicon octicon-sign-out' })
		);
	},
	// Render the back button
	renderBackButton() {
		if (!Keystone.backUrl) return null;

		return _react2.default.createElement(
			_NavItem2.default,
			{
				label: 'octicon-globe',
				href: Keystone.backUrl,
				title: 'Front page - ' + this.props.brand
			},
			_react2.default.createElement('span', { className: 'octicon octicon-globe' })
		);
	},
	// Render the link to the webpage
	renderFrontLink() {
		return _react2.default.createElement(
			'ul',
			{ className: 'app-nav app-nav--primary app-nav--right' },
			this.renderBackButton(),
			this.renderSignout()
		);
	},
	renderBrand() {
		// TODO: support navbarLogo from keystone config

		const { brand, currentSectionKey } = this.props;
		const className = currentSectionKey === 'dashboard' ? 'primary-navbar__brand primary-navbar__item--active' : 'primary-navbar__brand';

		return _react2.default.createElement(
			_NavItem2.default,
			{
				className: className,
				label: 'octicon-home',
				title: 'Dashboard - ' + brand,
				to: Keystone.adminPath
			},
			_react2.default.createElement('span', { className: 'octicon octicon-home' })
		);
	},
	// Render the navigation
	renderNavigation() {
		if (!this.props.sections || !this.props.sections.length) return null;

		return this.props.sections.map(section => {
			// Get the link and the class name
			const href = section.lists[0].external ? section.lists[0].path : `${Keystone.adminPath}/${section.lists[0].path}`;
			const isActive = this.props.currentSectionKey && this.props.currentSectionKey === section.key;
			const className = isActive ? 'primary-navbar__item--active' : null;

			return _react2.default.createElement(
				_NavItem2.default,
				{
					active: isActive,
					key: section.key,
					label: section.label,
					className: className,
					to: href
				},
				section.label
			);
		});
	},
	render() {
		if (!this.state.navIsVisible) return null;

		return _react2.default.createElement(
			'nav',
			{ className: 'primary-navbar' },
			_react2.default.createElement(
				_elemental.Container,
				{ clearFloatingChildren: true },
				_react2.default.createElement(
					'ul',
					{ className: 'app-nav app-nav--primary app-nav--left' },
					this.renderBrand(),
					this.renderNavigation()
				),
				this.renderFrontLink()
			)
		);
	}
}); /**
     * The primary (i.e. uppermost) navigation on desktop. Renders all sections and
     * the home-, website- and signout buttons.
     */

module.exports = PrimaryNavigation;