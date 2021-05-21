import React, { useState } from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import CustomTreeItem from './CustomTreeItem';
import TreeItemLabel from './TreeItemLabel';

export const getParentsIdsFromPath = (path, { ignoreSelf = false } = {}) => {
  if (!path) {
    return [];
  }

  let p = path;
  // ignore self item in path
  if (ignoreSelf) {
    // split path in half parents / self
    // eslint-disable-next-line no-useless-escape
    const els = path.split(/\.[^\.]*$/);
    // if els has only one element, the item has no parent
    if (els.length <= 1) {
      return [];
    }
    [p] = els;
  }
  const ids = p.replace(/_/g, '-').split('.');
  return ids;
};

const DynamicTreeView = ({
  id,
  rootLabel,
  rootId,
  rootClassName,
  prevent,
  useItem,
  useChildren,
  initialExpendedItems,
  showCheckbox,
  items,
  showItemFilter,
  selectedId,
  setSelectedId,
  shouldFetchChildrenForItem,
  isTreeItemDisabled,
  buildTreeItemClass,
}) => {
  const classes = {}; // useStyles()
  const [expandedItems, setExpandedItems] = useState(initialExpendedItems);

  const onSelect = (event, value) => {
    if (!showCheckbox) {
      return setSelectedId(value);
    }

    // select the tree item only when clicking on the checkbox/input
    if (event.target.nodeName.toLowerCase() === 'input') {
      return setSelectedId(value);
    }

    return false;
  };

  const onToggle = (event, nodeIds) => {
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
      className={classes.root}
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
            prevent={prevent}
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

DynamicTreeView.defaultProps = {
  showItemFilter: () => true,
  showCheckbox: true,
};

export default DynamicTreeView;
