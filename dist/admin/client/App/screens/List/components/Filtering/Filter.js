'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FieldTypes = require('FieldTypes');

var _elemental = require('../../../../elemental');

var _Popout = require('../../../../shared/Popout');

var _Popout2 = _interopRequireDefault(_Popout);

var _actions = require('../../actions');

var _getFilterLabel = require('./getFilterLabel');

var _getFilterLabel2 = _interopRequireDefault(_getFilterLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Filter extends _react.Component {
	constructor() {
		super();

		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
		this.updateValue = this.updateValue.bind(this);
		this.updateFilter = this.updateFilter.bind(this);
		this.removeFilter = this.removeFilter.bind(this);

		this.state = {
			isOpen: false
		};
	}
	open() {
		this.setState({
			isOpen: true,
			filterValue: this.props.filter.value
		});
	}
	close() {
		this.setState({
			isOpen: false
		});
	}
	updateValue(filterValue) {
		this.setState({
			filterValue: filterValue
		});
	}
	updateFilter(e) {
		const { dispatch, filter } = this.props;
		dispatch((0, _actions.setFilter)(filter.field.path, this.state.filterValue));
		this.close();
		e.preventDefault();
	}
	removeFilter() {
		this.props.dispatch((0, _actions.clearFilter)(this.props.filter.field.path));
	}
	render() {
		const { filter } = this.props;
		const filterId = `activeFilter__${filter.field.path}`;
		const FilterComponent = _FieldTypes.Filters[filter.field.type];

		return _react2.default.createElement(
			'span',
			null,
			_react2.default.createElement(_elemental.Chip, {
				label: (0, _getFilterLabel2.default)(filter.field, filter.value),
				onClick: this.open,
				onClear: this.removeFilter,
				color: 'primary',
				id: filterId
			}),
			_react2.default.createElement(
				_Popout2.default,
				{ isOpen: this.state.isOpen, onCancel: this.close, relativeToID: filterId },
				_react2.default.createElement(
					'form',
					{ onSubmit: this.updateFilter },
					_react2.default.createElement(_Popout2.default.Header, { title: 'Edit Filter' }),
					_react2.default.createElement(
						_Popout2.default.Body,
						null,
						_react2.default.createElement(FilterComponent, {
							field: filter.field,
							filter: this.state.filterValue,
							onChange: this.updateValue
						})
					),
					_react2.default.createElement(_Popout2.default.Footer, {
						ref: 'footer',
						primaryButtonIsSubmit: true,
						primaryButtonLabel: 'Apply',
						secondaryButtonAction: this.close,
						secondaryButtonLabel: 'Cancel' })
				)
			)
		);
	}
};

Filter.propTypes = {
	dispatch: _react.PropTypes.func.isRequired,
	filter: _react.PropTypes.shape({
		field: _react.PropTypes.object.isRequired,
		value: _react.PropTypes.object.isRequired
	}).isRequired
};

module.exports = Filter;