/*
This file exports the common packages required by the Admin UI.

It is used by build.js to to generate public/js/packages.js, and the packages
below are excluded from the browserify builds generated by
admin/server/middleware/browserify.js
*/

module.exports = [
	'aphrodite/no-important',
	'async',
	'blacklist',
	'classnames',
	'display-name',
	'elemental',
	'expression-match',
	'fsm-as-promised',
	'i',
	'list-to-array',
	'lodash',
	'marked',
	'moment',
	'numeral',
	'qs',
	'react-addons-css-transition-group',
	'react-alt-text',
	'react-color',
	'react-day-picker',
	'react-dnd-html5-backend',
	'react-dnd',
	'react-dom',
	'react-images',
	'react-redux',
	'react-router-redux',
	'react-router',
	'react-select',
	'react',
	'redux-saga',
	'redux-thunk',
	'redux',
	'vkey',
	'xhr',
];
