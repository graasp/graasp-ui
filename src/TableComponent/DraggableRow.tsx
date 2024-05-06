import { Box, BoxProps } from '@mui/material';

import { ConnectableElement, useDrag, useDrop } from 'react-dnd';

export type TableMetaType = {
  align?: 'right' | 'left' | 'center';
  disableClicking?: boolean;
};

export type DraggableRowProps<T> = {
  row: T;
  onDrop: (draggedRow: T, targetRow: T) => void;
  isMovable?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (el: T) => void;
  renderComponent: (el: T) => JSX.Element;
};

const DraggableRow = <T extends object>({
  row,
  onDrop,
  isMovable = false,
  onClick,
  renderComponent,
}: DraggableRowProps<T>): JSX.Element => {
  const [{ isOver }, dropRef] = useDrop(
    {
      accept: 'row',
      drop: (draggedRow: T) => {
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
      sx={
        onClick
          ? {
              '&:hover': {
                cursor: 'pointer',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              },
            }
          : {}
      }
    >
      {renderComponent(row)}
    </Box>
  );
};

export default DraggableRow;
