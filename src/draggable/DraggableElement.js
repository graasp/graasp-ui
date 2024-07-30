import { Box } from '@mui/material';

import { useDrag, useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import { jsx as _jsx } from 'react/jsx-runtime';

const DraggableElement = ({
  row,
  onDrop,
  canDrop = () => true,
  isMovable = () => true,
  renderComponent,
  allowFiles = true,
}) => {
  const accept = ['row'];
  if (allowFiles) {
    accept.push(NativeTypes.FILE);
  }
  const [{ isOver }, dropRef] = useDrop(
    {
      accept,
      canDrop,
      drop: (draggedRow) => {
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
  const attachRef = (el) => {
    dragRef(el);
    dropRef(el);
  };
  const canMove = isMovable(row);
  return _jsx(Box, {
    ref: canMove ? attachRef : undefined,
    sx: canMove
      ? {
          '&:hover': {
            cursor: 'grab',
          },
        }
      : undefined,
    children: renderComponent(row, { isDragging, isOver, isMovable: canMove }),
  });
};
export default DraggableElement;
