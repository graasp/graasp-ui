import React from 'react';

import { ItemRecord } from '@graasp/sdk/frontend';

import Collapse from './Collapse';

interface WithCollapseProps {
  item: ItemRecord;
}

function withCollapse({ item }: WithCollapseProps) {
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
