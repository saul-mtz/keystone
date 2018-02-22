'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _vkey = require('vkey');

var _vkey2 = _interopRequireDefault(_vkey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

class AltText extends _react.Component {
	constructor() {
		super();

		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);

		this.state = {
			modified: false
		};
	}
	componentDidMount() {
		document.body.addEventListener('keydown', this.handleKeyDown, false);
		document.body.addEventListener('keyup', this.handleKeyUp, false);
	}
	componentWillUnmount() {
		document.body.removeEventListener('keydown', this.handleKeyDown);
		document.body.removeEventListener('keyup', this.handleKeyUp);
	}
	handleKeyDown(e) {
		if (_vkey2.default[e.keyCode] !== this.props.modifier) return;
		this.setState({
			modified: true
		});
	}
	handleKeyUp(e) {
		if (_vkey2.default[e.keyCode] !== this.props.modifier) return;
		this.setState({
			modified: false
		});
	}
	render() {
		// NOTE `modifier` is declared to remove it from `props`, though never used
		const _props = this.props,
		      {
			component: Component,
			modified,
			modifier, // eslint-disable-line no-unused-vars
			normal
		} = _props,
		      props = _objectWithoutProperties(_props, ['component', 'modified', 'modifier', 'normal']);

		props.children = this.state.modified ? modified : normal;

		return _react2.default.createElement(Component, props);
	}
};

const SUPPORTED_KEYS = ['<alt>', '<control>', '<meta>', '<shift>'];

AltText.propTypes = {
	component: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.string]),
	modified: _react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.string]),
	modifier: _react.PropTypes.oneOf(SUPPORTED_KEYS),
	normal: _react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.string])
};
AltText.defaultProps = {
	component: 'span',
	modifier: '<alt>'
};

module.exports = AltText;