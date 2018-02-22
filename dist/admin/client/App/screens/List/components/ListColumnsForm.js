'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _Popout = require('../../../shared/Popout');

var _Popout2 = _interopRequireDefault(_Popout);

var _PopoutList = require('../../../shared/Popout/PopoutList');

var _PopoutList2 = _interopRequireDefault(_PopoutList);

var _elemental = require('../../../elemental');

var _ListHeaderButton = require('./ListHeaderButton');

var _ListHeaderButton2 = _interopRequireDefault(_ListHeaderButton);

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListColumnsForm = _react2.default.createClass({
	displayName: 'ListColumnsForm',
	getInitialState() {
		return {
			selectedColumns: {},
			searchString: ''
		};
	},
	getSelectedColumnsFromStore() {
		var selectedColumns = {};
		this.props.activeColumns.forEach(col => {
			selectedColumns[col.path] = true;
		});
		return selectedColumns;
	},
	togglePopout(visible) {
		this.setState({
			selectedColumns: this.getSelectedColumnsFromStore(),
			isOpen: visible,
			searchString: ''
		});
	},
	toggleColumn(path, value) {
		const newColumns = (0, _objectAssign2.default)({}, this.state.selectedColumns);

		if (value) {
			newColumns[path] = value;
		} else {
			delete newColumns[path];
		}

		this.setState({
			selectedColumns: newColumns
		});
	},
	applyColumns() {
		this.props.dispatch((0, _actions.setActiveColumns)(Object.keys(this.state.selectedColumns)));
		this.togglePopout(false);
	},
	updateSearch(e) {
		this.setState({ searchString: e.target.value });
	},
	renderColumns() {
		const availableColumns = this.props.availableColumns;
		const { searchString } = this.state;
		let filteredColumns = availableColumns;

		if (searchString) {
			filteredColumns = filteredColumns.filter(column => column.type !== 'heading').filter(column => new RegExp(searchString).test(column.field.label.toLowerCase()));
		}

		return filteredColumns.map((el, i) => {
			if (el.type === 'heading') {
				return _react2.default.createElement(
					_PopoutList2.default.Heading,
					{ key: 'heading_' + i },
					el.content
				);
			}

			const path = el.field.path;
			const selected = this.state.selectedColumns[path];

			return _react2.default.createElement(_PopoutList2.default.Item, {
				key: 'column_' + el.field.path,
				icon: selected ? 'check' : 'dash',
				iconHover: selected ? 'dash' : 'check',
				isSelected: !!selected,
				label: el.field.label,
				onClick: () => {
					this.toggleColumn(path, !selected);
				} });
		});
	},
	render() {
		const formFieldStyles = {
			borderBottom: '1px dashed rgba(0,0,0,0.1)',
			marginBottom: '1em',
			paddingBottom: '1em'
		};
		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(_ListHeaderButton2.default, {
				active: this.state.isOpen,
				id: 'listHeaderColumnButton',
				glyph: 'list-unordered',
				label: 'Columns',
				onClick: () => this.togglePopout(!this.state.isOpen)
			}),
			_react2.default.createElement(
				_Popout2.default,
				{ isOpen: this.state.isOpen, onCancel: () => this.togglePopout(false), relativeToID: 'listHeaderColumnButton' },
				_react2.default.createElement(_Popout2.default.Header, { title: 'Columns' }),
				_react2.default.createElement(
					_Popout2.default.Body,
					{ scrollable: true },
					_react2.default.createElement(
						'div',
						{ style: formFieldStyles },
						_react2.default.createElement(_elemental.FormInput, {
							autoFocus: true,
							onChange: this.updateSearch,
							placeholder: 'Find a column...',
							value: this.state.searchString
						})
					),
					_react2.default.createElement(
						_PopoutList2.default,
						null,
						this.renderColumns()
					)
				),
				_react2.default.createElement(_Popout2.default.Footer, {
					primaryButtonAction: this.applyColumns,
					primaryButtonLabel: 'Apply',
					secondaryButtonAction: () => this.togglePopout(false),
					secondaryButtonLabel: 'Cancel' })
			)
		);
	}
});

module.exports = ListColumnsForm;