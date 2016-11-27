'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.register = register;
var components = exports.components = {};

/**
 * @param {string|Object.<string, string>} - component name | {name:template}
 * @param {string} template - component template
 * @returns {Object.<string, string>} - registered components
 */
function register() {
    var _arguments = Array.prototype.slice.call(arguments),
        arg0 = _arguments[0],
        arg1 = _arguments[1];

    switch (typeof arg0 === 'undefined' ? 'undefined' : _typeof(arg0)) {
        case 'string':
            {
                components[arg0] = arg1;
                break;
            }
        case 'object':
            {
                Object.assign(components, arg0);
                break;
            }
    }
    return components;
}