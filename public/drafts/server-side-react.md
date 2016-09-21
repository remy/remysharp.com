# Server Side React

## Libraries

- [React engine (by PayPal)](https://github.com/paypal/react-engine/) (this is what I settled on)
- [Express React views](https://github.com/reactjs/express-react-views) (a little closer to the metal)
- [Simple universal](https://github.com/guidsen/react-simple-universal) (though still in development)

## Resources

- [Router tutorials](https://github.com/reactjs/react-router-tutorial)
- [Simplified routing structures](https://github.com/ReactTraining/react-router/blob/master/docs/guides/RouteConfiguration.md#configuration-with-plain-routes)
- [Reducing the size of the final bundle.js](http://moduscreate.com/optimizing-react-es6-webpack-production-build/)
- [Excellent example of specification breakdown into components and containers](http://redux.js.org/docs/basics/UsageWithReact.html#designing-component-hierarchy)

## Containers and components

- https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.dxeml6nsq
- https://gist.github.com/chantastic/fc9e3853464dffdb1e3c
- https://www.youtube.com/watch?v=KYzlpRvWZ6c&t=1351

## Quick prototyping

This is super quick, but slow to load, since it's pulling around 2mb over the wire.

### index.html

From [here](https://gist.github.com/cem2ran/9be3dd3499566302d5ae).

```html
<!DOCTYPE html>
<script src="https://jspm.io/system.js"></script>
<script>
System.config({
  transpiler: 'babel',
  babelOptions: {}
});
System.import('./app.js');
</script>
<body></body><!--need a body for live-reload -->
```

### app.js

```js
import React from 'react'
import { render } from 'react-dom'

render(<h1>Hello world</h1>), document.body);
```

## Current tree

```nohighlight
.
├── containers
│   ├── composer.js
│   └── message-list.js
├── lib
│   ├── data.json
│   ├── index.js
│   └── routes.jsx
├── package.json
├── public
│   ├── bundle.js
│   ├── bundle.js.map
│   ├── css
│   │   └── style.css
│   ├── favicon.ico
│   └── images
├── src
│   └── client.js
├── views
│   ├── composer.jsx
│   ├── header.jsx
│   ├── layout.jsx
│   └── message-list.jsx
└── webpack.config.js
```
