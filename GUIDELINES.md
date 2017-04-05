React Guidelines
==================

Imports
--------

- Import `scss` files at the top of the file (add a new line after that)
- Next import external libraries (add a new line after that)
- Next import other Components (add a new line after that)
  - Use absolute path `'components/foo/foo'` to prevent file structure dependency
  - Make sure to make `app` folder as Resource Root in Webstorm

```js
import './foo.scss';

import React, { PropTypes } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { observable } from 'mobx';

import { Baz } from 'components/baz/baz';
```

Components
------------

### Bind Class methods to the Class instance inside the `constructor`

- Define all functions on the Component and not inside `render`

```js
export class Foo extends React.Component {
  constructor() {
    super();

    this.doSomething = this.doSomething.bind(this);
  }

  doSomething() {
    return 'Hello There!';
  }

  render() {
    return (
      <button onClick={ this.doSomething }>Click Me</button>
    );
  }
}
```

### Use explicit `export` for Components

- This ensures easy searching of the component name in the whole project

```js
// foo.js
export class Foo extends React.Component {}

// other-file.js
import { Foo } from 'components/foo/foo';
```

or if you must `export` a reference:

```js
// foo.js
class Foo extends React.Component {}

export { Foo };
```

### Define `propTypes` as a Class member

```js
export class Foo extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  render() {}
}
```

MobX
-----

### Put `@observer` decorators above component Class definitions

```js
@observer
export class Foo extends React.Component {}
```

### Import stores directly

```js
import { countStore } from 'stores/click';

@observer
export class Foo extends React.Component {
  render() {
    return (
      <div>
        <h1>{ countStore.count }</h1>
        <button onClick={ countStore.inc }>Increment</button>
      </div>
    );
  }
}
```

### Use local `@observable` and `@action` to manage state whenever possible (instead of React's `state` API)

- Ref: [3 Reasons why I stopped using React.setState](https://medium.com/@mweststrate/3-reasons-why-i-stopped-using-react-setstate-ab73fc67a42e#.d32ty8kno)

```js
@observer
export class Foo extends React.Component {
  @observable count = 0;

  @action inc() {
    this.count++;
  }

  render() {
    return (
      <div>
        <h1>{ countStore.count }</h1>
        <button onClick={ countStore.inc }>Increment</button>
      </div>
    );
  }
}
```
