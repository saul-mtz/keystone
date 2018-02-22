'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Render a popout pane, calls props.onLayout when the component mounts
                                                                                                                                                                                                                                                                   */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _blacklist = require('blacklist');

var _blacklist2 = _interopRequireDefault(_blacklist);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PopoutPane = _react2.default.createClass({
	displayName: 'PopoutPane',
	propTypes: {
		children: _react2.default.PropTypes.node.isRequired,
		className: _react2.default.PropTypes.string,
		onLayout: _react2.default.PropTypes.func
	},
	getDefaultProps() {
		return {
			onLayout: () => {}
		};
	},
	componentDidMount() {
		this.props.onLayout(this.refs.el.offsetHeight);
	},
	render() {
		const className = (0, _classnames2.default)('Popout__pane', this.props.className);
		const props = (0, _blacklist2.default)(this.props, 'className', 'onLayout');

		return _react2.default.createElement('div', _extends({ ref: 'el', className: className }, props));
	}
});

module.exports = PopoutPane;