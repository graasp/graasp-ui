import { RecordOf } from 'immutable';

import React from 'react';

import type { Item, UnknownExtra } from '@graasp/sdk';

import Collapse from './Collapse';

interface WithCollapseProps<T extends UnknownExtra> {
  item: RecordOf<Item<T>>;
}

function withCollapse<T extends UnknownExtra>({ item }: WithCollapseProps<T>) {
  return (component: JSX.Element): JSX.Element => {
    class ComponentWithCollapse extends React.Component {
      render(): JSX.Element {
        return <Collapse title={item.name}>{component}</Collapse>;
      }
    }

    return <ComponentWithCollapse />;
  };
}

export default withCollapse;
