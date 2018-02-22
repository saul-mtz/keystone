'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // ==============================
// Button
// ==============================

var _css = require('../../../utils/css');

var _color = require('../../../utils/color');

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Common Styles
// ----------------

exports.common = {
	// Base Button
	// ----------------
	base: {
		'appearance': 'none',
		'background': 'none',
		'borderWidth': _theme2.default.button.borderWidth,
		'borderStyle': 'solid',
		'borderColor': 'transparent',
		'borderRadius': _theme2.default.button.borderRadius,
		'cursor': 'pointer',
		'display': 'inline-block',
		'fontWeight': _theme2.default.button.font.weight,
		'height': _theme2.default.component.height,
		'lineHeight': _theme2.default.component.lineHeight,
		'marginBottom': 0,
		'padding': `0 ${_theme2.default.button.paddingHorizontal}`,
		'outline': 0,
		'textAlign': 'center',
		'touchAction': 'manipulation',
		'userSelect': 'none',
		'verticalAlign': 'middle',
		'whiteSpace': 'nowrap',

		':hover': {
			color: _theme2.default.button.default.textColor,
			textDecoration: 'none'
		},
		':focus': {
			color: _theme2.default.button.default.textColor,
			textDecoration: 'none'
		}
	},
	// Block Display
	// ----------------
	block: {
		display: 'block',
		width: '100%'
	},
	// Disabled
	// ----------------
	disabled: {
		opacity: 0.4,
		pointerEvents: 'none'
	},
	// Sizes
	// ----------------
	large: {
		fontSize: _theme2.default.font.size.large
	},
	default: {
		fontSize: _theme2.default.font.size.default
	},
	small: {
		fontSize: _theme2.default.font.size.small
	},
	xsmall: {
		fontSize: _theme2.default.font.size.xsmall,
		lineHeight: '1.9',
		paddingLeft: '.66em',
		paddingRight: '.66em'
	}
};

// Fill Variant
// ----------------
function buttonFillVariant(textColor, bgColor) {
	const hoverStyles = _extends({}, (0, _css.gradientVertical)((0, _color.lighten)(bgColor, 10), (0, _color.darken)(bgColor, 5)), {
		borderColor: `${(0, _color.darken)(bgColor, 5)} ${(0, _color.darken)(bgColor, 10)} ${(0, _color.darken)(bgColor, 15)}`,
		boxShadow: '0 1px 0 rgba(0,0,0,0.1)',
		color: textColor,
		outline: 'none'
	});
	const focusStyles = _extends({}, (0, _css.gradientVertical)((0, _color.lighten)(bgColor, 10), (0, _color.darken)(bgColor, 5)), {
		borderColor: `${(0, _color.darken)(bgColor, 5)} ${(0, _color.darken)(bgColor, 10)} ${(0, _color.darken)(bgColor, 15)}`,
		boxShadow: `0 0 0 3px ${(0, _color.fade)(bgColor, 25)}`,
		color: textColor,
		outline: 'none'
	});
	const activeStyles = {
		backgroundColor: (0, _color.darken)(bgColor, 10),
		backgroundImage: 'none',
		borderColor: `${(0, _color.darken)(bgColor, 25)} ${(0, _color.darken)(bgColor, 15)} ${(0, _color.darken)(bgColor, 10)}`,
		boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)'
	};
	return {
		base: _extends({}, (0, _css.gradientVertical)((0, _color.lighten)(bgColor, 5), (0, _color.darken)(bgColor, 10), bgColor), {
			'borderColor': `${(0, _color.darken)(bgColor, 10)} ${(0, _color.darken)(bgColor, 20)} ${(0, _color.darken)(bgColor, 25)}`,
			'boxShadow': 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
			'color': textColor,
			'fontWeight': 400,
			'textShadow': '0 -1px 0 rgba(0, 0, 0, 0.25)',

			':hover': hoverStyles,
			':focus': focusStyles,
			':active': activeStyles
		}),
		active: activeStyles
	};
}
// TODO: This is pretty hacky, needs to be consolidated with the Variant() method
// above (needs more theme variables to be implemented though)
function buttonFillDefault() {
	const borderColor = _theme2.default.input.border.color.default;
	const hoverStyles = _extends({}, (0, _css.gradientVertical)('#fff', '#eee'), {
		borderColor: `${(0, _color.darken)(borderColor, 5)} ${(0, _color.darken)(borderColor, 5)} ${(0, _color.darken)(borderColor, 10)}`,
		boxShadow: '0 1px 0 rgba(0,0,0,0.1)',
		color: _theme2.default.color.text
	});
	const focusStyles = {
		borderColor: _theme2.default.color.primary,
		boxShadow: `0 0 0 3px ${(0, _color.fade)(_theme2.default.color.primary, 10)}`,
		color: _theme2.default.color.text,
		outline: 'none'
	};
	const activeStyles = {
		background: '#e6e6e6',
		borderColor: (0, _color.darken)(borderColor, 10),
		boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
		color: _theme2.default.color.text
	};
	return {
		base: _extends({}, (0, _css.gradientVertical)('#fafafa', '#eaeaea'), {
			'borderColor': `${borderColor} ${(0, _color.darken)(borderColor, 6)} ${(0, _color.darken)(borderColor, 12)}`,
			'color': _theme2.default.color.text,
			'textShadow': '0 1px 0 white',

			':hover': hoverStyles,
			':focus': focusStyles,
			':active': activeStyles
		}),

		// gross hack
		active: _extends({}, activeStyles, {

			':hover': activeStyles,
			':focus': _extends({}, activeStyles, focusStyles, {
				boxShadow: `0 0 0 3px ${(0, _color.fade)(_theme2.default.color.primary, 10)}, inset 0 1px 2px rgba(0, 0, 0, 0.1)`
			}),
			':active': activeStyles
		})
	};
}
exports.fill = color => {
	switch (color) {
		case 'default':
			return buttonFillDefault();
		case 'cancel':
		case 'delete':
			return buttonFillVariant('white', _theme2.default.button.danger.bgColor);
		default:
			return buttonFillVariant('white', _theme2.default.button[color].bgColor);
	}
};

