'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _noImportant = require('aphrodite/no-important');

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var _concatClassnames = require('../../../utils/concatClassnames');

var _concatClassnames2 = _interopRequireDefault(_concatClassnames);

var _noedit = require('./noedit');

var _noedit2 = _interopRequireDefault(_noedit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const classes = _noImportant.StyleSheet.create(_styles2.default);

// NOTE must NOT be functional component to allow `refs`

class FormInput extends _react.Component {
	blur() {
		this.target.blur();
	}
	focus() {
		this.target.focus();
	}
	render() {
		const _props = this.props,
		      {
			aphroditeStyles,
			className,
			disabled,
			id,
			multiline,
			noedit,
			size
		} = _props,
		      props = _objectWithoutProperties(_props, ['aphroditeStyles', 'className', 'disabled', 'id', 'multiline', 'noedit', 'size']);

		// NOTE return a different component for `noedit`
		if (noedit) return _react2.default.createElement(_noedit2.default, this.props);

		const { formFieldId, formLayout } = this.context;

		props.id = id || formFieldId;
		props.className = (0, _noImportant.css)(classes.FormInput, classes['FormInput__size--' + size], disabled ? classes['FormInput--disabled'] : null, formLayout ? classes['FormInput--form-layout-' + formLayout] : null, ...(0, _concatClassnames2.default)(aphroditeStyles));
		if (className) {
			props.className += ' ' + className;
		}

		const setRef = n => this.target = n;
		const Tag = multiline ? 'textarea' : 'input';

		return _react2.default.createElement(Tag, _extends({
			ref: setRef,
			disabled: props.disabled
		}, props));
	}
};

const stylesShape = {
	_definition: _react.PropTypes.object,
	_name: _react.PropTypes.string
};

FormInput.propTypes = {
	aphroditeStyles: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.shape(stylesShape)), _react.PropTypes.shape(stylesShape)]),
	multiline: _react.PropTypes.bool,
	size: _react.PropTypes.oneOf(['default', 'small', 'large']),
	type: _react.PropTypes.string
};
FormInput.defaultProps = {
	size: 'default',
	type: 'text'
};
FormInput.contextTypes = {
	formLayout: _react.PropTypes.oneOf(['basic', 'horizontal', 'inline']),
	formFieldId: _react.PropTypes.string
};

module.exports = FormInput;