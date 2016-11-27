/**
 * @param {string} template
 * @param {Object} props
 * @returns {string}
 */
const injectProps = (template, props) =>
    template.replace(/{(.+)}/g, (substring, path) => {
        let value = resolvePath(props, path);
        return value ? value : substring;
    });

/**
 * @param {Object} object
 * @param {string} path
 * @returns {}
 */
const resolvePath = (object, path) =>
    path.split('.')
    .reduce((object, key) => object[key], object);

export default injectProps;