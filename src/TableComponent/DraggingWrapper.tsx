// we could replace dnd with this https://docs.dndkit.com
import { Box } from '@mui/material';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import DraggableRow, { DraggableRowProps, DroppedFile } from './DraggableRow';
import InBetween, { InBetweenProps } from './InBetween';

export type DraggingWrapperProps<T> = {
  renderComponent: DraggableRowProps<T>['renderComponent'];

  rows?: T[];

  /** wrapper id */
  id?: string;
  getRowId?: (el: T) => string;

  /** show checkbox */
  // showCheckbox?: boolean;
  /** show drag anchor */
  isMovable?: boolean;
  /** handler on drop in a row */
  onDropInRow?: DraggableRowProps<T>['onDrop'];
  /** enable to drag in between rows */
  enableMoveInBetween?: boolean;
  /** handler on drop in between rows */
  onDropBetweenRow?: InBetweenProps<T>['onDrop'];

  allowFiles?: DraggableRowProps<T>['allowFiles'];

  canDrop?: DraggableRowProps<T>['canDrop'];
};

const DraggingWrapper = <T extends object>({
  id,
  rows = [],
  getRowId,
  onDropInRow: onDropInRowFn,
  onDropBetweenRow: onDropBetweenRowFn,
  renderComponent,
  isMovable = false,
  enableMoveInBetween = true,
  allowFiles = true,
  canDrop,
}: DraggingWrapperProps<T>): JSX.Element => {
  const onDropInRow = (draggedRow: T | DroppedFile, targetRow: T): void => {
    onDropInRowFn?.(draggedRow, targetRow);
  };

  const onDropBetweenRow = (
    draggedRow: T | DroppedFile,
    previousRow?: T,
  ): void => {
    onDropBetweenRowFn?.(draggedRow, previousRow);
  };

  return (
    // we need context={window} to use multiple times in the document
    // https://github.com/react-dnd/react-dnd/issues/3257#issuecomment-1239254032
    <DndProvider backend={HTML5Backend} context={window}>
      <Box id={id} width='100%'>
        <InBetween<T>
          onDrop={onDropBetweenRow}
          enableMoveInBetween={enableMoveInBetween}
          renderComponent={renderComponent}
        />
        {rows.map((row) => (
          <>
            <DraggableRow<T>
              canDrop={canDrop}
              allowFiles={allowFiles}
              isMovable={isMovable}
              key={getRowId?.(row)}
              row={row}
              renderComponent={renderComponent}
              onDrop={onDropInRow}
            />
            <InBetween<T>
              allowFiles={allowFiles}
              renderComponent={renderComponent}
              enableMoveInBetween={enableMoveInBetween}
              previousRow={row}
              onDrop={onDropBetweenRow}
            />
          </>
        ))}
      </Box>
    </DndProvider>
  );
};
export default DraggingWrapper;