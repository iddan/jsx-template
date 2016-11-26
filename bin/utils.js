'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _xpath = require('xpath');

var _xpath2 = _interopRequireDefault(_xpath);

var _jsonpath = require('jsonpath');

var _jsonpath2 = _interopRequireDefault(_jsonpath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * replaces a node in it's parent's children.
 * @param {Element[]|Element} newNodes
 * @param {Element} oldNode
 * @returns {Element} - the inserted nodes
 */
exports.replaceNode = function (referenceNode) {
    for (var _len = arguments.length, newNodes = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        newNodes[_key - 1] = arguments[_key];
    }

    var parentNode = referenceNode.parentNode;

    (0, _assert2.default)(parentNode, 'Reference Node must have a parent node');
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = newNodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var node = _step.value;

            parentNode.insertBefore(node, referenceNode);
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

    parentNode.removeChild(referenceNode);
    return newNodes;
};

/**
 * @param {Element}
 * @returns {Element[]} - all nodes which tag starts with a capital letter.
 */
exports.getCapitalisedTagElements = function (element) {
    return _xpath2.default.select('//*[contains(\'ABCDEFGHIJKLMNOPQRSTUVWXYZ\', substring(name(),1,1))]', element);
};

exports.getChildrenPlaceholders = function (element) {
    return _xpath2.default.select('//text()[contains(.,\'{children}\')]', element);
};

/**
 * @param {NamedNodeMap} attributes
 * @returns {Object}
 */
var attributesToObject = function attributesToObject(attributes) {
    return Array.from(attributes).reduce(function (object, attribute) {
        return Object.assign(object, _defineProperty({}, attribute.name, attribute.value));
    }, {});
};

/**
 * @param {Element}
 * @returns {Object.<string, string>}
 */
exports.getProps = function (_ref) {
    var attributes = _ref.attributes;
    return attributesToObject(attributes);
};

/**
 * @param {string} template
 * @param {Object} props
 * @returns {string}
 */
exports.injectProps = function (template, props) {
    return template.replace(/{(.+)}/g, function (substring, prop) {
        var value = _jsonpath2.default.query(props, _jsonpath2.default.stringify(['$', prop]))[0];
        return value ? value : substring;
    });
};