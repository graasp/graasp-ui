// we could replace dnd with this https://docs.dndkit.com
import { Box } from '@mui/material';

import { useDrop } from 'react-dnd';

export type InBetweenProps<T> = {
  previousRowIdx: number;
  enableMoveInBetween: boolean;
  onDrop: (draggedRow: T, idx: number) => void;
  renderComponent: (el: T) => JSX.Element;
};

const InBetween = <T extends object>({
  previousRowIdx,
  onDrop,
  enableMoveInBetween,
  renderComponent,
}: InBetweenProps<T>): JSX.Element => {
  const [{ isOver, data }, drop] = useDrop(
    () => ({
      accept: 'row',
      drop: (draggedRow: T) => {
        return onDrop(draggedRow, previousRowIdx);
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

  return (
    <Box ref={drop}>
      {(!isOver || !enableMoveInBetween) && (
        <Box style={{ padding: 0, height: spacing, width: '100%' }} />
      )}
      {
        isOver && enableMoveInBetween && (
          <Box
            sx={{
              opacity: 0.5,
              paddingTop: spacing / 8,
              paddingBottom: spacing / 8,
            }}
          >
            {renderComponent(data)}
          </Box>
        )
        // <Box
        //   sx={{ background: 'green', height: 5, padding: 0, width: '100%' }}
        // />
      }
    </Box>
  );
};

export default InBetween;
