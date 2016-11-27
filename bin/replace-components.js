'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Insert JSX Components in place of components tags
 * @param {string} template
 * @param {function} callback
 * @returns {string}
 */
var replaceComponents = function replaceComponents(template, callback) {
    return template.replace(/<([A-Z][A-z0-9]*)\s?([^>/]*)(?:(?:\/>)|(?:>(.*?)<\/\1>))/g, function (substring, tag, attributes, children) {
        return callback(tag, Object.assign({
            children: children
        }, parseAttributes(attributes)), substring);
    });
};

/**
 * Parses HTML attribute substring into a map
 * @param {string} attributeSubstring
 * @returns {Object.<string, string>}
 */
function parseAttributes(attributeSubstring) {
    var attributes = {};
    attributeSubstring.replace(/([A-z][A-z0-9]+)(?:\s*=\s*((?:"[^"]+")|(?:'[^']+')|\S+))?/g, function (substring, attribute, value) {
        attributes[attribute] = value ? value.replace(/(^["'])|(['"]$)/, '') : true;
    });
    return attributes;
}

exports.default = replaceComponents;