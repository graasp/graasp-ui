import React from 'react';

interface TreeItemLabelProps {
  name: string;
  className?: string;
  showCheckbox?: boolean;
  checked?: boolean;
}

declare const TreeItemLabel: React.Component<TreeItemLabelProps>;
