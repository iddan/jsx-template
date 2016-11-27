export const components = {};

/**
 * @param {string|Object.<string, string>} - component name | {name:template}
 * @param {string} template - component template
 * @returns {Object.<string, string>} - registered components
 */
export function register () {
    const [arg0, arg1] = arguments;
    switch (typeof arg0) {
    case 'string': {
        components[arg0] = arg1;
        break;
    }
    case 'object': {
        Object.assign(components, arg0);
        break;
    }
    }
    return components;
}