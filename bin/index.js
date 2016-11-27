'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.register = undefined;

var _register = require('./register');

Object.defineProperty(exports, 'register', {
    enumerable: true,
    get: function get() {
        return _register.register;
    }
});
exports.compile = compile;

var _makeTemplate = require('./make-template');

var _makeTemplate2 = _interopRequireDefault(_makeTemplate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function compile() {
    var template = _makeTemplate2.default.apply(undefined, arguments);
    return function (props) {
        return removeProps(template(props));
    };
}

var removeProps = function removeProps(template) {
    return template.replace(/{.+?}/g, '');
};