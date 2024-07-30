// we could replace dnd with this https://docs.dndkit.com
import { Unstable_Grid2 as Grid2 } from '@mui/material';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

import DraggableElement from './DraggableElement.js';
import InBetween from './InBetween.js';

const DraggingWrapper = ({
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
}) => {
  const onDropInRow = (draggedRow, targetRow) => {
    onDropInRowFn?.(draggedRow, targetRow);
  };
  const onDropBetweenRow = (draggedRow, previousRow) => {
    onDropBetweenRowFn?.(draggedRow, previousRow);
  };
  return (
    // we need context={window} to use multiple times in the document
    // https://github.com/react-dnd/react-dnd/issues/3257#issuecomment-1239254032
    _jsx(DndProvider, {
      backend: HTML5Backend,
      context: window,
      children: _jsxs(Grid2, {
        container: true,
        id: id,
        width: '100%',
        children: [
          _jsx(Grid2, {
            xs: 12,
            children: _jsx(InBetween, {
              onDrop: onDropBetweenRow,
              enableMoveInBetween: enableMoveInBetween,
              renderComponent: renderComponent,
            }),
          }),
          rows.map((row) =>
            _jsxs(Grid2, {
              xs: Math.floor(12 / nbColumns),
              children: [
                _jsx(
                  DraggableElement,
                  {
                    canDrop: canDrop,
                    allowFiles: allowFiles,
                    isMovable: isMovable,
                    row: row,
                    renderComponent: renderComponent,
                    onDrop: onDropInRow,
                  },
                  getRowId?.(row),
                ),
                _jsx(InBetween, {
                  allowFiles: allowFiles,
                  renderComponent: renderComponent,
                  enableMoveInBetween: enableMoveInBetween,
                  previousRow: row,
                  onDrop: onDropBetweenRow,
                }),
              ],
            }),
          ),
        ],
      }),
    })
  );
};
export default DraggingWrapper;
