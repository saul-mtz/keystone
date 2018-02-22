'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ListFiltersAddForm = require('./ListFiltersAddForm');

var _ListFiltersAddForm2 = _interopRequireDefault(_ListFiltersAddForm);

var _Popout = require('../../../../shared/Popout');

var _Popout2 = _interopRequireDefault(_Popout);

var _PopoutList = require('../../../../shared/Popout/PopoutList');

var _PopoutList2 = _interopRequireDefault(_PopoutList);

var _elemental = require('../../../../elemental');

var _ListHeaderButton = require('../ListHeaderButton');

var _ListHeaderButton2 = _interopRequireDefault(_ListHeaderButton);

var _actions = require('../../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListFiltersAdd = _react2.default.createClass({
	displayName: 'ListFiltersAdd',
	propTypes: {
		maxHeight: _react2.default.PropTypes.number
	},
	getDefaultProps() {
		return {
			maxHeight: 360
		};
	},
	getInitialState() {
		return {
			innerHeight: 0,
			isOpen: false,
			searchString: '',
			selectedField: false
		};
	},
	updateSearch(e) {
		this.setState({ searchString: e.target.value });
	},
	openPopout() {
		this.setState({ isOpen: true }, this.focusSearch);
	},
	closePopout() {
		this.setState({
			innerHeight: 0,
			isOpen: false,
			searchString: '',
			selectedField: false
		});
	},
	setPopoutHeight(height) {
		this.setState({ innerHeight: Math.min(this.props.maxHeight, height) });
	},
	navigateBack() {
		this.setState({
			selectedField: false,
			searchString: '',
			innerHeight: 0
		}, this.focusSearch);
	},
	focusSearch() {
		(0, _reactDom.findDOMNode)(this.refs.search).focus();
	},
	selectField(field) {
		this.setState({
			selectedField: field
		});
	},
	applyFilter(value) {
		this.props.dispatch((0, _actions.setFilter)(this.state.selectedField.path, value));
		this.closePopout();
	},
	renderList() {
		const activeFilterFields = this.props.activeFilters.map(obj => obj.field);
		const activeFilterPaths = activeFilterFields.map(obj => obj.path);
		const { searchString } = this.state;
		let filteredFilters = this.props.availableFilters;

		if (searchString) {
			filteredFilters = filteredFilters.filter(filter => filter.type !== 'heading').filter(filter => new RegExp(searchString).test(filter.field.label.toLowerCase()));
		}

		const popoutList = filteredFilters.map((el, i) => {
			if (el.type === 'heading') {
				return _react2.default.createElement(
					_PopoutList2.default.Heading,
					{ key: 'heading_' + i },
					el.content
				);
			}

			const filterIsActive = activeFilterPaths.length && activeFilterPaths.indexOf(el.field.path) > -1;

			return _react2.default.createElement(_PopoutList2.default.Item, {
				key: 'item_' + el.field.path,
				icon: filterIsActive ? 'check' : 'chevron-right',
				iconHover: filterIsActive ? 'check' : 'chevron-right',
				isSelected: !!filterIsActive,
				label: el.field.label,
				onClick: () => {
					this.selectField(el.field);
				} });
		});

		const formFieldStyles = {
			borderBottom: '1px dashed rgba(0, 0, 0, 0.1)',
			marginBottom: '1em',
			paddingBottom: '1em'
		};

		return _react2.default.createElement(
			_Popout2.default.Pane,
			{ onLayout: this.setPopoutHeight, key: 'list' },
			_react2.default.createElement(
				_Popout2.default.Body,
				null,
				_react2.default.createElement(
					'div',
					{ style: formFieldStyles },
					_react2.default.createElement(_elemental.FormInput, {
						onChange: this.updateSearch,
						placeholder: 'Find a filter...',
						ref: 'search',
						value: this.state.searchString
					})
				),
				popoutList
			)
		);
	},
	renderForm() {
		return _react2.default.createElement(
			_Popout2.default.Pane,
			{ onLayout: this.setPopoutHeight, key: 'form' },
			_react2.default.createElement(_ListFiltersAddForm2.default, {
				activeFilters: this.props.activeFilters,
				field: this.state.selectedField,
				onApply: this.applyFilter,
				onCancel: this.closePopout,
				onBack: this.navigateBack,
				maxHeight: this.props.maxHeight,
				onHeightChange: this.setPopoutHeight,
				dispatch: this.props.dispatch
			})
		);
	},
	render() {
		const { isOpen, selectedField } = this.state;
		const popoutBodyStyle = this.state.innerHeight ? { height: this.state.innerHeight } : null;
		const popoutPanesClassname = (0, _classnames2.default)('Popout__panes', {
			'Popout__scrollable-area': !selectedField
		});

		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(_ListHeaderButton2.default, {
				active: isOpen,
				glyph: 'eye',
				id: 'listHeaderFilterButton',
				label: 'Filter',
				onClick: isOpen ? this.closePopout : this.openPopout
			}),
			_react2.default.createElement(
				_Popout2.default,
				{ isOpen: isOpen, onCancel: this.closePopout, relativeToID: 'listHeaderFilterButton' },
				_react2.default.createElement(_Popout2.default.Header, {
					leftAction: selectedField ? this.navigateBack : null,
					leftIcon: selectedField ? 'chevron-left' : null,
					title: selectedField ? selectedField.label : 'Filter',
					transitionDirection: selectedField ? 'next' : 'prev' }),
				_react2.default.createElement(
					_reactAddonsCssTransitionGroup2.default,
					{
						className: popoutPanesClassname,
						component: 'div',
						style: popoutBodyStyle,
						transitionName: selectedField ? 'Popout__pane-next' : 'Popout__pane-prev',
						transitionEnterTimeout: 350,
						transitionLeaveTimeout: 350
					},
					selectedField ? this.renderForm() : this.renderList()
				)
			)
		);
	}
});

module.exports = ListFiltersAdd;