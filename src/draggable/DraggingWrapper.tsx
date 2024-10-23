// we could replace dnd with this https://docs.dndkit.com
import { Grid } from '@mui/material';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import DraggableElement, { DraggableElementProps } from './DraggableElement.js';
import InBetween, { InBetweenProps } from './InBetween.js';
import { DroppedFile } from './types.js';

export type DraggingWrapperProps<T> = {
  renderComponent: DraggableElementProps<T>['renderComponent'];

  rows?: T[];

  /** wrapper id */
  id?: string;
  getRowId?: (el: T) => string;

  /** show drag anchor */
  isMovable?: DraggableElementProps<T>['isMovable'];
  /** handler on drop in a row */
  onDropInRow?: DraggableElementProps<T>['onDrop'];
  /** enable to drag in between rows */
  enableMoveInBetween?: boolean;
  /** handler on drop in between rows */
  onDropBetweenRow?: InBetweenProps<T>['onDrop'];

  allowFiles?: DraggableElementProps<T>['allowFiles'];

  canDrop?: DraggableElementProps<T>['canDrop'];

  /** number of columns */
  nbColumns?: number;
};

const DraggingWrapper = <T extends object>({
  id,
  rows = [],
  getRowId,
  onDropInRow: onDropInRowFn,
  onDropBetweenRow: onDropBetweenRowFn,
  renderComponent,
  isMovable,
  enableMoveInBetween = true,
  allowFiles = true,
  canDrop,
  nbColumns = 1,
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
      <Grid container id={id} width='100%'>
        <Grid xs={12}>
          <InBetween<T>
            onDrop={onDropBetweenRow}
            enableMoveInBetween={enableMoveInBetween}
            renderComponent={renderComponent}
          />
        </Grid>
        {rows.map((row) => (
          <Grid xs={Math.floor(12 / nbColumns)}>
            <DraggableElement<T>
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
          </Grid>
        ))}
      </Grid>
    </DndProvider>
  );
};
export default DraggingWrapper;