// Hollow Variant
// ----------------
function buttonHollowVariant(textColor, borderColor) {
	const focusAndHoverStyles = {
		backgroundImage: 'none',
		backgroundColor: (0, _color.fade)(borderColor, 15),
		borderColor: (0, _color.darken)(borderColor, 15),
		boxShadow: 'none',
		color: textColor,
		outline: 'none'
	};
	const focusOnlyStyles = {
		boxShadow: `0 0 0 3px ${(0, _color.fade)(borderColor, 10)}`
	};
	const activeStyles = {
		backgroundColor: (0, _color.fade)(borderColor, 35),
		borderColor: (0, _color.darken)(borderColor, 25),
		boxShadow: 'none'
	};

	return {
		base: {
			'background': 'none',
			'borderColor': borderColor,
			'color': textColor,

			':hover': focusAndHoverStyles,
			':focus ': Object.assign({}, focusAndHoverStyles, focusOnlyStyles),
			':active': activeStyles
		},
		active: activeStyles
	};
};
exports.hollow = color => {
	// TODO: better handling of cancel and delete colors
	if (color === 'cancel' || color === 'delete') color = 'danger';

	return buttonHollowVariant(_theme2.default.button[color].bgColor, _theme2.default.button[color].borderColor);
};

// Link Variant
// ----------------
function buttonLinkVariant(textColor, hoverColor) {
	const hoverStyles = {
		color: hoverColor,
		textDecoration: 'underline'
	};
	return {
		base: {
			'background': 'none',
			'border': 0,
			'boxShadow': 'none',
			'color': textColor,
			'fontWeight': 'normal',
			'outline': 'none',

			':hover': hoverStyles,
			':focus': hoverStyles,
			':active': hoverStyles
		},
		active: hoverStyles
	};
};
function buttonLinkDelete() {
	const styles = buttonLinkVariant(_theme2.default.color.gray40, _theme2.default.color.danger);
	const hoverStyles = _extends({}, (0, _css.gradientVertical)((0, _color.lighten)(_theme2.default.color.danger, 10), (0, _color.darken)(_theme2.default.color.danger, 10)), {
		backgroundColor: _theme2.default.color.danger,
		borderColor: `${(0, _color.darken)(_theme2.default.color.danger, 4)} ${(0, _color.darken)(_theme2.default.color.danger, 8)} ${(0, _color.darken)(_theme2.default.color.danger, 12)}`,
		boxShadow: '0 1px 0 rgba(0,0,0,0.1)',
		color: 'white',
		textDecoration: 'none'
	});
	const activeStyles = {
		backgroundColor: (0, _color.darken)(_theme2.default.color.danger, 4),
		backgroundImage: 'none',
		borderColor: `${(0, _color.darken)(_theme2.default.color.danger, 12)} ${(0, _color.darken)(_theme2.default.color.danger, 8)} ${(0, _color.darken)(_theme2.default.color.danger, 8)}`,
		boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
		color: 'white'
	};
	return {
		base: _extends({}, styles.base, {
			':hover': hoverStyles,
			':focus': hoverStyles,
			':active': activeStyles
		}),
		active: activeStyles
	};
}

exports.link = color => {
	switch (color) {
		case 'default':
			return buttonLinkVariant(_theme2.default.color.link, _theme2.default.color.linkHover);
		case 'cancel':
			return buttonLinkVariant(_theme2.default.color.gray40, _theme2.default.color.danger);
		case 'delete':
			return buttonLinkDelete();
		default:
			return buttonLinkVariant(_theme2.default.color[color], _theme2.default.color[color]);
	}
};