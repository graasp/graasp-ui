import { Row, flexRender } from '@tanstack/react-table';

import { useDrag, useDrop } from 'react-dnd';

import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Checkbox, TableCell, TableRow } from '@mui/material';

export type TableMetaType = {
  align?: 'right' | 'left' | 'center';
  disableClicking?: boolean;
};

export type DraggableRowProps<T> = {
  row: Row<T>;
  onDrop: (draggedRow: T, targetRow: T) => void;
  isMovable?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (el: T) => void;
  showCheckbox?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCheckboxClick?: any;
  checked?: boolean;
};

const DraggableRow = <T extends object>({
  row,
  onDrop,
  isMovable = false,
  showCheckbox = false,
  onClick,
  onCheckboxClick,
  checked,
}: DraggableRowProps<T>): JSX.Element => {
  const [{ isOver }, dropRef] = useDrop({
    accept: 'row',
    drop: (draggedRow: Row<T>) => {
      onDrop(draggedRow.original, row.original);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const [{ isDragging }, dragRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => row,
    type: 'row',
  });

  return (
    <TableRow
      style={{
        opacity: isDragging ? 0.5 : 1,
        background: isOver ? 'lightgrey' : undefined,
      }}
      ref={dropRef}
      sx={
        onClick
          ? {
              '&:hover': {
                cursor: 'pointer',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              },
            }
          : {}
      }
    >
      {isMovable && (
        <TableCell sx={{ p: 0 }}>
          <span style={{ cursor: 'move' }} ref={dragRef}>
            <DragIndicatorIcon fontSize='small' />
          </span>
        </TableCell>
      )}
      {showCheckbox && (
        <TableCell sx={{ p: 0 }}>
          <Checkbox
            checked={checked}
            onChange={(e) => onCheckboxClick?.(e, row.original)}
          />
        </TableCell>
      )}
      {row.getVisibleCells().map((cell) => (
        <TableCell
          sx={{ p: 1 }}
          key={cell.id}
          align={(cell.column.columnDef.meta as TableMetaType)?.align}
          onClick={() => {
            // necessary to check false because it should be true by default
            if (
              !(cell.column.columnDef.meta as TableMetaType)?.disableClicking
            ) {
              onClick?.(row.original);
            }
          }}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default DraggableRow;
