'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../elemental');

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _lists = require('../../../utils/lists');

var _CreateForm = require('../../shared/CreateForm');

var _CreateForm2 = _interopRequireDefault(_CreateForm);

var _Alert = require('../../elemental/Alert');

var _Alert2 = _interopRequireDefault(_Alert);

var _EditForm = require('./components/EditForm');

var _EditForm2 = _interopRequireDefault(_EditForm);

var _EditFormHeader = require('./components/EditFormHeader');

var _EditFormHeader2 = _interopRequireDefault(_EditFormHeader);

var _RelatedItemsList = require('./components/RelatedItemsList/RelatedItemsList');

var _RelatedItemsList2 = _interopRequireDefault(_RelatedItemsList);

var _actions = require('./actions');

var _actions2 = require('../List/actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import FlashMessages from '../../shared/FlashMessages';

/**
 * Item View
 *
 * This is the item view, it is rendered when users visit a page of a specific
 * item. This mainly renders the form to edit the item content in.
 */

var ItemView = _react2.default.createClass({
	displayName: 'ItemView',
	contextTypes: {
		router: _react2.default.PropTypes.object.isRequired
	},
	getInitialState() {
		return {
			createIsOpen: false
		};
	},
	componentDidMount() {
		// When we directly navigate to an item without coming from another client
		// side routed page before, we need to select the list before initializing the item
		// We also need to update when the list id has changed
		if (!this.props.currentList || this.props.currentList.id !== this.props.params.listId) {
			this.props.dispatch((0, _actions2.selectList)(this.props.params.listId));
		}
		this.initializeItem(this.props.params.itemId);
	},
	componentWillReceiveProps(nextProps) {
		// We've opened a new item from the client side routing, so initialize
		// again with the new item id
		if (nextProps.params.itemId !== this.props.params.itemId) {
			this.props.dispatch((0, _actions2.selectList)(nextProps.params.listId));
			this.initializeItem(nextProps.params.itemId);
		}
	},
	// Initialize an item
	initializeItem(itemId) {
		this.props.dispatch((0, _actions.selectItem)(itemId));
		this.props.dispatch((0, _actions.loadItemData)());
	},
	// Called when a new item is created
	onCreate(item) {
		// Hide the create form
		this.toggleCreateModal(false);
		// Redirect to newly created item path
		const list = this.props.currentList;
		this.context.router.push(`${Keystone.adminPath}/${list.path}/${item.id}`);
	},
	// Open and close the create new item modal
	toggleCreateModal(visible) {
		this.setState({
			createIsOpen: visible
		});
	},
	// Render this items relationships
	renderRelationships() {
		const { relationships } = this.props.currentList;
		const keys = Object.keys(relationships);
		if (!keys.length) return;
		return _react2.default.createElement(
			'div',
			{ className: 'Relationships' },
			_react2.default.createElement(
				_elemental.Container,
				null,
				_react2.default.createElement(
					'h2',
					null,
					'Relationships'
				),
				keys.map(key => {
					const relationship = relationships[key];
					const refList = _lists.listsByKey[relationship.ref];
					const { currentList, params, relationshipData, drag } = this.props;
					return _react2.default.createElement(_RelatedItemsList2.default, {
						key: relationship.path,
						list: currentList,
						refList: refList,
						relatedItemId: params.itemId,
						relationship: relationship,
						items: relationshipData[relationship.path],
						dragNewSortOrder: drag.newSortOrder,
						dispatch: this.props.dispatch
					});
				})
			)
		);
	},
	// Handle errors
	handleError(error) {
		const detail = error.detail;
		if (detail) {
			// Item not found
			if (detail.name === 'CastError' && detail.path === '_id') {
				return _react2.default.createElement(
					_elemental.Container,
					null,
					_react2.default.createElement(
						_Alert2.default,
						{ color: 'danger', style: { marginTop: '2em' } },
						'No item matching id "',
						this.props.routeParams.itemId,
						'".\xA0',
						_react2.default.createElement(
							_reactRouter.Link,
							{ to: `${Keystone.adminPath}/${this.props.routeParams.listId}` },
							'Got back to ',
							this.props.routeParams.listId,
							'?'
						)
					)
				);
			}
		}
		if (error.message) {
			// Server down + possibly other errors
			if (error.message === 'Internal XMLHttpRequest Error') {
				return _react2.default.createElement(
					_elemental.Container,
					null,
					_react2.default.createElement(
						_Alert2.default,
						{ color: 'danger', style: { marginTop: '2em' } },
						'We encountered some network problems, please refresh.'
					)
				);
			}
		}
		return _react2.default.createElement(
			_elemental.Container,
			null,
			_react2.default.createElement(
				_Alert2.default,
				{ color: 'danger', style: { marginTop: '2em' } },
				'An unknown error has ocurred, please refresh.'
			)
		);
	},
	render() {
		// If we don't have any data yet, show the loading indicator
		if (!this.props.ready) {
			return _react2.default.createElement(
				_elemental.Center,
				{ height: '50vh', 'data-screen-id': 'item' },
				_react2.default.createElement(_elemental.Spinner, null)
			);
		}

		// When we have the data, render the item view with it
		return _react2.default.createElement(
			'div',
			{ 'data-screen-id': 'item' },
			this.props.error ? this.handleError(this.props.error) : _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					_elemental.Container,
					null,
					_react2.default.createElement(_EditFormHeader2.default, {
						list: this.props.currentList,
						data: this.props.data,
						toggleCreate: this.toggleCreateModal
					}),
					_react2.default.createElement(_CreateForm2.default, {
						list: this.props.currentList,
						isOpen: this.state.createIsOpen,
						onCancel: () => this.toggleCreateModal(false),
						onCreate: item => this.onCreate(item)
					}),
					_react2.default.createElement(_EditForm2.default, {
						list: this.props.currentList,
						data: this.props.data,
						dispatch: this.props.dispatch,
						router: this.context.router
					})
				),
				this.renderRelationships()
			)
		);
	}
});

module.exports = (0, _reactRedux.connect)(state => ({
	data: state.item.data,
	loading: state.item.loading,
	ready: state.item.ready,
	error: state.item.error,
	currentList: state.lists.currentList,
	relationshipData: state.item.relationshipData,
	drag: state.item.drag
}))(ItemView);