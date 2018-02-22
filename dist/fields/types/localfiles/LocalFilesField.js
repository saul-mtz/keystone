'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /*
                                                                                                                                                                                                                                                                  TODO: this file has been left as a reference for the new File type field.
                                                                                                                                                                                                                                                                  Some features here, including size formatting and icons, may be ported across.
                                                                                                                                                                                                                                                                  */

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bytes = require('bytes');

var _bytes2 = _interopRequireDefault(_bytes);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../../admin/client/App/elemental');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ICON_EXTS = ['aac', 'ai', 'aiff', 'avi', 'bmp', 'c', 'cpp', 'css', 'dat', 'dmg', 'doc', 'dotx', 'dwg', 'dxf', 'eps', 'exe', 'flv', 'gif', 'h', 'hpp', 'html', 'ics', 'iso', 'java', 'jpg', 'js', 'key', 'less', 'mid', 'mp3', 'mp4', 'mpg', 'odf', 'ods', 'odt', 'otp', 'ots', 'ott', 'pdf', 'php', 'png', 'ppt', 'psd', 'py', 'qt', 'rar', 'rb', 'rtf', 'sass', 'scss', 'sql', 'tga', 'tgz', 'tiff', 'txt', 'wav', 'xls', 'xlsx', 'xml', 'yml', 'zip'];

var LocalFilesFieldItem = _react2.default.createClass({
	displayName: 'LocalFilesFieldItem',

	propTypes: {
		deleted: _react2.default.PropTypes.bool,
		filename: _react2.default.PropTypes.string,
		isQueued: _react2.default.PropTypes.bool,
		size: _react2.default.PropTypes.number,
		toggleDelete: _react2.default.PropTypes.func
	},

	renderActionButton() {
		if (!this.props.shouldRenderActionButton || this.props.isQueued) return null;

		var buttonLabel = this.props.deleted ? 'Undo' : 'Remove';
		var buttonType = this.props.deleted ? 'link' : 'link-cancel';

		return _react2.default.createElement(
			_elemental.Button,
			{ key: 'action-button', type: buttonType, onClick: this.props.toggleDelete },
			buttonLabel
		);
	},

	render() {
		const { filename } = this.props;
		const ext = filename.split('.').pop();

		let iconName = '_blank';
		if (_lodash2.default.includes(ICON_EXTS, ext)) iconName = ext;

		let note;
		if (this.props.deleted) {
			note = _react2.default.createElement(
				_elemental.FormInput,
				{ key: 'delete-note', noedit: true, className: 'field-type-localfiles__note field-type-localfiles__note--delete' },
				'save to delete'
			);
		} else if (this.props.isQueued) {
			note = _react2.default.createElement(
				_elemental.FormInput,
				{ key: 'upload-note', noedit: true, className: 'field-type-localfiles__note field-type-localfiles__note--upload' },
				'save to upload'
			);
		}

		return _react2.default.createElement(
			_elemental.FormField,
			null,
			_react2.default.createElement('img', { key: 'file-type-icon', className: 'file-icon', src: Keystone.adminPath + '/images/icons/32/' + iconName + '.png' }),
			_react2.default.createElement(
				_elemental.FormInput,
				{ key: 'file-name', noedit: true, className: 'field-type-localfiles__filename' },
				filename,
				this.props.size ? ' (' + (0, _bytes2.default)(this.props.size) + ')' : null
			),
			note,
			this.renderActionButton()
		);
	}

});

var tempId = 0;

