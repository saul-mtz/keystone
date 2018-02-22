'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * The list view is a paginated table of all items in the list. It can show a
                                                                                                                                                                                                                                                                   * variety of information about the individual items in columns.
                                                                                                                                                                                                                                                                   */

// import { findDOMNode } from 'react-dom'; // TODO re-implement focus when ready


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _numeral = require('numeral');

var _numeral2 = _interopRequireDefault(_numeral);

var _reactRedux = require('react-redux');

var _elemental = require('../../elemental');

var _ListFilters = require('./components/Filtering/ListFilters');

var _ListFilters2 = _interopRequireDefault(_ListFilters);

var _ListHeaderTitle = require('./components/ListHeaderTitle');

var _ListHeaderTitle2 = _interopRequireDefault(_ListHeaderTitle);

var _ListHeaderToolbar = require('./components/ListHeaderToolbar');

var _ListHeaderToolbar2 = _interopRequireDefault(_ListHeaderToolbar);

var _ListManagement = require('./components/ListManagement');

var _ListManagement2 = _interopRequireDefault(_ListManagement);

var _ConfirmationDialog = require('../../shared/ConfirmationDialog');

var _ConfirmationDialog2 = _interopRequireDefault(_ConfirmationDialog);

var _CreateForm = require('../../shared/CreateForm');

var _CreateForm2 = _interopRequireDefault(_CreateForm);

var _FlashMessages = require('../../shared/FlashMessages');

var _FlashMessages2 = _interopRequireDefault(_FlashMessages);

var _ItemsTable = require('./components/ItemsTable/ItemsTable');

var _ItemsTable2 = _interopRequireDefault(_ItemsTable);

var _UpdateForm = require('./components/UpdateForm');

var _UpdateForm2 = _interopRequireDefault(_UpdateForm);

var _string = require('../../../utils/string');

var _lists = require('../../../utils/lists');

var _actions = require('./actions');

