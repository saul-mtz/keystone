'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function ToolbarSection(_ref) {
	let { className, left, right } = _ref,
	    props = _objectWithoutProperties(_ref, ['className', 'left', 'right']);

	props.className = (0, _classnames2.default)('Toolbar__section', {
		'Toolbar__section--left': left,
		'Toolbar__section--right': right
	}, className);

	return _react2.default.createElement('div', props);
};

ToolbarSection.propTypes = {
	left: _react.PropTypes.bool,
	right: _react.PropTypes.bool
};

module.exports = ToolbarSection;