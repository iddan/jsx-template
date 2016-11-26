'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _xmldom = require('xmldom');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var domparser = new _xmldom.DOMParser();
var xmlserializer = new _xmldom.XMLSerializer();

var __components__ = {};

/**
 * @param {string} template
 * @param {Object} [props]
 * @param {Object.<string, string>} [components]
 * @returns {string}
 */
function compile(template) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var components = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : __components__;

    var root = domparser.parseFromString((0, _utils.injectProps)(template, props));
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = (0, _utils.getCapitalisedTagElements)(root)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var element = _step.value;

            var componentTemplate = void 0;
            (0, _assert2.default)(componentTemplate = components[element.tagName], 'No component found for ' + element.tagName);
            var component = domparser.parseFromString(compile(componentTemplate, (0, _utils.getProps)(element), components));
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = (0, _utils.getChildrenPlaceholders)(component)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var placeholder = _step2.value;

                    _utils.replaceNode.apply(undefined, [placeholder].concat(_toConsumableArray(Array.from(element.childNodes))));
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            (0, _utils.replaceNode)(element, component);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return xmlserializer.serializeToString(root);
}

exports.compile = compile;

/**
 * @param {string|Object.<string, string>} - component name | {name:template}
 * @param {string} template - component template
 * @returns {Object.<string, string>} - registered components
 */
exports.register = function () {
    var _arguments = Array.prototype.slice.call(arguments),
        arg0 = _arguments[0],
        arg1 = _arguments[1];

    switch (typeof arg0 === 'undefined' ? 'undefined' : _typeof(arg0)) {
        case 'string':
            {
                __components__[arg0] = arg1;
                break;
            }
        case 'object':
            {
                Object.assign(__components__, arg0);
                break;
            }
    }
    return __components__;
};