'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _noImportant = require('aphrodite/no-important');

var _elemental = require('../../../elemental');

var _theme = require('../../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /* eslint quote-props: ["error", "as-needed"] */

class EditFormHeaderSearch extends _react.Component {
	constructor() {
		super();

		this.focusField = this.focusField.bind(this);
		this.state = { focused: false };
	}
	focusField() {
		this.setState({ focused: true }, () => {
			(0, _reactDom.findDOMNode)(this.refs.target).focus();
		});
	}
	render() {
		const { focused } = this.state;
		const _props = this.props,
		      {
			onChange,
			onKeyUp,
			value
		} = _props,
		      props = _objectWithoutProperties(_props, ['onChange', 'onKeyUp', 'value']);

		return focused ? _react2.default.createElement(
			'div',
			{ className: (0, _noImportant.css)(classes.wrapper) },
			_react2.default.createElement(_elemental.Glyph, {
				aphroditeStyles: classes.glyph,
				color: _theme2.default.color.gray40,
				name: 'search',
				'data-e2e-search-icon': true
			}),
			_react2.default.createElement(_elemental.FormInput, _extends({
				aphroditeStyles: classes.input,
				name: 'search',
				onBlur: () => this.setState({ focused: false }),
				onChange: onChange,
				onKeyUp: onKeyUp,
				placeholder: 'Search',
				ref: 'target',
				type: 'search',
				value: value
			}, props))
		) : _react2.default.createElement(
			_elemental.GlyphButton,
			{
				color: 'primary',
				glyph: 'search',
				glyphStyle: { marginRight: '0.4em' },
				onClick: this.focusField,
				onFocus: this.focusField,
				position: 'left',
				variant: 'link',
				style: { paddingLeft: '0.7em' },
				'data-e2e-search-icon': true
			},
			'Search'
		);
	}
};

// For props "glyph", "glyphColor", and "glyphSize":
// prop type validation will occur within the Glyph component, no need to
// duplicate, just pass it through.
EditFormHeaderSearch.propTypes = {
	onChange: _react.PropTypes.func.isRequired,
	value: _react.PropTypes.string
};

const classes = _noImportant.StyleSheet.create({
	wrapper: {
		display: 'inline-block',
		position: 'relative',
		verticalAlign: 'middle'
	},

	// input
	input: {
		paddingLeft: '2.2em',
		// opacity: 0,
		transition: 'all 240ms',
		width: 100,

		':focus': {
			// opacity: 1,
			width: 240
		}
	},

	// glyph
	glyph: {
		alignItems: 'center',
		display: 'flex',
		height: '100%',
		justifyContent: 'center',
		position: 'absolute',
		width: '2.2em'
	}
});

module.exports = EditFormHeaderSearch;

// Search
// ------------------------------

// .EditForm__header__search {
// 	display: inline-block;
// 	margin-left: 1em;
// }
// .EditForm__header__search-field {
// 	margin-bottom: 0;
//
// 	.IconField__icon {
// 		color: @app-primary;
// 	}
// }
//
// // make the input appear as a button link until focused
// .EditForm__header__search-input {
// 	// override elemental's transition to catch the width or it looks weird
// 	.transition( all 0.15s ease-in-out );
// 	.placeholder(@link-color);
// 	background: transparent;
// 	border-color: transparent;
// 	box-shadow: none;
// 	display: inline-block;
//
// 	// set the width to only be as long as if it were a button initially
// 	// this is updated on focus to a more comfortable typing length
// 	width: 100px;
//
// 	// decorate the input as a link
// 	&:hover {
// 		.placeholder(@link-hover-color);
// 		border-color: transparent;
// 		cursor: pointer;
//
// 		// handle placeholder text
// 		&::-moz-placeholder { text-decoration: underline; }
// 		&:-ms-input-placeholder { text-decoration: underline; }
// 		&::-webkit-input-placeholder  { text-decoration: underline; }
//
// 		+ .IconField__icon {
// 			color: @link-hover-color;
// 		}
// 	}
//
// 	// return the input to it's natural appearance on focus
// 	&:focus {
// 		.placeholder(@input-placeholder-color);
// 		background: white;
// 		border-color: @input-border-color-focus;
// 		box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 0 3px fade(@input-border-color-focus, 10%);
// 		cursor: auto;
// 		outline: 0;
// 		width: 240px;
//
// 		// handle placeholder text
// 		&::-moz-placeholder { text-decoration: none; }
// 		&:-ms-input-placeholder { text-decoration: none; }
// 		&::-webkit-input-placeholder  { text-decoration: none; }
//
// 		+ .IconField__icon {
// 			color: @input-placeholder-color;
// 		}
// 	}
// }
// // hide the search field on small devices
// @media (max-width: 480px) {
// 	.EditForm__header__search {
// 		display: none;
// 	}
// }