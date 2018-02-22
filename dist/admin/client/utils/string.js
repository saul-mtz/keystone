'use strict';

var _i = require('i');

var _i2 = _interopRequireDefault(_i);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Displays the singular or plural of a string based on a number
 * or number of items in an array.
 *
 * If arity is 1, returns the plural form of the word.
 *
 * @param {String} count
 * @param {String} singular string
 * @param {String} plural string
 * @return {String} singular or plural, * is replaced with count
 * @api public
 */

/**
 * A few helper methods for strings
 */

exports.plural = function (count, sn, pl) {
  if (arguments.length === 1) {
    return _i2.default.pluralize(count);
  }
  if (typeof sn !== 'string') sn = '';
  if (!pl) {
    pl = _i2.default.pluralize(sn);
  }
  if (typeof count === 'string') {
    count = Number(count);
  } else if (typeof count !== 'number') {
    count = (0, _lodash.size)(count);
  }
  return (count === 1 ? sn : pl).replace('*', count);
};

/**
 * Converts the first letter in a string to uppercase
 *
 * @param {String} str
 * @return {String} Str
 * @api public
 */

exports.upcase = function (str) {
  if (str && str.toString) str = str.toString();
  if (typeof str !== 'string' || !str.length) return '';
  return str.substr(0, 1).toUpperCase() + str.substr(1);
};

/**
 * Converts the first letter in a string to lowercase
 *
 * @param {String} Str
 * @return {String} str
 * @api public
 */

exports.downcase = function (str) {
  if (str && str.toString) str = str.toString();
  if (typeof str !== 'string' || !str.length) return '';
  return str.substr(0, 1).toLowerCase() + str.substr(1);
};

/**
 * Converts a string to title case
 *
 * @param {String} str
 * @return {String} Title Case form of str
 * @api public
 */

exports.titlecase = function (str) {
  if (str && str.toString) str = str.toString();
  if (typeof str !== 'string' || !str.length) return '';
  str = str.replace(/([a-z])([A-Z])/g, '$1 $2');
  var parts = str.split(/\s|_|\-/);
  for (var i = 0; i < parts.length; i++) {
    if (parts[i] && !/^[A-Z0-9]+$/.test(parts[i])) {
      parts[i] = exports.upcase(parts[i]);
    }
  }
  return (0, _lodash.compact)(parts).join(' ');
};

/**
 * Converts a string to camel case
 *
 * @param {String} str
 * @param {Boolean} lowercaseFirstWord
 * @return {String} camel-case form of str
 * @api public
 */

exports.camelcase = function (str, lc) {
  return _i2.default.camelize(str, !lc);
};