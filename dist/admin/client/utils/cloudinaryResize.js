'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _cloudinaryMicrourl = require('cloudinary-microurl');

var _cloudinaryMicrourl2 = _interopRequireDefault(_cloudinaryMicrourl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CLOUD_NAME = window.Keystone.cloudinary.cloud_name;

/*
	Take a cloudinary public id + options object
	and return a url
*/
function cloudinaryResize(publicId, options = {}) {
	if (!publicId || !CLOUD_NAME) return false;

	return (0, _cloudinaryMicrourl2.default)(publicId, _extends({
		cloud_name: CLOUD_NAME, // single cloud for the admin UI
		quality: 80 }, options));
};

module.exports = cloudinaryResize;