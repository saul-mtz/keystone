'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _SectionItem = require('./SectionItem');

var _SectionItem2 = _interopRequireDefault(_SectionItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ESCAPE_KEY_CODE = 27; /**
                             * The mobile navigation, displayed on screens < 768px
                             */

const MobileNavigation = _react2.default.createClass({
	displayName: 'MobileNavigation',
	propTypes: {
		brand: _react2.default.PropTypes.string,
		currentListKey: _react2.default.PropTypes.string,
		currentSectionKey: _react2.default.PropTypes.string,
		sections: _react2.default.PropTypes.array.isRequired,
		signoutUrl: _react2.default.PropTypes.string
	},
	getInitialState() {
		return {
			barIsVisible: false
		};
	},
	// Handle showing and hiding the menu based on the window size when
	// resizing
	componentDidMount() {
		this.handleResize();
		window.addEventListener('resize', this.handleResize);
	},
	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	},
	handleResize() {
		this.setState({
			barIsVisible: window.innerWidth < 768
		});
	},
	// Toggle the menu
	toggleMenu() {
		this[this.state.menuIsVisible ? 'hideMenu' : 'showMenu']();
	},
	// Show the menu
	showMenu() {
		this.setState({
			menuIsVisible: true
		});

		// Make the body unscrollable, so you can only scroll in the menu
		document.body.style.overflow = 'hidden';
		document.body.addEventListener('keyup', this.handleEscapeKey, false);
	},
	// Hide the menu
	hideMenu() {
		this.setState({
			menuIsVisible: false
		});

		// Make the body scrollable again
		document.body.style.overflow = null;
		document.body.removeEventListener('keyup', this.handleEscapeKey, false);
	},
	// If the escape key was pressed, hide the menu
	handleEscapeKey(event) {
		if (event.which === ESCAPE_KEY_CODE) {
			this.hideMenu();
		}
	},
	renderNavigation() {
		if (!this.props.sections || !this.props.sections.length) return null;

		return this.props.sections.map(section => {
			// Get the link and the classname
			const href = section.lists[0].external ? section.lists[0].path : `${Keystone.adminPath}/${section.lists[0].path}`;
			const className = this.props.currentSectionKey && this.props.currentSectionKey === section.key ? 'MobileNavigation__section is-active' : 'MobileNavigation__section';

			// Render a SectionItem
			return _react2.default.createElement(
				_SectionItem2.default,
				{
					key: section.key,
					className: className,
					href: href,
					lists: section.lists,
					currentListKey: this.props.currentListKey,
					onClick: this.toggleMenu
				},
				section.label
			);
		});
	},
	// Render a blockout
	renderBlockout() {
		if (!this.state.menuIsVisible) return null;

		return _react2.default.createElement('div', { className: 'MobileNavigation__blockout', onClick: this.toggleMenu });
	},
	// Render the sidebar menu
	renderMenu() {
		if (!this.state.menuIsVisible) return null;

		return _react2.default.createElement(
			'nav',
			{ className: 'MobileNavigation__menu' },
			_react2.default.createElement(
				'div',
				{ className: 'MobileNavigation__sections' },
				this.renderNavigation()
			)
		);
	},
	render() {
		if (!this.state.barIsVisible) return null;

		return _react2.default.createElement(
			'div',
			{ className: 'MobileNavigation' },
			_react2.default.createElement(
				'div',
				{ className: 'MobileNavigation__bar' },
				_react2.default.createElement(
					'button',
					{
						type: 'button',
						onClick: this.toggleMenu,
						className: 'MobileNavigation__bar__button MobileNavigation__bar__button--menu'
					},
					_react2.default.createElement('span', { className: 'MobileNavigation__bar__icon octicon octicon-' + (this.state.menuIsVisible ? 'x' : 'three-bars') })
				),
				_react2.default.createElement(
					'span',
					{ className: 'MobileNavigation__bar__label' },
					this.props.brand
				),
				_react2.default.createElement(
					'a',
					{
						href: this.props.signoutUrl,
						className: 'MobileNavigation__bar__button MobileNavigation__bar__button--signout'
					},
					_react2.default.createElement('span', { className: 'MobileNavigation__bar__icon octicon octicon-sign-out' })
				)
			),
			_react2.default.createElement('div', { className: 'MobileNavigation__bar--placeholder' }),
			_react2.default.createElement(
				_reactAddonsCssTransitionGroup2.default,
				{
					transitionName: 'MobileNavigation__menu',
					transitionEnterTimeout: 260,
					transitionLeaveTimeout: 200
				},
				this.renderMenu()
			),
			_react2.default.createElement(
				_reactAddonsCssTransitionGroup2.default,
				{
					transitionName: 'react-transitiongroup-fade',
					transitionEnterTimeout: 0,
					transitionLeaveTimeout: 0
				},
				this.renderBlockout()
			)
		);
	}
});

module.exports = MobileNavigation;