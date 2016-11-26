import assert from 'assert';
import {DOMParser, XMLSerializer} from 'xmldom';
import {replaceNode, getCapitalisedTagElements, getProps, injectProps, getChildrenPlaceholders} from './utils';

let domparser = new DOMParser();
let xmlserializer = new XMLSerializer();

const __components__ = {};

/**
 * @param {string} template
 * @param {Object} [props]
 * @param {Object.<string, string>} [components]
 * @returns {string}
 */
function compile (template, props = {}, components = __components__) {
    let root = domparser.parseFromString(injectProps(template, props));
    for (let element of getCapitalisedTagElements(root)) {
        let componentTemplate;
        assert(componentTemplate = components[element.tagName], `No component found for ${element.tagName}`);
        let component = domparser.parseFromString(compile(componentTemplate, getProps(element), components));
        for (let placeholder of getChildrenPlaceholders(component)) {
            replaceNode(placeholder, ...Array.from(element.childNodes));
        }
        replaceNode(element, component);
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
    const [arg0, arg1] = arguments;
    switch (typeof arg0) {
    case 'string': {
        __components__[arg0] = arg1;
        break;
    }
    case 'object': {
        Object.assign(__components__, arg0);
        break;
    }
    }
    return __components__;
};