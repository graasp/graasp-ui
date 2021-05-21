import React from 'react';
import { Map } from 'immutable';

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
  initialExpendedItems: string[];
  showCheckbox: Item[];
  items: Map;
  selectedId: string;
  setSelectedId: () => {};
  prevent: () => {};
  useItem: () => {};
  useChildren: () => {};
  showItemFilter: () => {};
  shouldFetchChildrenForItem: (item: Item) => {};
  isTreeItemDisabled: () => {};
  buildTreeItemClass: () => {};
}

declare const DynamicTreeView: React.Component<DynamicTreeViewProps>;
