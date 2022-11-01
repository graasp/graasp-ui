# Graasp UI

> React components for the Graasp ecosystem.

[![GitHub package.json version](https://img.shields.io/github/package-json/v/graasp/graasp-ui?color=limegreen&label=latest&logo=github)](https://github.com/graasp/graasp-ui/releases)
[![npm (scoped)](https://img.shields.io/npm/v/@graasp/ui?logo=npm)](https://www.npmjs.com/package/@graasp/ui)
![GitHub](https://img.shields.io/github/license/graasp/graasp-ui)
[![Storybook deployment](https://img.shields.io/badge/storybook-ui-%23FF4785?logo=storybook)](https://graasp.github.io/graasp-ui/)

Packages  
![GitHub package.json - react](https://img.shields.io/github/package-json/dependency-version/graasp/graasp-ui/dev/react?logo=react&label=react%20(dev))
![npm peer dependency version](https://img.shields.io/npm/dependency-version/@graasp/ui/peer/react?logo=react&label=react%20(peer))
![GitHub package.json dependency version (prod) - immutable](https://img.shields.io/github/package-json/dependency-version/graasp/graasp-ui/immutable?color=plum)
[![Mui version](https://img.shields.io/badge/mui-v5-deepskyblue?logo=mui)](https://mui.com/material-ui/getting-started/overview/)

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

## ![Storybook](https://api.iconify.design/logos/storybook-icon.svg) Storybook

Storybook provides a nice display of defined UI components. To open the framework, run

```
yarn storybook
```

To navigate the UI components click the link bellow:

<a href="https://graasp.github.io/graasp-ui/" >
<img style="background: white; padding: 8px; border-radius: 2px; border: 1px solid lightgray" src="https://api.iconify.design/logos/storybook.svg"/>
</a>

## License

MIT © [Graasp Association](https://graasp.org)
