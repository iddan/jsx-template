import assert from 'assert';
import XPath from 'xpath';
import JSONPath from 'jsonpath';

/**
 * replaces a node in it's parent's children.
 * @param {Element[]|Element} newNodes
 * @param {Element} oldNode
 * @returns {Element} - the inserted nodes
 */
exports.replaceNode = (referenceNode, ...newNodes) => {
    const {parentNode} = referenceNode;
    assert(parentNode, 'Reference Node must have a parent node');
    for (let node of newNodes) {
        parentNode.insertBefore(node, referenceNode);
    }
    parentNode.removeChild(referenceNode);
    return newNodes;
};

/**
 * @param {Element}
 * @returns {Element[]} - all nodes which tag starts with a capital letter.
 */
exports.getCapitalisedTagElements = (element) => XPath.select(
    '//*[contains(\'ABCDEFGHIJKLMNOPQRSTUVWXYZ\', substring(name(),1,1))]',
    element
);

exports.getChildrenPlaceholders = (element) => XPath.select(
    '//text()[contains(.,\'{children}\')]',
    element
);

/**
 * @param {NamedNodeMap} attributes
 * @returns {Object}
 */
const attributesToObject = (attributes) =>
    Array.from(attributes)
    .reduce((object, attribute) => Object.assign(object, {
        [attribute.name]: attribute.value
    }), {});

/**
 * @param {Element}
 * @returns {Object.<string, string>}
 */
exports.getProps = ({attributes}) =>
    attributesToObject(attributes);

/**
 * @param {string} template
 * @param {Object} props
 * @returns {string}
 */
exports.injectProps = (template, props) =>
    template.replace(/{(.+)}/g, (substring, prop) => {
        let value = JSONPath.query(props, JSONPath.stringify(['$', prop]))[0];
        return value ? value : substring;
    });