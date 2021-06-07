import React from 'react';

interface CustomItemTreeProps {
  id: string;
  parentIsDisabled?: boolean;
  expandedItems: string[];
  selectedId: string;
  buildTreeItemClass?: (id: string) => string;
  isTreeItemDisabled?: (args: {
    parentIsDisabled: boolean;
    itemId: string;
  }) => boolean;
  useChildren: (
    id: string,
    options: { enabled: boolean = true },
  ) => UseQueryData;
  useItem: (id: string) => UseQueryData;
  showItemFilter?: (item: Item) => boolean;
  shouldFetchChildrenForItem?: (item: Item) => boolean;
  showCheckbox?: boolean;
}

declare const CustomItemTree: React.Component<DynamicTreeViewProps>;
