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

## Adding the library to your project

You will have to add the library and its peer dependencies:

```sh
yarn add @graasp/ui @graasp/stylis-plugin-rtl date-fns lucide-react
```

## Usage

```tsx
import { MyComponent } from '@graasp/ui'

const Example = () => {
  return <MyComponent />
}
```

### Sub packages

#### Components for Graasp Apps

Graasp apps can use specific components to share style without needing to import the full bundle: use import from `@graasp/ui/apps`

#### Text Editor

Since Quill does not play nicely with SSR frameworks (access to the document property is not gated), it is exposed in its own sub-package: `@graasp/ui/text-editor`

## ![Storybook](https://api.iconify.design/logos/storybook-icon.svg) Storybook

Storybook provides a nice display of defined UI components. To open the framework, run

```sh
yarn storybook
```

To explore the UI components and play with their props click the link bellow:

<a href="https://graasp.github.io/graasp-ui/" >
<img style="background: white; padding: 8px; border-radius: 2px; border: 1px solid lightgray" src="https://api.iconify.design/logos/storybook.svg"/>
</a>

## License

AGPL-3.0 © [Graasp Association](https://graasp.org)
