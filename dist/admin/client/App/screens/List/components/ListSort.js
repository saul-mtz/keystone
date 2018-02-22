'use strict';

var _elemental = require('../../../elemental');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _vkey = require('vkey');

var _vkey2 = _interopRequireDefault(_vkey);

var _Kbd = require('../../../shared/Kbd');

var _Kbd2 = _interopRequireDefault(_Kbd);

var _Popout = require('../../../shared/Popout');

var _Popout2 = _interopRequireDefault(_Popout);

var _PopoutList = require('../../../shared/Popout/PopoutList');

var _PopoutList2 = _interopRequireDefault(_PopoutList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListSort = _react2.default.createClass({
	displayName: 'ListSort',
	propTypes: {
		handleSortSelect: _react.PropTypes.func.isRequired
	},
	getInitialState() {
		return {
			altDown: false,
			popoutIsOpen: false,
			searchString: ''
		};
	},
	componentDidMount() {
		document.body.addEventListener('keydown', this.handleKeyDown, false);
		document.body.addEventListener('keyup', this.handleKeyUp, false);
	},
	componentWillUnmount() {
		document.body.removeEventListener('keydown', this.handleKeyDown);
		document.body.removeEventListener('keyup', this.handleKeyUp);
	},
	handleKeyDown(e) {
		if (_vkey2.default[e.keyCode] !== '<alt>') return;
		this.setState({
			altDown: true
		});
	},
	handleKeyUp(e) {
		if (_vkey2.default[e.keyCode] !== '<alt>') return;
		this.setState({
			altDown: false
		});
	},
	handleSortSelect(path, inverted) {
		if (this.state.altDown) inverted = true;
		this.props.handleSortSelect(path, inverted);
		this.closePopout();
	},
	openPopout() {
		this.setState({
			popoutIsOpen: true
		});
	},
	closePopout() {
		this.setState({
			popoutIsOpen: false,
			searchString: ''
		});
	},
	updateSearch(e) {
		this.setState({ searchString: e.target.value });
	},
	renderSortOptions() {
		// TODO: Handle multiple sort paths
		const activeSortPath = this.props.activeSort.paths[0];
		const availibleColumns = this.props.availableColumns;
		const { searchString } = this.state;
		let filteredColumns = availibleColumns;

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
			const isSelected = activeSortPath && activeSortPath.path === path;
			const isInverted = isSelected && activeSortPath.invert;
			const icon = this.state.altDown || isSelected && !isInverted ? 'chevron-up' : 'chevron-down';

			return _react2.default.createElement(_PopoutList2.default.Item, {
				key: 'column_' + el.field.path,
				icon: icon,
				isSelected: isSelected,
				label: el.field.label,
				onClick: () => {
					this.handleSortSelect(path, isSelected && !isInverted);
				} });
		});
	},
	render() {
		// TODO: Handle multiple sort paths
		const activeSortPath = this.props.activeSort.paths[0];
		const formFieldStyles = { borderBottom: '1px dashed rgba(0,0,0,0.1)', paddingBottom: '1em' };

		return _react2.default.createElement(
			'span',
			null,
			activeSortPath && _react2.default.createElement(
				'span',
				null,
				_react2.default.createElement(
					'span',
					{ style: { color: '#999' } },
					' sorted by '
				),
				_react2.default.createElement(
					'a',
					{ id: 'listHeaderSortButton', href: 'javascript:;', onClick: this.openPopout },
					activeSortPath.label.toLowerCase(),
					activeSortPath.invert ? ' (descending)' : '',
					_react2.default.createElement('span', { className: 'disclosure-arrow' })
				)
			),
			_react2.default.createElement(
				_Popout2.default,
				{ isOpen: this.state.popoutIsOpen, onCancel: this.closePopout, relativeToID: 'listHeaderSortButton' },
				_react2.default.createElement(_Popout2.default.Header, { title: 'Sort' }),
				_react2.default.createElement(
					_Popout2.default.Body,
					{ scrollable: true },
					_react2.default.createElement(
						_elemental.FormField,
						{ style: formFieldStyles },
						_react2.default.createElement(_elemental.FormInput, {
							autoFocus: true,
							value: this.state.searchString,
							onChange: this.updateSearch,
							placeholder: 'Find a field...'
						})
					),
					_react2.default.createElement(
						_PopoutList2.default,
						null,
						this.renderSortOptions()
					)
				),
				_react2.default.createElement(
					_Popout2.default.Footer,
					null,
					_react2.default.createElement(
						_elemental.FormNote,
						null,
						'Hold ',
						_react2.default.createElement(
							_Kbd2.default,
							null,
							'alt'
						),
						' to toggle ascending/descending'
					)
				)
			)
		);
	}
});

module.exports = ListSort;