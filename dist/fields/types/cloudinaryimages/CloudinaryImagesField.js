'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /*
                                                                                                                                                                                                                                                                  TODO: This component manages thumbnails using some wacky internal state.
                                                                                                                                                                                                                                                                  It works, but would really benefit from a cleanup/rewrite. It may not behave
                                                                                                                                                                                                                                                                  as expected in different situations (i.e. does not report updated value
                                                                                                                                                                                                                                                                  to props.onChange correctly as the user interacts with it)
                                                                                                                                                                                                                                                                  */

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _elemental = require('../../../admin/client/App/elemental');

var _reactImages = require('react-images');

var _reactImages2 = _interopRequireDefault(_reactImages);

var _cloudinaryResize = require('../../../admin/client/utils/cloudinaryResize');

var _cloudinaryResize2 = _interopRequireDefault(_cloudinaryResize);

var _CloudinaryImagesThumbnail = require('./CloudinaryImagesThumbnail');

var _CloudinaryImagesThumbnail2 = _interopRequireDefault(_CloudinaryImagesThumbnail);

var _HiddenFileInput = require('../../components/HiddenFileInput');

var _HiddenFileInput2 = _interopRequireDefault(_HiddenFileInput);

var _FileChangeMessage = require('../../components/FileChangeMessage');

