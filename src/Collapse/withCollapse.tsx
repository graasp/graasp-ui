import React from 'react';
import { Record } from 'immutable';
import Collapse from './Collapse';
import type { Item, UnknownExtra } from '../types';

interface WithCollapseProps<T> {
  item: Record<Item<T>>;
}

function withCollapse<T extends UnknownExtra>({
  item,
}: WithCollapseProps<T>) {
  return (component: JSX.Element): JSX.Element => {
    class ComponentWithCollapse extends React.Component {
      render(): JSX.Element {
        return (
            <Collapse title={item.get('name')} content={component} />
        );
      }
    }

    return <ComponentWithCollapse />;
  };
}

export default withCollapse;
