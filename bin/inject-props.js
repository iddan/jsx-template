'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @param {string} template
 * @param {Object} props
 * @returns {string}
 */
var injectProps = function injectProps(template, props) {
    return template.replace(/{(.+)}/g, function (substring, path) {
        var value = resolvePath(props, path);
        return value ? value : substring;
    });
};

/**
 * @param {Object} object
 * @param {string} path
 * @returns {}
 */
var resolvePath = function resolvePath(object, path) {
    return path.split('.').reduce(function (object, key) {
        return object[key];
    }, object);
};

exports.default = injectProps;