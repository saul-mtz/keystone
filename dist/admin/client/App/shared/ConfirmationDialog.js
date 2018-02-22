'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * Renders a confirmation dialog modal
                                                                                                                                                                                                                              */

function ConfirmationDialog(_ref) {
	let {
		cancelLabel,
		children,
		confirmationLabel,
		confirmationType,
		html,
		isOpen,
		onCancel,
		onConfirmation
	} = _ref,
	    props = _objectWithoutProperties(_ref, ['cancelLabel', 'children', 'confirmationLabel', 'confirmationType', 'html', 'isOpen', 'onCancel', 'onConfirmation']);

	// Property Violation
	if (children && html) {
		console.error('Warning: FormNote cannot render `children` and `html`. You must provide one or the other.');
	}

	return _react2.default.createElement(
		_elemental.Modal.Dialog,
		{
			backdropClosesModal: true,
			isOpen: isOpen,
			onClose: onCancel,
			width: 400
		},
		html ? _react2.default.createElement(_elemental.Modal.Body, _extends({}, props, { dangerouslySetInnerHTML: { __html: html } })) : _react2.default.createElement(
			_elemental.Modal.Body,
			props,
			children
		),
		_react2.default.createElement(
			_elemental.Modal.Footer,
			null,
			_react2.default.createElement(
				_elemental.Button,
				{ autoFocus: true, size: 'small', 'data-button-type': 'confirm', color: confirmationType, onClick: onConfirmation },
				confirmationLabel
			),
			_react2.default.createElement(
				_elemental.Button,
				{ size: 'small', 'data-button-type': 'cancel', variant: 'link', color: 'cancel', onClick: onCancel },
				cancelLabel
			)
		)
	);
};
ConfirmationDialog.propTypes = {
	body: _react.PropTypes.string,
	cancelLabel: _react.PropTypes.string,
	confirmationLabel: _react.PropTypes.string,
	confirmationType: _react.PropTypes.oneOf(['danger', 'primary', 'success', 'warning']),
	onCancel: _react.PropTypes.func,
	onConfirmation: _react.PropTypes.func
};
ConfirmationDialog.defaultProps = {
	cancelLabel: 'Cancel',
	confirmationLabel: 'Okay',
	confirmationType: 'danger',
	isOpen: false
};

exports.default = ConfirmationDialog;