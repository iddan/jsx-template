const JSX = require('.');

console.log(JSX.compile('<div><Hello><span>sweet child o\' mine</span></Hello><Hello></Hello></div>', {
    Hello: '<div class="hello">ooooooooo {children}</div>'
})());
console.log(JSX.compile('<div>{name}</div>')({name: 'iddan'}));
console.log(JSX.compile('<div>{name.first}</div>')({name: {first: 'iddan'}}));