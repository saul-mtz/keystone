'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _reactDom = require('react-dom');

var _PassContext = require('../PassContext');

var _PassContext2 = _interopRequireDefault(_PassContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Portal extends _react.Component {
	constructor() {
		super();
		this.portalElement = null;
	}
	componentDidMount() {
		const p = document.createElement('div');
		document.body.appendChild(p);
		this.portalElement = p;
		this.componentDidUpdate();
	}
	componentDidUpdate() {
		// Animate fade on mount/unmount
		const duration = 200;
		const styles = `
				.fade-enter { opacity: 0.01; }
				.fade-enter.fade-enter-active { opacity: 1; transition: opacity ${duration}ms; }
				.fade-leave { opacity: 1; }
				.fade-leave.fade-leave-active { opacity: 0.01; transition: opacity ${duration}ms; }
		`;
		(0, _reactDom.render)(_react2.default.createElement(
			_PassContext2.default,
			{ context: this.context },
			_react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'style',
					null,
					styles
				),
				_react2.default.createElement(_reactAddonsCssTransitionGroup2.default, _extends({
					component: 'div',
					transitionName: 'fade',
					transitionEnterTimeout: duration,
					transitionLeaveTimeout: duration
				}, this.props))
			)
		), this.portalElement);
	}
	componentWillUnmount() {
		document.body.removeChild(this.portalElement);
	}
	render() {
		return null;
	}
}

exports.default = Portal;
Portal.contextTypes = {
	onClose: _react.PropTypes.func
};