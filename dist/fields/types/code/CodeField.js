'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _codemirror = require('codemirror');

var _codemirror2 = _interopRequireDefault(_codemirror);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _elemental = require('../../../admin/client/App/elemental');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * TODO:
 * - Remove dependency on lodash
 */

// See CodeMirror docs for API:
// http://codemirror.net/doc/manual.html

module.exports = _Field2.default.create({
	displayName: 'CodeField',
	statics: {
		type: 'Code'
	},

	getInitialState() {
		return {
			isFocused: false
		};
	},
	componentDidMount() {
		if (!this.refs.codemirror) {
			return;
		}

		var options = _lodash2.default.defaults({}, this.props.editor, {
			lineNumbers: true,
			readOnly: this.shouldRenderField() ? false : true
		});

		this.codeMirror = _codemirror2.default.fromTextArea((0, _reactDom.findDOMNode)(this.refs.codemirror), options);
		this.codeMirror.setSize(null, this.props.height);
		this.codeMirror.on('change', this.codemirrorValueChanged);
		this.codeMirror.on('focus', this.focusChanged.bind(this, true));
		this.codeMirror.on('blur', this.focusChanged.bind(this, false));
		this._currentCodemirrorValue = this.props.value;
	},
	componentWillUnmount() {
		// todo: is there a lighter-weight way to remove the cm instance?
		if (this.codeMirror) {
			this.codeMirror.toTextArea();
		}
	},
	componentWillReceiveProps(nextProps) {
		if (this.codeMirror && this._currentCodemirrorValue !== nextProps.value) {
			this.codeMirror.setValue(nextProps.value);
		}
	},
	focus() {
		if (this.codeMirror) {
			this.codeMirror.focus();
		}
	},
	focusChanged(focused) {
		this.setState({
			isFocused: focused
		});
	},
	codemirrorValueChanged(doc, change) {
		var newValue = doc.getValue();
		this._currentCodemirrorValue = newValue;
		this.props.onChange({
			path: this.props.path,
			value: newValue
		});
	},
	renderCodemirror() {
		const className = (0, _classnames2.default)('CodeMirror-container', {
			'is-focused': this.state.isFocused && this.shouldRenderField()
		});

		return _react2.default.createElement(
			'div',
			{ className: className },
			_react2.default.createElement(_elemental.FormInput, {
				autoComplete: 'off',
				multiline: true,
				name: this.getInputName(this.props.path),
				onChange: this.valueChanged,
				ref: 'codemirror',
				value: this.props.value
			})
		);
	},
	renderValue() {
		return this.renderCodemirror();
	},
	renderField() {
		return this.renderCodemirror();
	}
});