'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = makeTemplate;

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _replaceComponents = require('./replace-components');

var _replaceComponents2 = _interopRequireDefault(_replaceComponents);

var _injectProps = require('./inject-props');

var _injectProps2 = _interopRequireDefault(_injectProps);

var _register = require('./register');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {string} template
 * @param {Object} [props]
 * @param {Object.<string, string>} [components]
 * @returns {function}
 */
function makeTemplate(template) {
    var components = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _register.components;

    var readyTemplate = (0, _replaceComponents2.default)(template, function (tag, props) {
        (0, _assert2.default)(components[tag], 'No component found for <' + tag + ' />');
        return makeTemplate(components[tag], components)(props);
    });
    // here is the magic: the scope is filled with a ready to be injected template
    return function () {
        var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return (0, _injectProps2.default)(readyTemplate, props);
    };
}