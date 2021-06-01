import React from 'react';
import { List } from 'immutable';

type Item = {
  id: string;
  name: string;
  path: string;
};

interface DynamicTreeViewProps {
  id: string;
  rootLabel: string;
  rootId: string;
  rootClassName: string;
  items: List<Item>;
  initialExpendedItems?: string[];
  showCheckbox?: boolean;
  selectedId: string;
  onTreeItemSelect?: (id: string) => void;
  useItem: (id: string) => UseQueryData;
  useChildren: (
    id: string,
    options: { enabled: boolean = true },
  ) => UseQueryData;
  showItemFilter?: (item: Item) => boolean;
  shouldFetchChildrenForItem?: (item: Item) => boolean;
  isTreeItemDisabled?: (args: {
    parentIsDisabled: boolean;
    itemId: string;
  }) => boolean;
  buildTreeItemClass?: (id: string) => string;
}

declare const DynamicTreeView: React.Component<DynamicTreeViewProps>;
