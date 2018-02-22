'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.HomeView = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../elemental');

var _reactRedux = require('react-redux');

var _Lists = require('./components/Lists');

var _Lists2 = _interopRequireDefault(_Lists);

var _Section = require('./components/Section');

var _Section2 = _interopRequireDefault(_Section);

var _AlertMessages = require('../../shared/AlertMessages');

var _AlertMessages2 = _interopRequireDefault(_AlertMessages);

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HomeView = _react2.default.createClass({
	displayName: 'HomeView',
	getInitialState() {
		return {
			modalIsOpen: true
		};
	},
	// When everything is rendered, start loading the item counts of the lists
	// from the API
	componentDidMount() {
		this.props.dispatch((0, _actions.loadCounts)());
	},
	getSpinner() {
		if (this.props.counts && Object.keys(this.props.counts).length === 0 && (this.props.error || this.props.loading)) {
			return _react2.default.createElement(_elemental.Spinner, null);
		}
		return null;
	},
	render() {
		const spinner = this.getSpinner();
		return _react2.default.createElement(
			_elemental.Container,
			{ 'data-screen-id': 'home' },
			_react2.default.createElement(
				'div',
				{ className: 'dashboard-header' },
				_react2.default.createElement(
					'div',
					{ className: 'dashboard-heading' },
					Keystone.brand
				)
			),
			_react2.default.createElement(
				'div',
				{ className: 'dashboard-groups' },
				this.props.error && _react2.default.createElement(_AlertMessages2.default, {
					alerts: { error: { error: "There is a problem with the network, we're trying to reconnect..."
						} }
				}),
				Keystone.nav.flat ? _react2.default.createElement(_Lists2.default, {
					counts: this.props.counts,
					lists: Keystone.lists,
					spinner: spinner
				}) : _react2.default.createElement(
					'div',
					null,
					Keystone.nav.sections.map(navSection => {
						return _react2.default.createElement(
							_Section2.default,
							{ key: navSection.key, id: navSection.key, label: navSection.label },
							_react2.default.createElement(_Lists2.default, {
								counts: this.props.counts,
								lists: navSection.lists,
								spinner: spinner
							})
						);
					}),
					Keystone.orphanedLists.length ? _react2.default.createElement(
						_Section2.default,
						{ label: 'Other', icon: 'octicon-database' },
						_react2.default.createElement(_Lists2.default, {
							counts: this.props.counts,
							lists: Keystone.orphanedLists,
							spinner: spinner
						})
					) : null
				)
			)
		);
	}
}); /**
     * The Home view is the view one sees at /keystone. It shows a list of all lists,
     * grouped by their section.
     */

exports.HomeView = HomeView;
exports.default = (0, _reactRedux.connect)(state => ({
	counts: state.home.counts,
	loading: state.home.loading,
	error: state.home.error
}))(HomeView);