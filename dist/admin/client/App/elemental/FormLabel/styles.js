'use strict';

var _theme = require('../../../theme');

var _theme2 = _interopRequireDefault(_theme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
	'FormLabel': {
		color: _theme2.default.form.label.color,
		fontSize: _theme2.default.form.label.fontSize,
		fontWeight: _theme2.default.form.label.fontWeight,
		display: 'inline-block',
		marginBottom: '0.5em'
	},

	// when inside a horizontal form

	'FormLabel--form-layout-horizontal': {
		[`@media (min-width: ${_theme2.default.breakpoint.tabletLandscapeMin})`]: {
			display: 'table-cell',
			lineHeight: _theme2.default.component.lineHeight, // fix
			marginBottom: 0,
			paddingRight: 5,
			verticalAlign: 'top',
			width: _theme2.default.form.label.width
		}
	},

	// crop long text

	'FormLabel--crop-text': {
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap'
	}
}; // ==============================
// Form Label
// ==============================