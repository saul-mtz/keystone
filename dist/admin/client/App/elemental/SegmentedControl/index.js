'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _noImportant = require('aphrodite/no-important');

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var _colors = require('./colors');

var _colors2 = _interopRequireDefault(_colors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const classes = _noImportant.StyleSheet.create(_styles2.default);

function SegmentedControl(_ref) {
	let {
		className,
		color,
		cropText,
		equalWidthSegments,
		inline,
		onChange,
		options,
		value
	} = _ref,
	    props = _objectWithoutProperties(_ref, ['className', 'color', 'cropText', 'equalWidthSegments', 'inline', 'onChange', 'options', 'value']);

	props.className = (0, _noImportant.css)(classes.control, inline ? classes.control__inline : null, className);

	return _react2.default.createElement(
		'div',
		props,
		options.map(opt => {
			const buttonClassName = (0, _noImportant.css)(classes.button, opt.disabled ? classes.button__disabled : null, opt.value === value ? classes['button__' + color] : null, cropText ? classes.button__cropText : null, equalWidthSegments ? classes.button__equalWidth : null);

			return _react2.default.createElement(
				'button',
				{
					className: buttonClassName,
					key: opt.value,
					onClick: !opt.disabled && (() => onChange(opt.value)),
					type: 'button',
					title: cropText ? opt.label : null,
					tabIndex: opt.disabled ? '-1' : ''
				},
				opt.label
			);
		})
	);
};

const valuePropShape = [_react.PropTypes.bool, _react.PropTypes.number, _react.PropTypes.string];

SegmentedControl.propTypes = {
	color: _react.PropTypes.oneOf(Object.keys(_colors2.default)),
	cropText: _react.PropTypes.bool, // when `inline && equalWidthSegments` crops to the next largest option length
	equalWidthSegments: _react.PropTypes.bool, // only relevant when `inline === false`
	inline: _react.PropTypes.bool,
	onChange: _react.PropTypes.func.isRequired,
	options: _react.PropTypes.arrayOf(_react.PropTypes.shape({
		disabled: _react.PropTypes.bool,
		label: _react.PropTypes.string,
		value: _react.PropTypes.oneOfType(valuePropShape)
	})).isRequired,
	value: _react.PropTypes.oneOfType(valuePropShape)
};
SegmentedControl.defaultProps = {
	color: 'default'
};

module.exports = SegmentedControl;