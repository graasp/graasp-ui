import { List } from 'immutable';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TreeItem from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import Skeleton from '@mui/material/Skeleton';

import React, { FC, useState } from 'react';
import type { UseQueryResult } from 'react-query';

import type { ItemRecord } from '../types';
import CustomTreeItem from './CustomTreeItem';
import TreeItemLabel from './TreeItemLabel';

interface DynamicTreeViewProps {
  id: string;
  rootLabel: string;
  rootId: string;
  rootSx?: object;
  items: List<ItemRecord>;
  initialExpendedItems?: string[];
  showCheckbox?: boolean;
  selectedId: string;
  onTreeItemSelect?: (id: string) => void;
  useItem: (id: string) => UseQueryResult<ItemRecord>;
  useChildren: (
    id: string,
    options: { enabled: boolean },
  ) => UseQueryResult<List<ItemRecord>>;
  showItemFilter?: (item: ItemRecord) => boolean;
  shouldFetchChildrenForItem?: (item: ItemRecord) => boolean;
  isTreeItemDisabled?: (args: {
    parentIsDisabled: boolean;
    itemId: string;
  }) => boolean;
  buildTreeItemClass?: (id: string) => string;
  isLoading?: boolean;
}

const DynamicTreeView: FC<DynamicTreeViewProps> = ({
  id,
  rootLabel,
  rootId,
  rootSx,
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
  isLoading,
}) => {
  if (isLoading) {
    return <Skeleton variant='text' />;
  }

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
      <TreeItem nodeId={rootId} sx={rootSx} label={rootLabelComponent}>
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
