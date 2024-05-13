// we could replace dnd with this https://docs.dndkit.com
import { Box } from '@mui/material';

import { useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';

import { DraggableAndDroppableProps, DroppedFile } from './DraggableRow';

export type InBetweenProps<T> = {
  previousRowIdx: number;
  enableMoveInBetween: boolean;
  onDrop: (draggedRow: T | DroppedFile, idx: number) => void;
  renderComponent: (
    el: T | DroppedFile,
    args: DraggableAndDroppableProps,
  ) => JSX.Element;
  allowFiles?: boolean;
};

const InBetween = <T extends object>({
  previousRowIdx,
  onDrop,
  enableMoveInBetween,
  renderComponent,
  allowFiles = true,
}: InBetweenProps<T>): JSX.Element => {
  const accept = ['row'];
  if (allowFiles) {
    accept.push(NativeTypes.FILE);
  }
  const [{ isOver, data }, drop] = useDrop(
    () => ({
      accept,
      drop: (draggedRow: T | DroppedFile) => {
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
      {isOver && enableMoveInBetween && (
        <Box
          sx={{
            opacity: 0.5,
            paddingTop: spacing / 8,
            paddingBottom: spacing / 8,
          }}
        >
          {renderComponent(data, { isOver: false, isDragging: false })}
        </Box>
      )}
    </Box>
  );
};

export default InBetween;
