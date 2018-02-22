'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _FieldType = require('./components/FieldType');

var _FieldType2 = _interopRequireDefault(_FieldType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Types = {
	Boolean: require('../types/boolean/test/explorer'),
	Code: require('../types/code/test/explorer'),
	Color: require('../types/color/test/explorer'),
	CloudinaryImage: require('../types/cloudinaryimage/test/explorer'),
	CloudinaryImages: require('../types/cloudinaryimages/test/explorer'),
	Date: require('../types/date/test/explorer'),
	DateArray: require('../types/datearray/test/explorer'),
	Datetime: require('../types/datetime/test/explorer'),
	Email: require('../types/email/test/explorer'),
	Geopoint: require('../types/geopoint/test/explorer'),
	Html: require('../types/html/test/explorer'),
	Key: require('../types/key/test/explorer'),
	Location: require('../types/location/test/explorer'),
	Markdown: require('../types/markdown/test/explorer'),
	Money: require('../types/money/test/explorer'),
	Name: require('../types/name/test/explorer'),
	Number: require('../types/number/test/explorer'),
	NumberArray: require('../types/numberarray/test/explorer'),
	Password: require('../types/password/test/explorer'),
	Select: require('../types/select/test/explorer'),
	Relationship: require('../types/relationship/test/explorer'),
	Text: require('../types/text/test/explorer'),
	Textarea: require('../types/textarea/test/explorer'),
	TextArray: require('../types/textarray/test/explorer'),
	Url: require('../types/url/test/explorer')
};

function generateNavSections(arr) {
	const navSections = {};
	arr.forEach(t => {
		if (!navSections[t.section]) navSections[t.section] = [];
	});
	arr.forEach(t => navSections[t.section].push(t.Field.type));

	return navSections;
}

const navSections = generateNavSections(Object.keys(Types).map(i => Types[i]));

class App extends _react.Component {
	constructor() {
		super();
		this.toggleSidebar = this.toggleSidebar.bind(this);
		this.state = { sidebarIsOpen: true };
	}
	toggleSidebar() {
		this.setState({ sidebarIsOpen: !this.state.sidebarIsOpen });
	}
	render() {
		const { children, params } = this.props;
		const { sidebarIsOpen } = this.state;

		return _react2.default.createElement(
			'div',
			{ className: `fx-wrapper ${sidebarIsOpen ? 'fx-wrapper--sidebar-is-open' : ''}` },
			_react2.default.createElement(
				'div',
				{ className: 'fx-sidebar' },
				_react2.default.createElement(
					'div',
					{ className: 'fx-sidebar__header' },
					params.type ? _react2.default.createElement(
						_reactRouter.Link,
						{ to: '/', className: 'fx-sidebar__header__link' },
						'Field Types'
					) : 'Ready',
					_react2.default.createElement('div', { className: 'fx-sidebar__header__border' })
				),
				Object.keys(navSections).sort().map(section => {
					let currentSection;
					const types = navSections[section].map(type => {

						if (Types[params.type]) {
							currentSection = Types[params.type].section;
						}

						const itemClassName = params.type === type ? 'fx-sidebar__item fx-sidebar__item--active' : 'fx-sidebar__item';

						return _react2.default.createElement(
							_reactRouter.Link,
							{ key: type, to: `/${type}`, className: itemClassName },
							type
						);
					});

					const sectionClassName = currentSection === section ? 'fx-sidebar__section fx-sidebar__section--active' : 'fx-sidebar__section';

					return _react2.default.createElement(
						'div',
						{ key: section, className: sectionClassName },
						_react2.default.createElement(
							'div',
							{ key: section, className: 'fx-sidebar__section__title' },
							section
						),
						types
					);
				})
			),
			_react2.default.createElement(
				'div',
				{ className: 'fx-body' },
				_react.Children.map(children, child => {
					if (!params.type) return child;

					const Type = Types[params.type];

					return (0, _react.cloneElement)(child, {
						FieldComponent: Type.Field,
						FilterComponent: Type.Filter,
						filter: Type.Filter.getDefaultValue(),
						readme: Type.readme,
						section: Type.section,
						spec: Type.spec,
						toggleSidebar: this.toggleSidebar,
						value: Type.spec.value
					});
				})
			)
		);
	}
};

const Home = props => {
	return _react2.default.createElement(
		'div',
		{ className: 'fx-welcome' },
		_react2.default.createElement(
			'div',
			{ className: 'fx-welcome__inner' },
			_react2.default.createElement(
				'h1',
				{ className: 'fx-welcome__heading' },
				'Welcome!'
			),
			_react2.default.createElement(
				'div',
				{ className: 'fx-welcome__content' },
				'Select a field on the left to begin exploring...'
			)
		)
	);
};

_reactDom2.default.render(_react2.default.createElement(
	_reactRouter.Router,
	{ history: _reactRouter.browserHistory },
	_react2.default.createElement(
		_reactRouter.Route,
		{ path: '/', component: App },
		_react2.default.createElement(_reactRouter.IndexRoute, { component: Home }),
		_react2.default.createElement(_reactRouter.Route, { path: ':type', component: _FieldType2.default })
	)
), document.getElementById('explorer'));