'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _elemental = require('../../../../elemental');

var _RelatedItemsListDragDrop = require('./RelatedItemsListDragDrop');

var _RelatedItemsListDragDrop2 = _interopRequireDefault(_RelatedItemsListDragDrop);

var _RelatedItemsListRow = require('./RelatedItemsListRow');

var _RelatedItemsListRow2 = _interopRequireDefault(_RelatedItemsListRow);

var _actions = require('../../actions');

var _constants = require('../../../../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RelatedItemsList = _react2.default.createClass({
	displayName: 'RelatedItemsList',

	propTypes: {
		dispatch: _react2.default.PropTypes.func.isRequired,
		dragNewSortOrder: _react2.default.PropTypes.number,
		items: _react2.default.PropTypes.array,
		list: _react2.default.PropTypes.object.isRequired,
		refList: _react2.default.PropTypes.object.isRequired,
		relatedItemId: _react2.default.PropTypes.string.isRequired,
		relationship: _react2.default.PropTypes.object.isRequired
	},
	getInitialState() {
		return {
			columns: this.getColumns(),
			err: null,
			items: null
		};
	},
	componentDidMount() {
		this.__isMounted = true;
		this.loadItems();
	},
	componentWillUnmount() {
		this.__isMounted = false;
	},
	isSortable() {
		// Check if the related items should be sortable. The referenced list has to
		//   be sortable and it has to set the current list as it's sortContext.
		const { refList, list, relationship } = this.props;
		const sortContext = refList.sortContext;
		if (refList.sortable && sortContext) {
			const parts = sortContext.split(':');
			if (parts[0] === list.key && parts[1] === relationship.path) {
				return true;
			}
		}
		return false;
	},
	getColumns() {
		const { relationship, refList } = this.props;
		const columns = refList.expandColumns(refList.defaultColumns);
		return columns.filter(i => i.path !== relationship.refPath);
	},
	loadItems() {
		const { refList, relatedItemId, relationship } = this.props;
		const { columns } = this.state;
		// TODO: Move error to redux store
		if (!refList.fields[relationship.refPath]) {
			const err = _react2.default.createElement(
				_elemental.Alert,
				{ color: 'danger' },
				_react2.default.createElement(
					'strong',
					null,
					'Error:'
				),
				' Related List ',
				_react2.default.createElement(
					'strong',
					null,
					refList.label
				),
				' has no field ',
				_react2.default.createElement(
					'strong',
					null,
					relationship.refPath
				)
			);
			return this.setState({ err });
		}
		this.props.dispatch((0, _actions.loadRelationshipItemData)({ columns, refList, relatedItemId, relationship }));
	},
	renderItems() {
		const tableBody = this.isSortable() ? _react2.default.createElement(_RelatedItemsListDragDrop2.default, _extends({
			columns: this.state.columns,
			items: this.props.items
		}, this.props)) : _react2.default.createElement(
			'tbody',
			null,
			this.props.items.results.map(item => {
				return _react2.default.createElement(_RelatedItemsListRow2.default, {
					key: item.id,
					columns: this.state.columns,
					item: item,
					refList: this.props.refList
				});
			})
		);
		return this.props.items.results.length ? _react2.default.createElement(
			'div',
			{ className: 'ItemList-wrapper' },
			_react2.default.createElement(
				'table',
				{ cellPadding: '0', cellSpacing: '0', className: 'Table ItemList' },
				this.renderTableCols(),
				this.renderTableHeaders(),
				tableBody
			)
		) : _react2.default.createElement(_elemental.BlankState, {
			heading: `No related ${this.props.refList.plural.toLowerCase()}...`,
			style: { marginBottom: '3em' }
		});
	},
	renderTableCols() {
		const cols = this.state.columns.map(col => _react2.default.createElement('col', { width: col.width, key: col.path }));
		return _react2.default.createElement(
			'colgroup',
			null,
			cols
		);
	},
	renderTableHeaders() {
		const cells = this.state.columns.map(col => {
			return _react2.default.createElement(
				'th',
				{ key: col.path },
				col.label
			);
		});

		// add sort col when available
		if (this.isSortable()) {
			cells.unshift(_react2.default.createElement('th', { width: _constants.TABLE_CONTROL_COLUMN_WIDTH, key: 'sortable' }));
		}

		return _react2.default.createElement(
			'thead',
			null,
			_react2.default.createElement(
				'tr',
				null,
				cells
			)
		);
	},
	render() {
		if (this.state.err) {
			return _react2.default.createElement(
				'div',
				{ className: 'Relationship' },
				this.state.err
			);
		}

		const listHref = `${Keystone.adminPath}/${this.props.refList.path}`;
		const loadingElement = _react2.default.createElement(
			_elemental.Center,
			{ height: 100 },
			_react2.default.createElement(_elemental.Spinner, null)
		);

		return _react2.default.createElement(
			'div',
			{ className: 'Relationship' },
			_react2.default.createElement(
				'h3',
				{ className: 'Relationship__link' },
				_react2.default.createElement(
					_reactRouter.Link,
					{ to: listHref },
					this.props.refList.label
				)
			),
			this.props.items ? this.renderItems() : loadingElement
		);
	}
});

module.exports = RelatedItemsList;