module.exports = _Field2.default.create({

	getInitialState() {
		var items = [];
		var self = this;

		_lodash2.default.forEach(this.props.value, function (item) {
			self.pushItem(item, items);
		});

		return { items: items };
	},

	removeItem(id) {
		var thumbs = [];
		var self = this;
		_lodash2.default.forEach(this.state.items, function (thumb) {
			var newProps = Object.assign({}, thumb.props);
			if (thumb.props._id === id) {
				newProps.deleted = !thumb.props.deleted;
			}
			self.pushItem(newProps, thumbs);
		});

		this.setState({ items: thumbs });
	},

	pushItem(args, thumbs) {
		thumbs = thumbs || this.state.items;
		args.toggleDelete = this.removeItem.bind(this, args._id);
		args.shouldRenderActionButton = this.shouldRenderField();
		args.adminPath = Keystone.adminPath;
		thumbs.push(_react2.default.createElement(LocalFilesFieldItem, _extends({ key: args._id || tempId++ }, args)));
	},

	fileFieldNode() {
		return this.refs.fileField;
	},

	renderFileField() {
		return _react2.default.createElement('input', { ref: 'fileField', type: 'file', name: this.props.paths.upload, multiple: true, className: 'field-upload', onChange: this.uploadFile, tabIndex: '-1' });
	},

	clearFiles() {
		this.fileFieldNode().value = '';

		this.setState({
			items: this.state.items.filter(function (thumb) {
				return !thumb.props.isQueued;
			})
		});
	},

	uploadFile(event) {
		var self = this;

		var files = event.target.files;
		_lodash2.default.forEach(files, function (f) {
			self.pushItem({ isQueued: true, filename: f.name });
			self.forceUpdate();
		});
	},

	changeFiles() {
		this.fileFieldNode().click();
	},

	hasFiles() {
		return this.refs.fileField && this.fileFieldNode().value;
	},

	renderToolbar() {
		if (!this.shouldRenderField()) return null;

		var clearFilesButton;
		if (this.hasFiles()) {
			clearFilesButton = _react2.default.createElement(
				_elemental.Button,
				{ type: 'link-cancel', className: 'ml-5', onClick: this.clearFiles },
				'Clear Uploads'
			);
		}

		return _react2.default.createElement(
			'div',
			{ className: 'files-toolbar' },
			_react2.default.createElement(
				_elemental.Button,
				{ onClick: this.changeFiles },
				'Upload'
			),
			clearFilesButton
		);
	},

	renderPlaceholder() {
		return _react2.default.createElement(
			'div',
			{ className: 'file-field file-upload', onClick: this.changeFiles },
			_react2.default.createElement(
				'div',
				{ className: 'file-preview' },
				_react2.default.createElement(
					'span',
					{ className: 'file-thumbnail' },
					_react2.default.createElement('span', { className: 'file-dropzone' }),
					_react2.default.createElement('div', { className: 'ion-picture file-uploading' })
				)
			),
			_react2.default.createElement(
				'div',
				{ className: 'file-details' },
				_react2.default.createElement(
					'span',
					{ className: 'file-message' },
					'Click to upload'
				)
			)
		);
	},

	renderContainer() {
		return _react2.default.createElement(
			'div',
			{ className: 'files-container clearfix' },
			this.state.items
		);
	},

	renderFieldAction() {
		var value = '';
		var remove = [];
		_lodash2.default.forEach(this.state.items, function (thumb) {
			if (thumb && thumb.props.deleted) remove.push(thumb.props._id);
		});
		if (remove.length) value = 'delete:' + remove.join(',');

		return _react2.default.createElement('input', { ref: 'action', className: 'field-action', type: 'hidden', value: value, name: this.props.paths.action });
	},

	renderUploadsField() {
		return _react2.default.createElement('input', { ref: 'uploads', className: 'field-uploads', type: 'hidden', name: this.props.paths.uploads });
	},

	renderNote: function () {
		if (!this.props.note) return null;
		return _react2.default.createElement(_elemental.FormNote, { html: this.props.note });
	},

	renderUI() {
		return _react2.default.createElement(
			_elemental.FormField,
			{ label: this.props.label, className: 'field-type-localfiles', htmlFor: this.props.path },
			this.renderFieldAction(),
			this.renderUploadsField(),
			this.renderFileField(),
			this.renderContainer(),
			this.renderToolbar(),
			this.renderNote()
		);
	}
});