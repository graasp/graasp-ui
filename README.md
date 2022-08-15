# Graasp UI

> React components for the Graasp ecosystem.

[![NPM](https://img.shields.io/npm/v/@graasp/ui.svg)](https://www.npmjs.com/package/graasp-ui) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @graasp/ui
```

If you use the `Table` component, you should import it with the lines below:

```js
import { Table } from '@graasp/ui/dist/table';
import 'ag-grid-community/dist/styles/ag-theme-material.min.css';
````

## Usage

```tsx
import React, { Component } from 'react'

import MyComponent from '@graasp/ui'
import '@graasp/ui/dist/index.css'

class Example extends Component {
  render() {
    return <MyComponent />
  }
}
```

## Storybook

Storybook provides a nice display of defined UI components. To open the framework, run
```
yarn storybook
```

## License

MIT © [Graasp Association](https://graasp.org)
