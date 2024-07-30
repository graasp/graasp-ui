// we could replace dnd with this https://docs.dndkit.com
import { Box } from '@mui/material';

import { useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

const InBetween = ({
  previousRow,
  onDrop,
  enableMoveInBetween,
  renderComponent,
  allowFiles = true,
}) => {
  const accept = ['row'];
  if (allowFiles) {
    accept.push(NativeTypes.FILE);
  }
  const [{ isOver, data }, drop] = useDrop(
    () => ({
      accept,
      drop: (draggedRow) => {
        return onDrop(draggedRow, previousRow);
      },
      canDrop: () => enableMoveInBetween,
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
        data: monitor.getItem(),
      }),
    }),
    [onDrop],
  );
  const spacing = 12;
  return _jsxs(Box, {
    ref: drop,
    children: [
      (!isOver || !enableMoveInBetween) &&
        _jsx(Box, { style: { padding: 0, height: spacing, width: '100%' } }),
      isOver &&
        enableMoveInBetween &&
        _jsx(Box, {
          sx: {
            opacity: 0.5,
            paddingTop: spacing / 8,
            paddingBottom: spacing / 8,
          },
          children: renderComponent(data, {
            isOver: false,
            isDragging: false,
            isMovable: false,
          }),
        }),
    ],
  });
};
export default InBetween;
