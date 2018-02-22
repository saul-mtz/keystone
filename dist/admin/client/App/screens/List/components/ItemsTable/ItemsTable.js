'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ItemsTableRow = require('./ItemsTableRow');

var _ItemsTableRow2 = _interopRequireDefault(_ItemsTableRow);

var _ItemsTableDragDrop = require('./ItemsTableDragDrop');

var _ItemsTableDragDrop2 = _interopRequireDefault(_ItemsTableDragDrop);

var _constants = require('../../../../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ItemsTable = _react2.default.createClass({
	displayName: 'ItemsTable',

	propTypes: {
		checkedItems: _react.PropTypes.object.isRequired,
		columns: _react.PropTypes.array.isRequired,
		deleteTableItem: _react.PropTypes.func.isRequired,
		handleSortSelect: _react.PropTypes.func.isRequired,
		items: _react.PropTypes.object.isRequired,
		list: _react.PropTypes.object.isRequired,
		manageMode: _react.PropTypes.bool.isRequired,
		rowAlert: _react.PropTypes.object.isRequired
	},
	renderCols() {
		let cols = this.props.columns.map(col => _react2.default.createElement('col', { key: col.path, width: col.width }));

		// add delete col when available
		if (!this.props.list.nodelete) {
			cols.unshift(_react2.default.createElement('col', { width: _constants.TABLE_CONTROL_COLUMN_WIDTH, key: 'delete' }));
		}

		// add sort col when available
		if (this.props.list.sortable) {
			cols.unshift(_react2.default.createElement('col', { width: _constants.TABLE_CONTROL_COLUMN_WIDTH, key: 'sortable' }));
		}

		return _react2.default.createElement(
			'colgroup',
			null,
			cols
		);
	},
	renderHeaders() {
		let listControlCount = 0;

		if (this.props.list.sortable) listControlCount++;
		if (!this.props.list.nodelete) listControlCount++;

		// set active sort
		const activeSortPath = this.props.activeSort.paths[0];

		// pad first col when controls are available
		const cellPad = listControlCount ? _react2.default.createElement('th', { colSpan: listControlCount }) : null;

		// map each heading column
		const cellMap = this.props.columns.map(col => {
			const isSelected = activeSortPath && activeSortPath.path === col.path;
			const isInverted = isSelected && activeSortPath.invert;
			const buttonTitle = `Sort by ${col.label}${isSelected && !isInverted ? ' (desc)' : ''}`;
			const colClassName = (0, _classnames2.default)('ItemList__sort-button th-sort', {
				'th-sort--asc': isSelected && !isInverted,
				'th-sort--desc': isInverted
			});

			return _react2.default.createElement(
				'th',
				{ key: col.path, colSpan: '1' },
				_react2.default.createElement(
					'button',
					{
						className: colClassName,
						onClick: () => {
							this.props.handleSortSelect(col.path, isSelected && !isInverted);
						},
						title: buttonTitle },
					col.label,
					_react2.default.createElement('span', { className: 'th-sort__icon' })
				)
			);
		});

		return _react2.default.createElement(
			'thead',
			null,
			_react2.default.createElement(
				'tr',
				null,
				cellPad,
				cellMap
			)
		);
	},
	render() {
		const { items } = this.props;
		if (!items.results.length) return null;

		const tableBody = this.props.list.sortable ? _react2.default.createElement(_ItemsTableDragDrop2.default, this.props) : _react2.default.createElement(
			'tbody',
			null,
			items.results.map((item, i) => {
				return _react2.default.createElement(_ItemsTableRow2.default, _extends({ key: item.id,
					deleteTableItem: this.props.deleteTableItem,
					index: i,
					sortOrder: item.sortOrder || 0,
					id: item.id,
					item: item
				}, this.props));
			})
		);

		return _react2.default.createElement(
			'div',
			{ className: 'ItemList-wrapper' },
			_react2.default.createElement(
				'table',
				{ cellPadding: '0', cellSpacing: '0', className: 'Table ItemList' },
				this.renderCols(),
				this.renderHeaders(),
				tableBody
			)
		);
	}
});

module.exports = exports = ItemsTable;