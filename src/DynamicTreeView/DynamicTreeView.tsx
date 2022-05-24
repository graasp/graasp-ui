import React, { FC, useState } from 'react';
import type { UseQueryResult } from 'react-query';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { List, Record } from 'immutable';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import CustomTreeItem from './CustomTreeItem';
import TreeItemLabel from './TreeItemLabel';
import type { Item } from '../types';

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
  useItem: (id: string) => UseQueryResult<Record<Item>>;
  useChildren: (
    id: string,
    options: { enabled: boolean },
  ) => UseQueryResult<List<Item>>;
  showItemFilter?: (item: Record<Item>) => boolean;
  shouldFetchChildrenForItem?: (item: Record<Item>) => boolean;
  isTreeItemDisabled?: (args: {
    parentIsDisabled: boolean;
    itemId: string;
  }) => boolean;
  buildTreeItemClass?: (id: string) => string;
}

const DynamicTreeView: FC<DynamicTreeViewProps> = ({
  id,
  rootLabel,
  rootId,
  rootClassName,
  useItem,
  useChildren,
  initialExpendedItems = [],
  showCheckbox = true,
  items,
  showItemFilter = () => true,
  selectedId,
  onTreeItemSelect,
  shouldFetchChildrenForItem = () => true,
  isTreeItemDisabled = () => false,
  buildTreeItemClass = () => '',
}) => {
  const [expandedItems, setExpandedItems] = useState(initialExpendedItems);

  // types based on TreeView types
  const onSelect = (event: any, value: any): void => {
    if (!showCheckbox) {
      return onTreeItemSelect?.(value);
    }

    // select the tree item only when clicking on the checkbox/input
    if (event.target.nodeName.toLowerCase() === 'input') {
      return onTreeItemSelect?.(value);
    }
  };

  // types based on TreeView types
  const onToggle = (event: any, nodeIds: any): void => {
    // toggle only when not clicking on the checkbox/input
    if (showCheckbox && event.target.nodeName.toLowerCase() === 'input') {
      return;
    }

    // save expanded items
    setExpandedItems(nodeIds);
  };

  const rootLabelComponent = (
    <TreeItemLabel
      showCheckbox={showCheckbox}
      name={rootLabel}
      checked={selectedId === rootId}
    />
  );

  return (
    <TreeView
      id={id}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      onNodeSelect={onSelect}
      onNodeToggle={onToggle}
      expanded={expandedItems}
    >
      <TreeItem
        nodeId={rootId}
        className={rootClassName}
        label={rootLabelComponent}
      >
        {items.map(({ id: itemId }) => (
          <CustomTreeItem
            key={itemId}
            itemId={itemId}
            expandedItems={expandedItems}
            selectedId={selectedId}
            useItem={useItem}
            useChildren={useChildren}
            isTreeItemDisabled={isTreeItemDisabled}
            showItemFilter={showItemFilter}
            shouldFetchChildrenForItem={shouldFetchChildrenForItem}
            showCheckbox={showCheckbox}
            buildTreeItemClass={buildTreeItemClass}
          />
        ))}
      </TreeItem>
    </TreeView>
  );
};

export default DynamicTreeView;
