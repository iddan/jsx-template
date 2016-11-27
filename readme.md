# JSX Template
## Static template engine based on the JSX Specification

```JavaScript
import JSX from 'jsx-template';

JSX.compile(
    '<Header><h1>{title}</h1></Header>',
    {
        title: 'JSX Templates are Awesome'
    },
    {
        Header: '<div class="header">{children}</div>'
    }
); === '<div class="header"><h1>JSX Templating Engine is Cool</h1></div>';
```

## Table of contents

* [Motivation](#motivation)
* [Prior Art](#prior-art)
* [Syntax Nodes](#syntax-notes)
* [API](#api)
* [Todo](#todo)

## Motivation

Since the launch of React.js a many developers in the JavaScript community have been exposed to the JSX synatx which React uses to declare it's elements.

Meanwhile those developers who also may build static pages (frontend or backend) can't just use the JSX syntax for templating as it requires the whole use of React.

JSX Template is intended to bring a solution for developers who are familiar with the syntax and would like to use it for static templates.

The template engine borrows the props logic of well known templating engines like {{ mustache }}. The components registeration idea was inspired by Handlebars Partials.

## Prior Art

* [The JSX Specification][JSX]
* [React][React]
* [{{ mustache }}][mustache]
* [Handlebars][Handlebars]

## Syntax notes

*  A component can not invoke itself as it creates an endless recursion. 

## API

### JSX.compile()

```JavaScript
JSX.compile(template, props, components);
```

Compile JSX templates and props into a HTML string.

#### Parameters

* **template** - JSX template string
* **props** - *Optional*, Props to use with the template defaults to an empty object.
* **components** - *Optional*, Components to use with the template defaults to the components registered. 

### JSX.register()

```JavaScript
JSX.register(name || {name: component}, component);
```

Register components (partials) to use within your JSX templates.

* **name** - Component name to be referenced in the template.
* **component** - Component JSX template.
* **{name:compoennt}** - A map of component names and JSX templates.

## Todo

* formal testing

[JSX]: https://facebook.github.io/jsx
[React]: https://facebook.github.io/react
[mustache]: https://mustache.github.io
[Handlebars]: https://handlebarsjs.com