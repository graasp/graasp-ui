import { Box, BoxProps } from '@mui/material';

import { ConnectableElement, useDrag, useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';

export type TableMetaType = {
  align?: 'right' | 'left' | 'center';
  disableClicking?: boolean;
};

export type DraggableAndDroppableProps = {
  isDragging: boolean;
  isOver: boolean;
};

export type DroppedFile = {
  dataTransfer: DataTransfer;
  files: File[];
  items: DataTransferItemList;
};

export type DraggableRowProps<T> = {
  row: T;
  onDrop: (draggedRow: T | DroppedFile, targetRow: T) => void;
  isMovable?: boolean;
  renderComponent: (
    el: T | DroppedFile,
    args: DraggableAndDroppableProps,
  ) => JSX.Element;
  allowFiles?: boolean;
  canDrop?: (el: T | DroppedFile) => boolean;
};

const DraggableRow = <T extends object>({
  row,
  onDrop,
  canDrop = () => true,
  isMovable = false,
  renderComponent,
  allowFiles = true,
}: DraggableRowProps<T>): JSX.Element => {
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

  return (
    <Box
      ref={isMovable ? attachRef : undefined}
      sx={{
        '&:hover': {
          cursor: 'grab',
        },
      }}
    >
      {renderComponent(row, { isDragging, isOver })}
    </Box>
  );
};

export default DraggableRow;
