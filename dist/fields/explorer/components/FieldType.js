'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMarkdown = require('react-markdown');

var _reactMarkdown2 = _interopRequireDefault(_reactMarkdown);

var _Col = require('./Col');

var _Col2 = _interopRequireDefault(_Col);

var _Row = require('./Row');

var _Row2 = _interopRequireDefault(_Row);

var _FieldSpec = require('./FieldSpec');

var _FieldSpec2 = _interopRequireDefault(_FieldSpec);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ExplorerFieldType = _react2.default.createClass({
	displayName: 'ExplorerFieldType',

	getInitialState() {
		return {
			readmeIsVisible: !!this.props.readme,
			filter: this.props.FilterComponent.getDefaultValue(),
			value: this.props.value
		};
	},
	componentWillReceiveProps(newProps) {
		if (this.props.params.type === newProps.params.type) return;

		this.setState({
			filter: newProps.FilterComponent.getDefaultValue(),
			readmeIsVisible: newProps.readme ? this.state.readmeIsVisible : false,
			value: newProps.value
		});
	},
	onFieldChange(e) {
		var logValue = typeof e.value === 'string' ? `"${e.value}"` : e.value;
		console.log(`${this.props.params.type} field value changed:`, logValue);
		this.setState({
			value: e.value
		});
	},
	onFilterChange(value) {
		console.log(`${this.props.params.type} filter value changed:`, value);
		this.setState({
			filter: value
		});
	},
	toggleReadme() {
		this.setState({ readmeIsVisible: !this.state.readmeIsVisible });
	},
	render() {
		const { FieldComponent, FilterComponent, readme, toggleSidebar } = this.props;
		const { readmeIsVisible } = this.state;
		const specs = Array.isArray(this.props.spec) ? this.props.spec : [this.props.spec];

		return _react2.default.createElement(
			'div',
			{ className: 'fx-page' },
			_react2.default.createElement(
				'div',
				{ className: 'fx-page__header' },
				_react2.default.createElement(
					'div',
					{ className: 'fx-page__header__title' },
					_react2.default.createElement('button', {
						className: 'fx-page__header__button fx-page__header__button--sidebar mega-octicon octicon-three-bars',
						onClick: toggleSidebar,
						type: 'button'
					}),
					FieldComponent.type
				),
				!!readme && _react2.default.createElement('button', {
					className: 'fx-page__header__button fx-page__header__button--readme mega-octicon octicon-file-text',
					onClick: this.toggleReadme,
					title: readmeIsVisible ? 'Hide Readme' : 'Show Readme',
					type: 'button'
				})
			),
			_react2.default.createElement(
				'div',
				{ className: 'fx-page__content' },
				_react2.default.createElement(
					_Row2.default,
					null,
					_react2.default.createElement(
						_Col2.default,
						null,
						_react2.default.createElement(
							'div',
							{ className: 'fx-page__content__inner' },
							specs.map((spec, i) => _react2.default.createElement(_FieldSpec2.default, {
								key: spec.path,
								i: i,
								FieldComponent: FieldComponent,
								FilterComponent: FilterComponent,
								spec: spec,
								readmeIsVisible: readmeIsVisible
							}))
						)
					),
					!!readmeIsVisible && _react2.default.createElement(
						_Col2.default,
						{ width: 380 },
						_react2.default.createElement(_reactMarkdown2.default, {
							className: 'Markdown',
							source: readme
						})
					)
				)
			)
		);
	}
});

module.exports = ExplorerFieldType;