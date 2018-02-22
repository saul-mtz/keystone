'use strict';

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _xhr = require('xhr');

var _xhr2 = _interopRequireDefault(_xhr);

var _Alert = require('./components/Alert');

var _Alert2 = _interopRequireDefault(_Alert);

var _Brand = require('./components/Brand');

var _Brand2 = _interopRequireDefault(_Brand);

var _UserInfo = require('./components/UserInfo');

var _UserInfo2 = _interopRequireDefault(_UserInfo);

var _LoginForm = require('./components/LoginForm');

var _LoginForm2 = _interopRequireDefault(_LoginForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The actual Sign In view, with the login form
 */

var SigninView = _react2.default.createClass({
	displayName: 'SigninView',

	getInitialState() {
		return {
			email: '',
			password: '',
			isAnimating: false,
			isInvalid: false,
			invalidMessage: '',
			signedOut: window.location.search === '?signedout'
		};
	},
	componentDidMount() {
		// Focus the email field when we're mounted
		if (this.refs.email) {
			this.refs.email.select();
		}
	},
	handleInputChange(e) {
		// Set the new state when the input changes
		const newState = {};
		newState[e.target.name] = e.target.value;
		this.setState(newState);
	},
	handleSubmit(e) {
		e.preventDefault();
		// If either password or mail are missing, show an error
		if (!this.state.email || !this.state.password) {
			return this.displayError('Please enter an email address and password to sign in.');
		}

		(0, _xhr2.default)({
			url: `${Keystone.adminPath}/api/session/signin`,
			method: 'post',
			json: {
				email: this.state.email,
				password: this.state.password
			},
			headers: (0, _objectAssign2.default)({}, Keystone.csrf.header)
		}, (err, resp, body) => {
			if (err || body && body.error) {
				return body.error === 'invalid csrf' ? this.displayError('Something went wrong; please refresh your browser and try again.') : this.displayError('The email and password you entered are not valid.');
			} else {
				// Redirect to where we came from or to the default admin path
				if (Keystone.redirect) {
					top.location.href = Keystone.redirect;
				} else {
					top.location.href = this.props.from ? this.props.from : Keystone.adminPath;
				}
			}
		});
	},
	/**
  * Display an error message
  *
  * @param  {String} message The message you want to show
  */
	displayError(message) {
		this.setState({
			isAnimating: true,
			isInvalid: true,
			invalidMessage: message
		});
		setTimeout(this.finishAnimation, 750);
	},
	// Finish the animation and select the email field
	finishAnimation() {
		// TODO isMounted was deprecated, find out if we need this guard
		if (!this.isMounted()) return;
		if (this.refs.email) {
			this.refs.email.select();
		}
		this.setState({
			isAnimating: false
		});
	},
	render() {
		const boxClassname = (0, _classnames2.default)('auth-box', {
			'auth-box--has-errors': this.state.isAnimating
		});
		return _react2.default.createElement(
			'div',
			{ className: 'auth-wrapper' },
			_react2.default.createElement(_Alert2.default, {
				isInvalid: this.state.isInvalid,
				signedOut: this.state.signedOut,
				invalidMessage: this.state.invalidMessage
			}),
			_react2.default.createElement(
				'div',
				{ className: boxClassname },
				_react2.default.createElement(
					'h1',
					{ className: 'u-hidden-visually' },
					this.props.brand ? this.props.brand : 'Keystone',
					' Sign In '
				),
				_react2.default.createElement(
					'div',
					{ className: 'auth-box__inner' },
					_react2.default.createElement(_Brand2.default, {
						logo: this.props.logo,
						brand: this.props.brand
					}),
					this.props.user ? _react2.default.createElement(_UserInfo2.default, {
						adminPath: this.props.from ? this.props.from : Keystone.adminPath,
						signoutPath: `${Keystone.adminPath}/signout`,
						userCanAccessKeystone: this.props.userCanAccessKeystone,
						userName: this.props.user.name
					}) : _react2.default.createElement(_LoginForm2.default, {
						email: this.state.email,
						handleInputChange: this.handleInputChange,
						handleSubmit: this.handleSubmit,
						isAnimating: this.state.isAnimating,
						password: this.state.password
					})
				)
			),
			_react2.default.createElement(
				'div',
				{ className: 'auth-footer' },
				_react2.default.createElement(
					'span',
					null,
					'Powered by '
				),
				_react2.default.createElement(
					'a',
					{ href: 'http://keystonejs.com', target: '_blank', title: 'The Node.js CMS and web application platform (new window)' },
					'KeystoneJS'
				)
			)
		);
	}
});

module.exports = SigninView;