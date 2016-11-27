import makeTemplate from './make-template';
export {register} from './register';

export function compile () {
    let template = makeTemplate(...arguments);
    return (props) => removeProps(template(props));
}

const removeProps = template =>
    template.replace(/{.+?}/g, '');