'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _Popout = require('../../../../shared/Popout');

var _Popout2 = _interopRequireDefault(_Popout);

var _FieldTypes = require('FieldTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListFiltersAddForm = _react2.default.createClass({
	displayName: 'ListFiltersAddForm',

	propTypes: {
		field: _react2.default.PropTypes.object.isRequired,
		maxHeight: _react2.default.PropTypes.number,
		onApply: _react2.default.PropTypes.func,
		onCancel: _react2.default.PropTypes.func,
		onHeightChange: _react2.default.PropTypes.func
	},
	getInitialState() {
		const filterComponent = _FieldTypes.Filters[this.props.field.type];
		let filterValue = this.props.activeFilters.filter(i => i.field.path === this.props.field.path)[0];
		if (filterValue) {
			filterValue = filterValue.value;
		} else {
			filterValue = filterComponent && filterComponent.getDefaultValue ? filterComponent.getDefaultValue() : {};
		}
		return {
			filterComponent: filterComponent,
			filterValue: filterValue
		};
	},
	updateHeight(bodyHeight) {
		bodyHeight += 40; // TODO: remove magic number, currently accounts for padding
		const footerHeight = (0, _reactDom.findDOMNode)(this.refs.footer).offsetHeight;
		const maxBodyHeight = this.props.maxHeight - footerHeight;
		const newHeight = bodyHeight + footerHeight;
		// console.log(bodyHeight, maxBodyHeight, '|', newHeight, this.props.maxHeight);
		this.setState({
			bodyHeight: Math.min(bodyHeight, maxBodyHeight)
		}, () => {
			this.props.onHeightChange(Math.min(newHeight, this.props.maxHeight));
		});
	},
	updateValue(filterValue) {
		this.setState({
			filterValue: filterValue
		});
	},
	handleFormSubmit(e) {
		e.preventDefault();
		this.props.onApply(this.state.filterValue);
	},
	renderInvalidFilter() {
		return _react2.default.createElement(
			'div',
			null,
			'Error: type ',
			this.props.field.type,
			' has no filter UI.'
		);
	},
	render() {
		var FilterComponent = this.state.filterComponent;
		return _react2.default.createElement(
			'form',
			{ onSubmit: this.handleFormSubmit },
			_react2.default.createElement(
				_Popout2.default.Body,
				{ ref: 'body', scrollable: true, style: { height: this.state.bodyHeight } },
				FilterComponent ? _react2.default.createElement(FilterComponent, { field: this.props.field, filter: this.state.filterValue, onChange: this.updateValue, onHeightChange: this.updateHeight }) : this.renderInvalidFilter()
			),
			_react2.default.createElement(_Popout2.default.Footer, {
				ref: 'footer',
				primaryButtonIsSubmit: true,
				primaryButtonLabel: 'Apply',
				secondaryButtonAction: this.props.onCancel,
				secondaryButtonLabel: 'Cancel' })
		);
	}
});

module.exports = ListFiltersAddForm;