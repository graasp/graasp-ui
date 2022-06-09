import React, { FC, useEffect, useRef } from 'react';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { DRAG_ICON_SIZE } from '../constants';
import { styled } from '@mui/material';

interface Props {
  data: {
    id: string;
  };
  registerRowDragger: (ref: SVGSVGElement) => {};
  buildId?: (id: string) => string;
}

const StyledDragIndicatorIcon = styled(DragIndicatorIcon)({
  fontSize: DRAG_ICON_SIZE,
});
const StyledDragContainer = styled('div')({
  display: 'flex',
  '&:hover': {
    cursor: 'move',
  },
});

const DragCellRenderer: FC<Props> = ({
  data: item,
  registerRowDragger,
  buildId,
}) => {
  const dragRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (dragRef && dragRef.current) {
      registerRowDragger(dragRef.current);
    }
  }, [dragRef]);

  return (
    <StyledDragContainer>
      <StyledDragIndicatorIcon id={buildId?.(item.id)} ref={dragRef} />
    </StyledDragContainer>
  );
};

export default DragCellRenderer;
