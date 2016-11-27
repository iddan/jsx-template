/**
 * Insert JSX Components in place of components tags
 * @param {string} template
 * @param {function} callback
 * @returns {string}
 */
const replaceComponents = (template, callback) =>
    template.replace(
        /<([A-Z][A-z0-9]*)\s?([^>/]*)(?:(?:\/>)|(?:>(.*?)<\/\1>))/g,
        (substring, tag, attributes, children) =>
            callback(tag, Object.assign({
                children
            }, parseAttributes(attributes)), substring)
        );

/**
 * Parses HTML attribute substring into a map
 * @param {string} attributeSubstring
 * @returns {Object.<string, string>}
 */
function parseAttributes (attributeSubstring) {
    let attributes = {};
    attributeSubstring.replace(
        /([A-z][A-z0-9]+)(?:\s*=\s*((?:"[^"]+")|(?:'[^']+')|\S+))?/g,
        (substring, attribute, value) => {
            attributes[attribute] = value ? value.replace(/(^["'])|(['"]$)/, '') : true;
        }
    );
    return attributes;
}

export default replaceComponents;