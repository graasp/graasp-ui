import { Box, BoxProps } from '@mui/material';

import { ConnectableElement, useDrag, useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';

import { DraggableAndDroppableProps, DroppedFile } from './types';

export type DraggableElementProps<T> = {
  row: T;
  onDrop: (draggedRow: T | DroppedFile, targetRow: T) => void;
  isMovable?: (el: T) => boolean;
  renderComponent: (
    el: T | DroppedFile,
    args: DraggableAndDroppableProps,
  ) => JSX.Element;
  allowFiles?: boolean;
  canDrop?: (el: T | DroppedFile) => boolean;
};

const DraggableElement = <T extends object>({
  row,
  onDrop,
  canDrop = () => true,
  isMovable = () => true,
  renderComponent,
  allowFiles = true,
}: DraggableElementProps<T>): JSX.Element => {
  const accept = ['row'];
  if (allowFiles) {
    accept.push(NativeTypes.FILE);
  }
  const [{ isOver }, dropRef] = useDrop(
    {
      accept,
      canDrop,
      drop: (draggedRow: T | DroppedFile) => {
        onDrop(draggedRow, row);
      },
      collect: (monitor) => ({
        isOver:
          monitor.getItem() !== row &&
          canDrop(monitor.getItem()) &&
          !!monitor.isOver(),
      }),
    },
    [onDrop],
  );

  const [{ isDragging }, dragRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => row,
    type: 'row',
  });

  const attachRef: BoxProps['ref'] = (el: ConnectableElement) => {
    dragRef(el);
    dropRef(el);
  };

  const canMove = isMovable(row);
  return (
    <Box
      ref={canMove ? attachRef : undefined}
      sx={
        canMove
          ? {
              '&:hover': {
                cursor: 'grab',
              },
            }
          : undefined
      }
    >
      {renderComponent(row, { isDragging, isOver, isMovable: canMove })}
    </Box>
  );
};

export default DraggableElement;
