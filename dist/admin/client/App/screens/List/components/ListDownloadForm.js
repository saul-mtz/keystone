'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _Popout = require('../../../shared/Popout');

var _Popout2 = _interopRequireDefault(_Popout);

var _PopoutList = require('../../../shared/Popout/PopoutList');

var _PopoutList2 = _interopRequireDefault(_PopoutList);

var _ListHeaderButton = require('./ListHeaderButton');

var _ListHeaderButton2 = _interopRequireDefault(_ListHeaderButton);

var _elemental = require('../../../elemental');

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const FORMAT_OPTIONS = [{ label: 'CSV', value: 'csv' }, { label: 'JSON', value: 'json' }];

var ListDownloadForm = _react2.default.createClass({
	displayName: 'ListDownloadForm',

	propTypes: {
		activeColumns: _react.PropTypes.array,
		dispatch: _react.PropTypes.func.isRequired,
		list: _react.PropTypes.object
	},
	getInitialState() {
		return {
			format: FORMAT_OPTIONS[0].value,
			isOpen: false,
			useCurrentColumns: true,
			selectedColumns: this.getDefaultSelectedColumns()
		};
	},
	getDefaultSelectedColumns() {
		var selectedColumns = {};
		this.props.activeColumns.forEach(col => {
			selectedColumns[col.path] = true;
		});
		return selectedColumns;
	},
	getListUIElements() {
		return this.props.list.uiElements.map(el => {
			return el.type === 'field' ? {
				type: 'field',
				field: this.props.list.fields[el.field]
			} : el;
		});
	},
	allColumnsSelected() {
		const selectedColumns = Object.keys(this.state.selectedColumns).length;
		const columnAmount = this.getListUIElements().filter(el => el.type !== 'heading').length;
		return selectedColumns === columnAmount;
	},
	togglePopout(visible) {
		this.setState({
			isOpen: visible
		});
	},
	toggleColumn(column, value) {
		const newColumns = (0, _objectAssign2.default)({}, this.state.selectedColumns);
		if (value) {
			newColumns[column] = value;
		} else {
			delete newColumns[column];
		}
		this.setState({
			selectedColumns: newColumns
		});
	},
	changeFormat(value) {
		this.setState({
			format: value
		});
	},
	toggleCurrentlySelectedColumns(e) {
		const newState = {
			useCurrentColumns: e.target.checked,
			selectedColumns: this.getDefaultSelectedColumns()
		};
		this.setState(newState);
	},
	clickSelectAll() {
		if (this.allColumnsSelected()) {
			this.selectNoColumns();
		} else {
			this.selectAllColumns();
		}
	},
	selectAllColumns() {
		const newColumns = {};
		this.getListUIElements().map(el => {
			if (el.type !== 'heading') {
				newColumns[el.field.path] = true;
			}
		});
		this.setState({
			selectedColumns: newColumns
		});
	},
	selectNoColumns() {
		this.setState({
			selectedColumns: {}
		});
	},
	handleDownloadRequest() {
		this.props.dispatch((0, _actions.downloadItems)(this.state.format, Object.keys(this.state.selectedColumns)));
		this.togglePopout(false);
	},
	renderColumnSelect() {
		if (this.state.useCurrentColumns) return null;

		const possibleColumns = this.getListUIElements().map((el, i) => {
			if (el.type === 'heading') {
				return _react2.default.createElement(
					_PopoutList2.default.Heading,
					{ key: 'heading_' + i },
					el.content
				);
			}

			const columnKey = el.field.path;
			const columnValue = this.state.selectedColumns[columnKey];

			return _react2.default.createElement(_PopoutList2.default.Item, {
				key: 'item_' + el.field.path,
				icon: columnValue ? 'check' : 'dash',
				iconHover: columnValue ? 'dash' : 'check',
				isSelected: columnValue,
				label: el.field.label,
				onClick: () => this.toggleColumn(columnKey, !columnValue) });
		});

		const allColumnsSelected = this.allColumnsSelected();
		const checkboxLabel = allColumnsSelected ? 'Select None' : 'Select All';

		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(
				_elemental.FormField,
				{ offsetAbsentLabel: true },
				_react2.default.createElement(_elemental.LabelledControl, {
					checked: allColumnsSelected,
					label: checkboxLabel,
					onChange: this.clickSelectAll,
					type: 'checkbox',
					value: true
				})
			),
			_react2.default.createElement(
				'div',
				{ style: { borderTop: '1px dashed rgba(0,0,0,0.1)', marginTop: '1em', paddingTop: '1em' } },
				possibleColumns
			)
		);
	},
	render() {
		const { useCurrentColumns } = this.state;

		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(_ListHeaderButton2.default, {
				active: this.state.isOpen,
				id: 'listHeaderDownloadButton',
				glyph: 'cloud-download',
				label: 'Download',
				onClick: () => this.togglePopout(!this.state.isOpen)
			}),
			_react2.default.createElement(
				_Popout2.default,
				{ isOpen: this.state.isOpen, onCancel: () => this.togglePopout(false), relativeToID: 'listHeaderDownloadButton' },
				_react2.default.createElement(_Popout2.default.Header, { title: 'Download' }),
				_react2.default.createElement(
					_Popout2.default.Body,
					{ scrollable: true },
					_react2.default.createElement(
						_elemental.Form,
						{ layout: 'horizontal', labelWidth: 100, component: 'div' },
						_react2.default.createElement(
							_elemental.FormField,
							{ label: 'File format:' },
							_react2.default.createElement(_elemental.SegmentedControl, {
								equalWidthSegments: true,
								onChange: this.changeFormat,
								options: FORMAT_OPTIONS,
								value: this.state.format
							})
						),
						_react2.default.createElement(
							_elemental.FormField,
							{ label: 'Columns:', style: { marginBottom: 0 } },
							_react2.default.createElement(_elemental.LabelledControl, {
								autoFocus: true,
								checked: useCurrentColumns,
								label: 'Use currently selected',
								onChange: this.toggleCurrentlySelectedColumns,
								type: 'checkbox',
								value: true
							})
						),
						this.renderColumnSelect()
					)
				),
				_react2.default.createElement(_Popout2.default.Footer, {
					primaryButtonAction: this.handleDownloadRequest,
					primaryButtonLabel: 'Download',
					secondaryButtonAction: () => this.togglePopout(false),
					secondaryButtonLabel: 'Cancel' })
			)
		);
	}
});

module.exports = ListDownloadForm;