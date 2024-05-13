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
};

const DraggableRow = <T extends object>({
  row,
  onDrop,
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
      drop: (draggedRow: T | DroppedFile) => {
        onDrop(draggedRow, row);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
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
      style={{
        opacity: isDragging ? 0.5 : 1,
        background: isOver ? 'lightgrey' : undefined,
      }}
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
