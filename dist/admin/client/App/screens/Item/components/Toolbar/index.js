'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Toolbar = props => _react2.default.createElement('div', _extends({}, props, { className: 'Toolbar' }));

Toolbar.displayName = 'Toolbar';
Toolbar.propTypes = {
	children: _react.PropTypes.node.isRequired
};

module.exports = Toolbar;