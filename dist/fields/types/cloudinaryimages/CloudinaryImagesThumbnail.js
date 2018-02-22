'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elemental = require('../../../admin/client/App/elemental');

var _ImageThumbnail = require('../../components/ImageThumbnail');

var _ImageThumbnail2 = _interopRequireDefault(_ImageThumbnail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function CloudinaryImagesThumbnail(_ref) {
	let {
		isDeleted,
		imageSourceLarge,
		imageSourceSmall,
		inputName,
		isQueued,
		openLightbox,
		shouldRenderActionButton,
		toggleDelete,
		value
	} = _ref,
	    props = _objectWithoutProperties(_ref, ['isDeleted', 'imageSourceLarge', 'imageSourceSmall', 'inputName', 'isQueued', 'openLightbox', 'shouldRenderActionButton', 'toggleDelete', 'value']);

	// render icon feedback for intent
	let mask;
	if (isQueued) mask = 'upload';else if (isDeleted) mask = 'remove';

	// action button
	const actionButton = shouldRenderActionButton && !isQueued ? _react2.default.createElement(
		_elemental.Button,
		{ variant: 'link', color: isDeleted ? 'default' : 'cancel', block: true, onClick: toggleDelete },
		isDeleted ? 'Undo' : 'Remove'
	) : null;

	const input = !isQueued && !isDeleted && value ? _react2.default.createElement('input', { type: 'hidden', name: inputName, value: JSON.stringify(value) }) : null;

	// provide gutter for the images
	const imageStyles = {
		float: 'left',
		marginBottom: 10,
		marginRight: 10
	};

	return _react2.default.createElement(
		'div',
		{ style: imageStyles },
		_react2.default.createElement(
			_ImageThumbnail2.default,
			{
				component: imageSourceLarge ? 'a' : 'span',
				href: !!imageSourceLarge && imageSourceLarge,
				onClick: !!imageSourceLarge && openLightbox,
				mask: mask,
				target: !!imageSourceLarge && '__blank'
			},
			_react2.default.createElement('img', { src: imageSourceSmall, style: { height: 90 } })
		),
		actionButton,
		input
	);
};

CloudinaryImagesThumbnail.propTypes = {
	imageSourceLarge: _react.PropTypes.string,
	imageSourceSmall: _react.PropTypes.string.isRequired,
	isDeleted: _react.PropTypes.bool,
	isQueued: _react.PropTypes.bool,
	openLightbox: _react.PropTypes.func.isRequired,
	shouldRenderActionButton: _react.PropTypes.bool,
	toggleDelete: _react.PropTypes.func.isRequired
};

module.exports = CloudinaryImagesThumbnail;