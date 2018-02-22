'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactDomify = require('react-domify');

var _reactDomify2 = _interopRequireDefault(_reactDomify);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../../admin/client/App/elemental');

var _Col = require('./Col');

var _Col2 = _interopRequireDefault(_Col);

var _Row = require('./Row');

var _Row2 = _interopRequireDefault(_Row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ExplorerFieldType = _react2.default.createClass({
	displayName: 'ExplorerFieldType',

	getInitialState() {
		return {
			filter: this.props.FilterComponent.getDefaultValue(),
			value: this.props.value
		};
	},
	onFieldChange(e) {
		var logValue = typeof e.value === 'string' ? `"${e.value}"` : e.value;
		console.log(`${this.props.FieldComponent.type} field value changed:`, logValue);
		this.setState({
			value: e.value
		});
	},
	onFilterChange(value) {
		console.log(`${this.props.FieldComponent.type} filter value changed:`, value);
		this.setState({
			filter: value
		});
	},
	render() {
		const { FieldComponent, FilterComponent, readmeIsVisible, spec } = this.props;
		const className = this.props.i ? 'fx-page__field__bordered' : undefined;
		return _react2.default.createElement(
			'div',
			{ className: className },
			_react2.default.createElement(
				_elemental.Form,
				{ variant: 'horizontal', component: 'div' },
				_react2.default.createElement(
					_Row2.default,
					{ isCollapsed: readmeIsVisible },
					_react2.default.createElement(
						_Col2.default,
						{ width: readmeIsVisible ? 300 : null, style: { minWidth: 300, maxWidth: 640 } },
						_react2.default.createElement(FieldComponent, _extends({}, spec, {
							onChange: this.onFieldChange,
							value: this.state.value
						}))
					),
					_react2.default.createElement(
						_Col2.default,
						null,
						_react2.default.createElement(_reactDomify2.default, {
							className: 'Domify',
							value: { value: this.state.value }
						})
					)
				)
			),
			_react2.default.createElement(
				'div',
				{ className: 'fx-page__filter' },
				_react2.default.createElement(
					'div',
					{ className: 'fx-page__filter__title' },
					'Filter'
				),
				_react2.default.createElement(
					_Row2.default,
					null,
					_react2.default.createElement(
						_Col2.default,
						{ width: 300 },
						_react2.default.createElement(FilterComponent, {
							field: spec,
							filter: this.state.filter,
							onChange: this.onFilterChange
						})
					),
					_react2.default.createElement(
						_Col2.default,
						null,
						_react2.default.createElement(
							'div',
							{ style: { marginLeft: 30 } },
							_react2.default.createElement(_reactDomify2.default, {
								className: 'Domify',
								value: this.state.filter
							})
						)
					)
				)
			)
		);
	}
});

module.exports = ExplorerFieldType;