var _FileChangeMessage2 = _interopRequireDefault(_FileChangeMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SUPPORTED_TYPES = ['image/*', 'application/pdf', 'application/postscript'];
const SUPPORTED_REGEX = new RegExp(/^image\/|application\/pdf|application\/postscript/g);
const RESIZE_DEFAULTS = {
	crop: 'fit',
	format: 'jpg'
};

let uploadInc = 1000;

module.exports = _Field2.default.create({
	displayName: 'CloudinaryImagesField',
	statics: {
		type: 'CloudinaryImages',
		getDefaultValue: () => []
	},
	getInitialState() {
		return this.buildInitialState(this.props);
	},
	componentWillUpdate(nextProps) {
		// Reset the thumbnails and upload ID when the item value changes
		// TODO: We should add a check for a new item ID in the store
		const value = _lodash2.default.map(this.props.value, 'public_id').join();
		const nextValue = _lodash2.default.map(nextProps.value, 'public_id').join();
		if (value !== nextValue) {
			this.setState(this.buildInitialState(nextProps));
		}
	},
	buildInitialState(props) {
		const uploadFieldPath = `CloudinaryImages-${props.path}-${++uploadInc}`;
		const thumbnails = props.value ? props.value.map((img, index) => {
			return this.getThumbnail({
				value: img,
				imageSourceSmall: (0, _cloudinaryResize2.default)(img.public_id, _extends({}, RESIZE_DEFAULTS, {
					height: 90
				})),
				imageSourceLarge: (0, _cloudinaryResize2.default)(img.public_id, _extends({}, RESIZE_DEFAULTS, {
					height: 600,
					width: 900
				}))
			}, index);
		}) : [];
		return { thumbnails, uploadFieldPath };
	},
	getThumbnail(props, index) {
		return _react2.default.createElement(_CloudinaryImagesThumbnail2.default, _extends({
			key: `thumbnail-${index}`,
			inputName: this.getInputName(this.props.path),
			openLightbox: e => this.openLightbox(e, index),
			shouldRenderActionButton: this.shouldRenderField(),
			toggleDelete: this.removeImage.bind(this, index)
		}, props));
	},

	// ==============================
	// HELPERS
	// ==============================

	triggerFileBrowser() {
		this.refs.fileInput.clickDomNode();
	},
	hasFiles() {
		return this.refs.fileInput && this.refs.fileInput.hasValue();
	},
	openLightbox(event, index) {
		event.preventDefault();
		this.setState({
			lightboxIsVisible: true,
			lightboxImageIndex: index
		});
	},
	closeLightbox() {
		this.setState({
			lightboxIsVisible: false,
			lightboxImageIndex: null
		});
	},
	lightboxPrevious() {
		this.setState({
			lightboxImageIndex: this.state.lightboxImageIndex - 1
		});
	},
	lightboxNext() {
		this.setState({
			lightboxImageIndex: this.state.lightboxImageIndex + 1
		});
	},

	// ==============================
	// METHODS
	// ==============================

	removeImage(index) {
		const newThumbnails = [...this.state.thumbnails];
		const target = newThumbnails[index];

		// Use splice + clone to toggle the isDeleted prop
		newThumbnails.splice(index, 1, (0, _react.cloneElement)(target, {
			isDeleted: !target.props.isDeleted
		}));

		this.setState({ thumbnails: newThumbnails });
	},
	getCount(key) {
		var count = 0;

		this.state.thumbnails.forEach(thumb => {
			if (thumb && thumb.props[key]) count++;
		});

		return count;
	},
	clearFiles() {
		this.refs.fileInput.clearValue();

		this.setState({
			thumbnails: this.state.thumbnails.filter(function (thumb) {
				return !thumb.props.isQueued;
			})
		});
	},
	uploadFile(event) {
		if (!window.FileReader) {
			return alert('File reader not supported by browser.');
		}

		// FileList not a real Array; process it into one and check the types
		const files = [];
		for (let i = 0; i < event.target.files.length; i++) {
			const f = event.target.files[i];
			if (!f.type.match(SUPPORTED_REGEX)) {
				return alert('Unsupported file type. Supported formats are: GIF, PNG, JPG, BMP, ICO, PDF, TIFF, EPS, PSD, SVG');
			}
			files.push(f);
		}

		let index = this.state.thumbnails.length;
		_async2.default.mapSeries(files, (file, callback) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = e => {
				callback(null, this.getThumbnail({
					isQueued: true,
					imageSourceSmall: e.target.result
				}, index++));
			};
		}, (err, thumbnails) => {
			this.setState({
				thumbnails: [...this.state.thumbnails, ...thumbnails]
			});
		});
	},

	// ==============================
	// RENDERERS
	// ==============================

	renderFileInput() {
		if (!this.shouldRenderField()) return null;

		return _react2.default.createElement(_HiddenFileInput2.default, {
			accept: SUPPORTED_TYPES.join(),
			key: this.state.uploadFieldPath,
			multiple: true,
			name: this.state.uploadFieldPath,
			onChange: this.uploadFile,
			ref: 'fileInput'
		});
	},
	renderValueInput() {
		if (!this.shouldRenderField()) return null;

		// This renders an input with either the upload field reference, or an
		// empty value to reset the field if all images have been removed
		if (this.hasFiles()) {
			return _react2.default.createElement('input', {
				name: this.getInputName(this.props.path),
				value: `upload:${this.state.uploadFieldPath}`,
				type: 'hidden'
			});
		} else if (this.getCount('isDeleted') === this.props.value.length) {
			return _react2.default.createElement('input', {
				name: this.getInputName(this.props.path),
				value: '',
				type: 'hidden'
			});
		}
	},
	renderLightbox() {
		const { value } = this.props;
		if (!value || !value.length) return;

		const images = value.map(image => ({
			src: (0, _cloudinaryResize2.default)(image.public_id, _extends({}, RESIZE_DEFAULTS, {
				height: 600,
				width: 900
			}))
		}));

		return _react2.default.createElement(_reactImages2.default, {
			images: images,
			currentImage: this.state.lightboxImageIndex,
			isOpen: this.state.lightboxIsVisible,
			onClickPrev: this.lightboxPrevious,
			onClickNext: this.lightboxNext,
			onClose: this.closeLightbox
		});
	},
	renderToolbar() {
		if (!this.shouldRenderField()) return null;

		const uploadCount = this.getCount('isQueued');
		const deleteCount = this.getCount('isDeleted');

		// provide a gutter for the change message
		// only required when no cancel button, which has equiv. padding
		const uploadButtonStyles = !this.hasFiles() ? { marginRight: 10 } : {};

		// prepare the change message
		const changeMessage = uploadCount || deleteCount ? _react2.default.createElement(
			_FileChangeMessage2.default,
			null,
			uploadCount && deleteCount ? `${uploadCount} added and ${deleteCount} removed` : null,
			uploadCount && !deleteCount ? `${uploadCount} image added` : null,
			!uploadCount && deleteCount ? `${deleteCount} image removed` : null
		) : null;

		// prepare the save message
		const saveMessage = uploadCount || deleteCount ? _react2.default.createElement(
			_FileChangeMessage2.default,
			{ color: !deleteCount ? 'success' : 'danger' },
			'Save to ',
			!deleteCount ? 'Upload' : 'Confirm'
		) : null;

		// clear floating images above
		const toolbarStyles = {
			clear: 'both'
		};

		return _react2.default.createElement(
			'div',
			{ style: toolbarStyles },
			_react2.default.createElement(
				_elemental.Button,
				{ onClick: this.triggerFileBrowser, style: uploadButtonStyles, 'data-e2e-upload-button': 'true' },
				'Upload Images'
			),
			this.hasFiles() && _react2.default.createElement(
				_elemental.Button,
				{ variant: 'link', color: 'cancel', onClick: this.clearFiles },
				'Clear selection'
			),
			changeMessage,
			saveMessage
		);
	},
	renderUI() {
		const { label, note, path } = this.props;
		const { thumbnails } = this.state;

		return _react2.default.createElement(
			_elemental.FormField,
			{ label: label, className: 'field-type-cloudinaryimages', htmlFor: path },
			_react2.default.createElement(
				'div',
				null,
				thumbnails
			),
			this.renderValueInput(),
			this.renderFileInput(),
			this.renderToolbar(),
			!!note && _react2.default.createElement(_elemental.FormNote, { note: note }),
			this.renderLightbox()
		);
	}
});