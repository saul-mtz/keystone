'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/*
	Expose internal ref to parent
	=============================

	Field.create({
		triggerFileBrowser () {
			this.refs.fileInput.clickDomNode();
		},
		render () {
			<HiddenFileInput ref="fileInput" />
		}
	});
*/

class HiddenFileInput extends _react.Component {
	constructor() {
		super();

		this.clearValue = this.clearValue.bind(this);
		this.clickDomNode = this.clickDomNode.bind(this);
		this.hasValue = this.hasValue.bind(this);
	}
	clearValue() {
		this.target.value = '';
	}
	clickDomNode() {
		this.target.click();
	}
	hasValue() {
		return !!this.target.value;
	}
	render() {
		const _props = this.props,
		      { style } = _props,
		      props = _objectWithoutProperties(_props, ['style']);
		const setRef = n => this.target = n;
		const styles = _extends({
			left: -9999,
			position: 'absolute'
		}, style);

		return _react2.default.createElement('input', _extends({}, props, {
			style: styles,
			ref: setRef,
			tabIndex: '-1',
			type: 'file'
		}));
	}
};

HiddenFileInput.propTypes = {
	onChange: _react.PropTypes.func.isRequired
};

module.exports = HiddenFileInput;