import assert from 'assert';
import replaceComponents from './replace-components';
import injectProps from './inject-props';
import {components as __components__} from './register';

/**
 * @param {string} template
 * @param {Object} [props]
 * @param {Object.<string, string>} [components]
 * @returns {function}
 */
export default function makeTemplate (template, components = __components__) {
    let readyTemplate = replaceComponents(template, (tag, props) => {
        assert(components[tag], `No component found for <${tag} />`);
        return makeTemplate(components[tag], components)(props);
    });
    // here is the magic: the scope is filled with a ready to be injected template
    return (props = {}) => injectProps(readyTemplate, props);
}