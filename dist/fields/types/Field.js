'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _evalDependsOn = require('../utils/evalDependsOn.js');

var _evalDependsOn2 = _interopRequireDefault(_evalDependsOn);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _elemental = require('../../admin/client/App/elemental');

var _blacklist = require('blacklist');

var _blacklist2 = _interopRequireDefault(_blacklist);

var _CollapsedFieldLabel = require('../components/CollapsedFieldLabel');

var _CollapsedFieldLabel2 = _interopRequireDefault(_CollapsedFieldLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isObject(arg) {
	return Object.prototype.toString.call(arg) === '[object Object]';
}

function validateSpec(spec) {
	if (!spec) spec = {};
	if (!isObject(spec.supports)) {
		spec.supports = {};
	}
	if (!spec.focusTargetRef) {
		spec.focusTargetRef = 'focusTarget';
	}
	return spec;
}

var Base = module.exports.Base = {
	getInitialState() {
		return {};
	},
	getDefaultProps() {
		return {
			adminPath: Keystone.adminPath,
			inputProps: {},
			labelProps: {},
			valueProps: {},
			size: 'full'
		};
	},
	getInputName(path) {
		// This correctly creates the path for field inputs, and supports the
		// inputNamePrefix prop that is required for nested fields to work
		return this.props.inputNamePrefix ? `${this.props.inputNamePrefix}[${path}]` : path;
	},
	valueChanged(event) {
		this.props.onChange({
			path: this.props.path,
			value: event.target.value
		});
	},
	shouldCollapse() {
		return this.props.collapse && !this.props.value;
	},
	shouldRenderField() {
		if (this.props.mode === 'create') return true;
		return !this.props.noedit;
	},
	focus() {
		if (!this.refs[this.spec.focusTargetRef]) return;
		(0, _reactDom.findDOMNode)(this.refs[this.spec.focusTargetRef]).focus();
	},
	renderNote() {
		if (!this.props.note) return null;

		return _react2.default.createElement(_elemental.FormNote, { html: this.props.note });
	},
	renderField() {
		const { autoFocus, value, inputProps } = this.props;
		return _react2.default.createElement(_elemental.FormInput, _extends({}, inputProps, {
			autoFocus,
			autoComplete: 'off',
			name: this.getInputName(this.props.path),
			onChange: this.valueChanged,
			ref: 'focusTarget',
			value
		}));
	},
	renderValue() {
		return _react2.default.createElement(
			_elemental.FormInput,
			{ noedit: true },
			this.props.value
		);
	},
	renderUI() {
		var wrapperClassName = (0, _classnames2.default)('field-type-' + this.props.type, this.props.className, { 'field-monospace': this.props.monospace });
		return _react2.default.createElement(
			_elemental.FormField,
			{ htmlFor: this.props.path, label: this.props.label, className: wrapperClassName, cropLabel: true },
			_react2.default.createElement(
				'div',
				{ className: 'FormField__inner field-size-' + this.props.size },
				this.shouldRenderField() ? this.renderField() : this.renderValue()
			),
			this.renderNote()
		);
	}
};

var Mixins = module.exports.Mixins = {
	Collapse: {
		componentWillMount() {
			this.setState({
				isCollapsed: this.shouldCollapse()
			});
		},
		componentDidUpdate(prevProps, prevState) {
			if (prevState.isCollapsed && !this.state.isCollapsed) {
				this.focus();
			}
		},
		uncollapse() {
			this.setState({
				isCollapsed: false
			});
		},
		renderCollapse() {
			if (!this.shouldRenderField()) return null;
			return _react2.default.createElement(
				_elemental.FormField,
				null,
				_react2.default.createElement(
					_CollapsedFieldLabel2.default,
					{ onClick: this.uncollapse },
					'+ Add ',
					this.props.label.toLowerCase()
				)
			);
		}
	}
};

module.exports.create = function (spec) {

	spec = validateSpec(spec);

	var field = {
		spec: spec,
		displayName: spec.displayName,
		mixins: [Mixins.Collapse],
		statics: {
			getDefaultValue: function (field) {
				return field.defaultValue || '';
			}
		},
		render() {
			if (!(0, _evalDependsOn2.default)(this.props.dependsOn, this.props.values)) {
				return null;
			}
			if (this.state.isCollapsed) {
				return this.renderCollapse();
			}
			return this.renderUI();
		}
	};

	if (spec.statics) {
		Object.assign(field.statics, spec.statics);
	}

	var excludeBaseMethods = {};
	if (spec.mixins) {
		spec.mixins.forEach(function (mixin) {
			Object.keys(mixin).forEach(function (name) {
				if (Base[name]) {
					excludeBaseMethods[name] = true;
				}
			});
		});
	}

	Object.assign(field, (0, _blacklist2.default)(Base, excludeBaseMethods));
	Object.assign(field, (0, _blacklist2.default)(spec, 'mixins', 'statics'));

	if (Array.isArray(spec.mixins)) {
		field.mixins = field.mixins.concat(spec.mixins);
	}

	return _react2.default.createClass(field);
};