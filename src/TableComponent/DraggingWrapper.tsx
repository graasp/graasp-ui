// we could replace dnd with this https://docs.dndkit.com
import { Box } from '@mui/material';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import DraggableRow, { DraggableRowProps } from './DraggableRow';
import InBetween, { InBetweenProps } from './InBetween';

export type DraggingWrapperProps<T> = {
  renderComponent: (el: T) => JSX.Element;

  rows?: T[];

  /** wrapper id */
  id?: string;
  getRowId?: (el: T) => string;

  /** show checkbox */
  showCheckbox?: boolean;
  /** show drag anchor */
  isMovable?: boolean;
  /** handler on drop in a row */
  onDropInRow?: DraggableRowProps<T>['onDrop'];
  /** enable to drag in between rows */
  enableMoveInBetween?: boolean;
  /** handler on drop in between rows */
  onDropBetweenRow?: InBetweenProps<T>['onDrop'];
};

const DraggingWrapper = <T extends object>({
  id,
  rows = [],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getRowId = (row: any) => row.id,
  // sx = {},
  onDropInRow: onDropInRowFn,
  onDropBetweenRow: onDropBetweenRowFn,
  renderComponent,
  isMovable = false,
  enableMoveInBetween = true,
}: DraggingWrapperProps<T>): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onDropInRow = (draggedRow: T, targetRow: T) => {
    console.log('move into');
    onDropInRowFn?.(draggedRow, targetRow);
  };

  const onDropBetweenRow = (
    draggedRow: T,
    previousRowIdx: number,
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  ) => {
    console.log('move into');
    onDropBetweenRowFn?.(draggedRow, previousRowIdx);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box id={id} width='100%'>
        <InBetween<T>
          previousRowIdx={0}
          onDrop={onDropBetweenRow}
          enableMoveInBetween={enableMoveInBetween}
          renderComponent={renderComponent}
        />
        {rows.map((row, idx) => (
          <>
            <DraggableRow<T>
              isMovable={isMovable}
              key={getRowId(row)}
              row={row}
              renderComponent={renderComponent}
              onDrop={onDropInRow}
            />
            <InBetween<T>
              renderComponent={renderComponent}
              enableMoveInBetween={enableMoveInBetween}
              previousRowIdx={idx + 1}
              onDrop={onDropBetweenRow}
            />
          </>
        ))}
      </Box>
    </DndProvider>
  );
};
export default DraggingWrapper;
