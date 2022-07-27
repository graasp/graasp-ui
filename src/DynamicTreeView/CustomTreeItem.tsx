import React, { FC } from 'react';
import clsx from 'clsx';
import type { UseQueryResult } from 'react-query';
import { List, RecordOf } from 'immutable';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeItemLabel from './TreeItemLabel';
import { getParentsIdsFromPath } from '../utils/utils';
import { ImmutableItemClass, Item } from '../types';

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

interface CustomItemTreeProps {
  itemId: string;
  parentIsDisabled?: boolean;
  expandedItems?: string[];
  selectedId: string;
  buildTreeItemClass?: (id: string) => string;
  isTreeItemDisabled?: (args: {
    parentIsDisabled: boolean;
    itemId: string;
  }) => boolean;
  useChildren: (
    id: string,
    options: { enabled: boolean },
  ) => UseQueryResult<List<RecordOf<Item>>>;
  useItem: (id: string) => UseQueryResult<RecordOf<Item>>;
  showItemFilter?: (item: RecordOf<Item>) => boolean;
  shouldFetchChildrenForItem?: (item: RecordOf<Item>) => boolean;
  showCheckbox?: boolean;
}

const CustomTreeItem: FC<CustomItemTreeProps> = ({
  itemId,
  parentIsDisabled = false,
  expandedItems = [],
  selectedId,
  buildTreeItemClass = () => '',
  isTreeItemDisabled,
  useChildren,
  useItem,
  showItemFilter,
  shouldFetchChildrenForItem = () => true,
  showCheckbox = false,
}) => {
  const classes = useStyles();
  const { data: item, isLoading, isError } = useItem(itemId);
  const showItem = item && showItemFilter?.(item);
  const isExpanded = expandedItems?.includes(itemId);

  // load depth-2 level of children to allow collapse to correctly show
  // parent of parent should be expanded
  const parentsIds = getParentsIdsFromPath(item?.path);
  const parentOfParentIdx = parentsIds.length - 2;
  const parentOfParentIsVisible =
    parentOfParentIdx < 0 ||
    expandedItems?.find((eId) => eId === parentsIds[parentOfParentIdx]);

  const isDisabled = isTreeItemDisabled?.({
    parentIsDisabled: parentIsDisabled ?? false,
    itemId,
  });

  const { data: children, isLoading: childrenIsLoading } = useChildren(itemId, {
    enabled: Boolean(
      item &&
        showItem &&
        shouldFetchChildrenForItem?.(item) &&
        (isExpanded || parentOfParentIsVisible) &&
        !isDisabled,
    ),
  });

  if (isLoading) {
    return (
      <TreeItem
        nodeId={`loading-${itemId}`}
        key={itemId}
        label={LoadingTreeItem}
      />
    );
  }

  // display only folders
  if (!showItem || !item || isError) {
    return null;
  }

  const name = item.name;

  // to prevent clicking on disabled checkboxes, the id of the item is set to a non-existing id
  const nodeId = isDisabled ? 'disabled-node-id' : itemId;

  const buildTreeItemContent = (): JSX.Element => {
    if (showCheckbox) {
      return (
        <TreeItemLabel
          showCheckbox={showCheckbox}
          name={name}
          checked={Boolean(selectedId && selectedId === nodeId)}
          className={classes.checkbox}
        />
      );
    }

    return <React.Fragment>{name}</React.Fragment>;
  };

  const renderChildrenItems = (): List<JSX.Element> | JSX.Element | null => {
    // does not display collapse while loading children
    if (isDisabled) {
      return null;
    }

    if (childrenIsLoading) {
      return LoadingTreeItem;
    }

    const filteredChildren = children?.filter((item) =>
      showItemFilter?.(new ImmutableItemClass(item)),
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
  const className = clsx(buildTreeItemClass?.(itemId), {
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

export default CustomTreeItem;
