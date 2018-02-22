'use strict';

var _noImportant = require('aphrodite/no-important');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const classes = _noImportant.StyleSheet.create(_styles2.default);

class FormSelect extends _react.Component {
	render() {
		const _props = this.props,
		      { children, id, options } = _props,
		      props = _objectWithoutProperties(_props, ['children', 'id', 'options']);
		const { formFieldId } = this.context;

		props.className = (0, _noImportant.css)(classes.select, props.disabled ? classes['select--disabled'] : null);
		props.id = id || formFieldId;

		// Property Violation
		if (options && children) {
			console.error('Warning: FormSelect cannot render `children` and `options`. You must provide one or the other.');
		}

		return _react2.default.createElement(
			'div',
			{ className: (0, _noImportant.css)(classes.container) },
			options ? _react2.default.createElement(
				'select',
				props,
				options.map(opt => _react2.default.createElement(
					'option',
					{ key: opt.value, value: opt.value },
					opt.label
				))
			) : _react2.default.createElement(
				'select',
				props,
				children
			),
			_react2.default.createElement(
				'span',
				{ className: (0, _noImportant.css)(classes.arrows, props.disabled ? classes['arrows--disabled'] : null) },
				_react2.default.createElement('span', { className: (0, _noImportant.css)(classes.arrow, classes.arrowTop) }),
				_react2.default.createElement('span', { className: (0, _noImportant.css)(classes.arrow, classes.arrowBottom) })
			)
		);
	}
};

FormSelect.contextTypes = {
	formFieldId: _react.PropTypes.string
};
FormSelect.propTypes = {
	onChange: _react.PropTypes.func.isRequired,
	options: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
		label: _react2.default.PropTypes.string,
		value: _react2.default.PropTypes.string
	})),
	value: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string])
};

module.exports = FormSelect;