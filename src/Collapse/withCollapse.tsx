import React from 'react';

import Collapse from './Collapse';

interface WithCollapseProps {
  itemName: string;
}

function withCollapse({ itemName }: WithCollapseProps) {
  return (component: JSX.Element): JSX.Element => {
    class ComponentWithCollapse extends React.Component {
      render(): JSX.Element {
        return <Collapse title={itemName}>{component}</Collapse>;
      }
    }

    return <ComponentWithCollapse />;
  };
}

export default withCollapse;
