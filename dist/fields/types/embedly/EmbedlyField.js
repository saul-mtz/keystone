'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _elemental = require('../../../admin/client/App/elemental');

var _ImageThumbnail = require('../../components/ImageThumbnail');

var _ImageThumbnail2 = _interopRequireDefault(_ImageThumbnail);

var _NestedFormField = require('../../components/NestedFormField');

var _NestedFormField2 = _interopRequireDefault(_NestedFormField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _Field2.default.create({

	displayName: 'EmbedlyField',
	statics: {
		type: 'Embedly',
		getDefaultValue: () => ({})
	},

	// always defers to renderValue; there is no form UI for this field
	renderField() {
		return this.renderValue();
	},

	renderValue(path, label, multiline) {
		return _react2.default.createElement(
			_NestedFormField2.default,
			{ key: path, label: label },
			_react2.default.createElement(
				_elemental.FormInput,
				{ noedit: true, multiline: multiline },
				this.props.value[path]
			)
		);
	},
	renderAuthor() {
		if (!this.props.value.authorName) return;
		return _react2.default.createElement(
			_NestedFormField2.default,
			{ key: 'author', label: 'Author' },
			_react2.default.createElement(
				_elemental.FormInput,
				{ noedit: true, href: this.props.value.authorUrl && this.props.value.authorUrl, target: '_blank' },
				this.props.value.authorName
			)
		);
	},
	renderDimensions() {
		if (!this.props.value.width || !this.props.value.height) return;
		return _react2.default.createElement(
			_NestedFormField2.default,
			{ key: 'dimensions', label: 'Dimensions' },
			_react2.default.createElement(
				_elemental.FormInput,
				{ noedit: true },
				this.props.value.width,
				' \xD7 ',
				this.props.value.height,
				'px'
			)
		);
	},
	renderPreview() {
		if (!this.props.value.thumbnailUrl) return;

		var image = _react2.default.createElement('img', { width: this.props.value.thumbnailWidth, height: this.props.value.thumbnailHeight, src: this.props.value.thumbnailUrl });

		var preview = this.props.value.url ? _react2.default.createElement(
			_ImageThumbnail2.default,
			{ component: 'a', href: this.props.value.url, target: '_blank' },
			image
		) : _react2.default.createElement(
			_ImageThumbnail2.default,
			null,
			image
		);

		return _react2.default.createElement(
			_NestedFormField2.default,
			{ label: 'Preview' },
			preview
		);
	},

	renderUI() {
		if (!this.props.value.exists) {
			return _react2.default.createElement(
				_elemental.FormField,
				{ label: this.props.label },
				_react2.default.createElement(
					_elemental.FormInput,
					{ noedit: true },
					'(not set)'
				)
			);
		}
		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(
				_elemental.FormField,
				{ key: 'provider', label: this.props.label },
				_react2.default.createElement(
					_elemental.FormInput,
					{ noedit: true },
					this.props.value.providerName,
					' ',
					this.props.value.type
				)
			),
			this.renderValue('title', 'Title'),
			this.renderAuthor(),
			this.renderValue('description', 'Description', true),
			this.renderPreview(),
			this.renderDimensions()
		);
	}

});