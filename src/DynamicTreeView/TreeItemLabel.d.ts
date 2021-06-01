import React from 'react';

interface TreeItemLabelProps {
  className?: string;
  name: string;
  showCheckbox?: boolean;
  checked?: boolean;
}

declare const TreeItemLabel: React.Component<TreeItemLabelProps>;
