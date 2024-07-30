import { GripVertical } from 'lucide-react';

import { Box, styled } from '@mui/material';

import { useEffect, useRef } from 'react';
import { jsx as _jsx } from 'react/jsx-runtime';

const StyledDragIndicatorIcon = styled(GripVertical)({
  '&:hover': {
    cursor: 'move',
  },
});
const DragCellRenderer = ({ data: item, registerRowDragger, buildId }) => {
  const dragRef = useRef(null);
  useEffect(() => {
    if (dragRef && dragRef.current) {
      registerRowDragger(dragRef.current);
    }
  }, [dragRef, registerRowDragger]);
  return _jsx(Box, {
    display: 'flex',
    alignItems: 'center',
    children: _jsx(StyledDragIndicatorIcon, {
      fontSize: 'small',
      id: buildId?.(item.id),
      ref: dragRef,
    }),
  });
};
export default DragCellRenderer;
