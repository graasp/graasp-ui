import { jsx as _jsx } from 'react/jsx-runtime';

import Collapse from './Collapse.js';

const withCollapse = ({ item }) => {
  return (component) => {
    return _jsx(Collapse, {
      title: item.displayName ?? item.name,
      children: component,
    });
  };
};
export default withCollapse;
