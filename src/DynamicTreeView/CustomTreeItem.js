import React from 'react';
import clsx from 'clsx';
import { Map } from 'immutable';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeItemLabel from './TreeItemLabel';
import { getParentsIdsFromPath } from '../utils/utils';

const LoadingTreeItem = <Skeleton variant='text' />;

const useStyles = makeStyles((theme) => ({
  disabled: {
    opacity: 0.5,
    color: theme.palette.primary.main,
  },
  treeItem: {
    // override background of tree item to show background on select
    '& > .MuiTreeItem-content .MuiTreeItem-label': {
      background: 'none !important',
    },
  },
  checkbox: {
    // reduce spacing between tree items
    padding: `${theme.spacing(0.5)}px !important`,
  },
}));

const CustomTreeItem = ({
  itemId,
  parentIsDisabled,
  expandedItems,
  selectedId,
  buildTreeItemClass,
  isTreeItemDisabled,
  useChildren,
  useItem,
  showItemFilter,
  shouldFetchChildrenForItem,
  showCheckbox,
}) => {
  const classes = useStyles();
  const { data: item, isLoading } = useItem(itemId);
  const showItem = item && showItemFilter(item);
  const isExpanded = expandedItems.includes(itemId);

  // load depth-2 level of children to allow collapse to correctly show
  // parent of parent should be expanded
  const parentsIds = getParentsIdsFromPath(item?.get('path'));
  const parentOfParentIdx = parentsIds.length - 2;
  const parentOfParentIsVisible =
    parentOfParentIdx < 0 ||
    expandedItems.find((eId) => eId === parentsIds[parentOfParentIdx]);

  const isDisabled = isTreeItemDisabled({
    parentIsDisabled,
    itemId,
  });

  const { data: children, isLoading: childrenIsLoading } = useChildren(itemId, {
    enabled:
      item &&
      showItem &&
      shouldFetchChildrenForItem(item) &&
      (isExpanded || parentOfParentIsVisible) &&
      !isDisabled,
  });

  if (isLoading) {
    return <TreeItem key={itemId} label={LoadingTreeItem} />;
  }

  // display only folders
  if (!showItem) {
    return null;
  }

  const name = item.get('name');

  // to prevent clicking on disabled checkboxes, the id of the item is set to null
  const nodeId = isDisabled ? null : itemId;

  const buildTreeItemContent = () => {
    if (showCheckbox) {
      return (
        <TreeItemLabel
          showCheckbox={showCheckbox}
          name={name}
          checked={selectedId && selectedId === nodeId}
          className={classes.checkbox}
        />
      );
    }

    return name;
  };

  const renderChildrenItems = () => {
    // does not display collapse while loading children
    if (isDisabled) {
      return null;
    }

    if (childrenIsLoading) {
      return LoadingTreeItem;
    }

    const filteredChildren = children?.filter((item) =>
      showItemFilter(Map(item)),
    );

    if (!filteredChildren?.size) {
      return null;
    }

    return filteredChildren.map(({ id: childId }) => (
      <CustomTreeItem
        key={childId}
        itemId={childId}
        parentIsDisabled={isDisabled}
        expandedItems={expandedItems}
        selectedId={selectedId}
        buildTreeItemClass={buildTreeItemClass}
        useChildren={useChildren}
        useItem={useItem}
        showCheckbox={showCheckbox}
        showItemFilter={showItemFilter}
        isTreeItemDisabled={isTreeItemDisabled}
      />
    ));
  };

  const childrenTreeItems = renderChildrenItems();

  // render child with checkbox
  const content = childrenIsLoading ? LoadingTreeItem : buildTreeItemContent();

  // recursive display of children
  const className = clsx(buildTreeItemClass(itemId), {
    [classes.disabled]: isDisabled,
    [classes.treeItem]: showCheckbox,
  });
  return (
    <TreeItem
      key={itemId}
      nodeId={nodeId}
      label={content}
      className={className}
    >
      {childrenTreeItems}
    </TreeItem>
  );
};

CustomTreeItem.defaultProps = {
  parentIsDisabled: false,
  expandedItems: [],
  selectedId: null,
  buildTreeItemClass: () => '',
  shouldFetchChildrenForItem: () => true,
  showCheckbox: false,
};

export default CustomTreeItem;
