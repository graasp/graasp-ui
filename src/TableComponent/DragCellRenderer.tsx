import { GripVertical } from 'lucide-react';

import { Box, styled } from '@mui/material';

import { FC, useEffect, useRef } from 'react';

const StyledDragIndicatorIcon = styled(GripVertical)({
  '&:hover': {
    cursor: 'move',
  },
});

interface Props {
  data: {
    id: string;
  };
  registerRowDragger: (ref: SVGSVGElement) => void;
  buildId?: (id: string) => string;
}

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
  }, [dragRef, registerRowDragger]);

  return (
    <Box display='flex' alignItems='center'>
      <StyledDragIndicatorIcon
        fontSize='small'
        id={buildId?.(item.id)}
        ref={dragRef}
      />
    </Box>
  );
};

export default DragCellRenderer;