var _actions2 = require('../Item/actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ESC_KEY_CODE = 27;

const ListView = _react2.default.createClass({
	displayName: 'ListView',

	contextTypes: {
		router: _react2.default.PropTypes.object.isRequired
	},
	getInitialState() {
		return {
			confirmationDialog: {
				isOpen: false
			},
			checkedItems: {},
			constrainTableWidth: true,
			manageMode: false,
			showCreateForm: false,
			showUpdateForm: false
		};
	},
	componentWillMount() {
		// When we directly navigate to a list without coming from another client
		// side routed page before, we need to initialize the list and parse
		// possibly specified query parameters
		this.props.dispatch((0, _actions.selectList)(this.props.params.listId));
		this.parseQueryParams();
		this.props.dispatch((0, _actions.loadInitialItems)());
		const isNoCreate = this.props.lists.data[this.props.params.listId].nocreate;
		const shouldOpenCreate = this.props.location.search === '?create';
		this.setState({
			showCreateForm: shouldOpenCreate && !isNoCreate || Keystone.createFormErrors
		});
	},
	componentWillReceiveProps(nextProps) {
		// We've opened a new list from the client side routing, so initialize
		// again with the new list id
		if (nextProps.params.listId !== this.props.params.listId) {
			this.props.dispatch((0, _actions.selectList)(nextProps.params.listId));
		}
	},
	/**
  * Parse the current query parameters and change the state accordingly
  * Only called when directly opening a list
  */
	parseQueryParams() {
		const query = this.props.location.query;
		Object.keys(query).forEach(key => {
			switch (key) {
				case 'columns':
					this.props.dispatch((0, _actions.setActiveColumns)(query[key]));
					break;
				case 'page':
					this.props.dispatch((0, _actions.setCurrentPage)(query[key]));
					break;
				case 'search':
					// Fill the search input field with the current search
					this.props.dispatch((0, _actions.setActiveSearch)(query[key]));
					break;
				case 'sort':
					this.props.dispatch((0, _actions.setActiveSort)(query[key]));
					break;
				case 'filters':
					try {
						const filters = JSON.parse(query[key]);
						this.props.dispatch((0, _actions.setActiveFilters)(filters));
					} catch (e) {
						console.warn('Invalid filter provided');
					}
					break;
			}
		});
	},

	// ==============================
	// HEADER
	// ==============================
	// Called when a new item is created
	onCreate(item) {
		// Hide the create form
		this.toggleCreateModal(false);
		// Redirect to newly created item path
		const list = this.props.currentList;
		this.context.router.push(`${Keystone.adminPath}/${list.path}/${item.id}`);
	},
	createAutocreate() {
		const list = this.props.currentList;
		list.createItem(null, (err, data) => {
			if (err) {
				// TODO Proper error handling
				alert('Something went wrong, please try again!');
				console.log(err);
			} else {
				this.context.router.push(`${Keystone.adminPath}/${list.path}/${data.id}`);
			}
		});
	},
	updateSearch(e) {
		this.props.dispatch((0, _actions.setActiveSearch)(e.target.value));
	},
	handleSearchClear() {
		this.props.dispatch((0, _actions.setActiveSearch)(''));

		// TODO re-implement focus when ready
		// findDOMNode(this.refs.listSearchInput).focus();
	},
	handleSearchKey(e) {
		// clear on esc
		if (e.which === ESC_KEY_CODE) {
			this.handleSearchClear();
		}
	},
	handlePageSelect(i) {
		// If the current page index is the same as the index we are intending to pass to redux, bail out.
		if (i === this.props.lists.page.index) return;
		return this.props.dispatch((0, _actions.setCurrentPage)(i));
	},
	toggleManageMode(filter = !this.state.manageMode) {
		this.setState({
			manageMode: filter,
			checkedItems: {}
		});
	},
	toggleUpdateModal(filter = !this.state.showUpdateForm) {
		this.setState({
			showUpdateForm: filter
		});
	},
	massUpdate() {
		// TODO: Implement update multi-item
		console.log('Update ALL the things!');
	},
	massDelete() {
		const { checkedItems } = this.state;
		const list = this.props.currentList;
		const itemCount = (0, _string.plural)(checkedItems, '* ' + list.singular.toLowerCase(), '* ' + list.plural.toLowerCase());
		const itemIds = Object.keys(checkedItems);

		this.setState({
			confirmationDialog: {
				isOpen: true,
				label: 'Delete',
				body: _react2.default.createElement(
					'div',
					null,
					'Are you sure you want to delete ',
					itemCount,
					'?',
					_react2.default.createElement('br', null),
					_react2.default.createElement('br', null),
					'This cannot be undone.'
				),
				onConfirmation: () => {
					this.props.dispatch((0, _actions.deleteItems)(itemIds));
					this.toggleManageMode();
					this.removeConfirmationDialog();
				}
			}
		});
	},
	handleManagementSelect(selection) {
		if (selection === 'all') this.checkAllItems();
		if (selection === 'none') this.uncheckAllTableItems();
		if (selection === 'visible') this.checkAllTableItems();
		return false;
	},
	renderConfirmationDialog() {
		const props = this.state.confirmationDialog;
		return _react2.default.createElement(
			_ConfirmationDialog2.default,
			{
				confirmationLabel: props.label,
				isOpen: props.isOpen,
				onCancel: this.removeConfirmationDialog,
				onConfirmation: props.onConfirmation
			},
			props.body
		);
	},
	renderManagement() {
		const { checkedItems, manageMode, selectAllItemsLoading } = this.state;
		const { currentList } = this.props;

		return _react2.default.createElement(_ListManagement2.default, {
			checkedItemCount: Object.keys(checkedItems).length,
			handleDelete: this.massDelete,
			handleSelect: this.handleManagementSelect,
			handleToggle: () => this.toggleManageMode(!manageMode),
			isOpen: manageMode,
			itemCount: this.props.items.count,
			itemsPerPage: this.props.lists.page.size,
			nodelete: currentList.nodelete,
			noedit: currentList.noedit,
			selectAllItemsLoading: selectAllItemsLoading
		});
	},
	renderPagination() {
		const items = this.props.items;
		if (this.state.manageMode || !items.count) return;

		const list = this.props.currentList;
		const currentPage = this.props.lists.page.index;
		const pageSize = this.props.lists.page.size;

		return _react2.default.createElement(_elemental.Pagination, {
			currentPage: currentPage,
			onPageSelect: this.handlePageSelect,
			pageSize: pageSize,
			plural: list.plural,
			singular: list.singular,
			style: { marginBottom: 0 },
			total: items.count,
			limit: 10
		});
	},
	renderHeader() {
		const items = this.props.items;
		const { autocreate, nocreate, plural, singular } = this.props.currentList;

		return _react2.default.createElement(
			_elemental.Container,
			{ style: { paddingTop: '2em' } },
			_react2.default.createElement(_ListHeaderTitle2.default, {
				activeSort: this.props.active.sort,
				availableColumns: this.props.currentList.columns,
				handleSortSelect: this.handleSortSelect,
				title: `
						${(0, _numeral2.default)(items.count).format()}
						${(0, _string.plural)(items.count, ' ' + singular, ' ' + plural)}
					`
			}),
			_react2.default.createElement(_ListHeaderToolbar2.default
			// common
			, { dispatch: this.props.dispatch,
				list: _lists.listsByPath[this.props.params.listId]

				// expand
				, expandIsActive: !this.state.constrainTableWidth,
				expandOnClick: this.toggleTableWidth

				// create
				, createIsAvailable: !nocreate,
				createListName: singular,
				createOnClick: autocreate ? this.createAutocreate : this.openCreateModal

				// search
				, searchHandleChange: this.updateSearch,
				searchHandleClear: this.handleSearchClear,
				searchHandleKeyup: this.handleSearchKey,
				searchValue: this.props.active.search

				// filters
				, filtersActive: this.props.active.filters,
				filtersAvailable: this.props.currentList.columns.filter(col => col.field && col.field.hasFilterMethod || col.type === 'heading')

				// columns
				, columnsActive: this.props.active.columns,
				columnsAvailable: this.props.currentList.columns
			}),
			_react2.default.createElement(_ListFilters2.default, {
				dispatch: this.props.dispatch,
				filters: this.props.active.filters
			})
		);
	},

	// ==============================
	// TABLE
	// ==============================

	checkTableItem(item, e) {
		e.preventDefault();
		const newCheckedItems = _extends({}, this.state.checkedItems);
		const itemId = item.id;
		if (this.state.checkedItems[itemId]) {
			delete newCheckedItems[itemId];
		} else {
			newCheckedItems[itemId] = true;
		}
		this.setState({
			checkedItems: newCheckedItems
		});
	},
	checkAllTableItems() {
		const checkedItems = {};
		this.props.items.results.forEach(item => {
			checkedItems[item.id] = true;
		});
		this.setState({
			checkedItems: checkedItems
		});
	},
	checkAllItems() {
		const checkedItems = _extends({}, this.state.checkedItems);
		// Just in case this API call takes a long time, we'll update the select all button with
		// a spinner.
		this.setState({ selectAllItemsLoading: true });
		var self = this;
		this.props.currentList.loadItems({ expandRelationshipFilters: false, filters: {} }, function (err, data) {
			data.results.forEach(item => {
				checkedItems[item.id] = true;
			});
			self.setState({
				checkedItems: checkedItems,
				selectAllItemsLoading: false
			});
		});
	},
	uncheckAllTableItems() {
		this.setState({
			checkedItems: {}
		});
	},
	deleteTableItem(item, e) {
		if (e.altKey) {
			this.props.dispatch((0, _actions2.deleteItem)(item.id));
			return;
		}

		e.preventDefault();

		this.setState({
			confirmationDialog: {
				isOpen: true,
				label: 'Delete',
				body: _react2.default.createElement(
					'div',
					null,
					'Are you sure you want to delete ',
					_react2.default.createElement(
						'strong',
						null,
						item.name
					),
					'?',
					_react2.default.createElement('br', null),
					_react2.default.createElement('br', null),
					'This cannot be undone.'
				),
				onConfirmation: () => {
					this.props.dispatch((0, _actions2.deleteItem)(item.id));
					this.removeConfirmationDialog();
				}
			}
		});
	},
	removeConfirmationDialog() {
		this.setState({
			confirmationDialog: {
				isOpen: false
			}
		});
	},
	toggleTableWidth() {
		this.setState({
			constrainTableWidth: !this.state.constrainTableWidth
		});
	},

	// ==============================
	// COMMON
	// ==============================

	handleSortSelect(path, inverted) {
		if (inverted) path = '-' + path;
		this.props.dispatch((0, _actions.setActiveSort)(path));
	},
	toggleCreateModal(visible) {
		this.setState({
			showCreateForm: visible
		});
	},
	openCreateModal() {
		this.toggleCreateModal(true);
	},
	closeCreateModal() {
		this.toggleCreateModal(false);
	},
	showBlankState() {
		return !this.props.loading && !this.props.items.results.length && !this.props.active.search && !this.props.active.filters.length;
	},
	renderBlankState() {
		const { currentList } = this.props;

		if (!this.showBlankState()) return null;

		// create and nav directly to the item view, or open the create modal
		const onClick = currentList.autocreate ? this.createAutocreate : this.openCreateModal;

		// display the button if create allowed
		const button = !currentList.nocreate ? _react2.default.createElement(
			_elemental.GlyphButton,
			{ color: 'success', glyph: 'plus', position: 'left', onClick: onClick, 'data-e2e-list-create-button': 'no-results' },
			'Create ',
			currentList.singular
		) : null;

		return _react2.default.createElement(
			_elemental.Container,
			null,
			this.props.error ? _react2.default.createElement(_FlashMessages2.default, {
				messages: { error: [{
						title: "There is a problem with the network, we're trying to reconnect..."
					}] }
			}) : null,
			_react2.default.createElement(
				_elemental.BlankState,
				{ heading: `No ${this.props.currentList.plural.toLowerCase()} found...`, style: { marginTop: 40 } },
				button
			)
		);
	},
	renderActiveState() {
		if (this.showBlankState()) return null;

		const containerStyle = {
			transition: 'max-width 160ms ease-out',
			msTransition: 'max-width 160ms ease-out',
			MozTransition: 'max-width 160ms ease-out',
			WebkitTransition: 'max-width 160ms ease-out'
		};
		if (!this.state.constrainTableWidth) {
			containerStyle.maxWidth = '100%';
		}
		return _react2.default.createElement(
			'div',
			null,
			this.renderHeader(),
			_react2.default.createElement(
				_elemental.Container,
				null,
				_react2.default.createElement(
					'div',
					{ style: { height: 35, marginBottom: '1em', marginTop: '1em' } },
					this.renderManagement(),
					this.renderPagination(),
					_react2.default.createElement('span', { style: { clear: 'both', display: 'table' } })
				)
			),
			_react2.default.createElement(
				_elemental.Container,
				{ style: containerStyle },
				this.props.error ? _react2.default.createElement(_FlashMessages2.default, {
					messages: { error: [{
							title: "There is a problem with the network, we're trying to reconnect.."
						}] }
				}) : null,
				this.props.loading ? _react2.default.createElement(
					_elemental.Center,
					{ height: '50vh' },
					_react2.default.createElement(_elemental.Spinner, null)
				) : _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(_ItemsTable2.default, {
						activeSort: this.props.active.sort,
						checkedItems: this.state.checkedItems,
						checkTableItem: this.checkTableItem,
						columns: this.props.active.columns,
						deleteTableItem: this.deleteTableItem,
						handleSortSelect: this.handleSortSelect,
						items: this.props.items,
						list: this.props.currentList,
						manageMode: this.state.manageMode,
						rowAlert: this.props.rowAlert,
						currentPage: this.props.lists.page.index,
						pageSize: this.props.lists.page.size,
						drag: this.props.lists.drag,
						dispatch: this.props.dispatch
					}),
					this.renderNoSearchResults()
				)
			)
		);
	},
	renderNoSearchResults() {
		if (this.props.items.results.length) return null;
		let matching = this.props.active.search;
		if (this.props.active.filters.length) {
			matching += (matching ? ' and ' : '') + (0, _string.plural)(this.props.active.filters.length, '* filter', '* filters');
		}
		matching = matching ? ' found matching ' + matching : '.';
		return _react2.default.createElement(
			_elemental.BlankState,
			{ style: { marginTop: 20, marginBottom: 20 } },
			_react2.default.createElement(_elemental.Glyph, {
				name: 'search',
				size: 'medium',
				style: { marginBottom: 20 }
			}),
			_react2.default.createElement(
				'h2',
				{ style: { color: 'inherit' } },
				'No ',
				this.props.currentList.plural.toLowerCase(),
				matching
			)
		);
	},
	render() {
		if (!this.props.ready) {
			return _react2.default.createElement(
				_elemental.Center,
				{ height: '50vh', 'data-screen-id': 'list' },
				_react2.default.createElement(_elemental.Spinner, null)
			);
		}
		return _react2.default.createElement(
			'div',
			{ 'data-screen-id': 'list' },
			this.renderBlankState(),
			this.renderActiveState(),
			_react2.default.createElement(_CreateForm2.default, {
				err: Keystone.createFormErrors,
				isOpen: this.state.showCreateForm,
				list: this.props.currentList,
				onCancel: this.closeCreateModal,
				onCreate: this.onCreate
			}),
			_react2.default.createElement(_UpdateForm2.default, {
				isOpen: this.state.showUpdateForm,
				itemIds: Object.keys(this.state.checkedItems),
				list: this.props.currentList,
				onCancel: () => this.toggleUpdateModal(false)
			}),
			this.renderConfirmationDialog()
		);
	}
});

module.exports = (0, _reactRedux.connect)(state => {
	return {
		lists: state.lists,
		loading: state.lists.loading,
		error: state.lists.error,
		currentList: state.lists.currentList,
		items: state.lists.items,
		page: state.lists.page,
		ready: state.lists.ready,
		rowAlert: state.lists.rowAlert,
		active: state.active
	};
})(ListView);