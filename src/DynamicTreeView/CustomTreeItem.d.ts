import React from 'react';

interface CustomItemTreeProps {
  id: string;
  disabled?: boolean;
  prevent?: string;
  expandedItems: string[];
  selectedId: string;
  targetId: string;
  buildTreeItemClass: () => {};
  isTreeItemDisabled: boolean;
  useChildren: () => {};
  useItem: () => {};
  showItemFilter?: () => {};
  shouldFetchChildrenForItem?: () => {};
}

declare const CustomItemTree: React.Component<DynamicTreeViewProps>;
