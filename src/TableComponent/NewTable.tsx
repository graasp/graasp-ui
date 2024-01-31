import {
  ColumnDef,
  Row,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { CheckBox } from '@mui/icons-material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { TableBody } from '@mui/material';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import React from 'react';
// we could replace dnd with this https://docs.dndkit.com
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

type DraggableRowProps<T> = {
  row: Row<T>;
  onDrop: (draggedRowIndex: number, targetRowIndex: number) => void;
  isMovable?: boolean;
  showCheckbox?: boolean;
};

const DraggableRow = <T extends object>({
  row,
  onDrop,
  isMovable = false,
  showCheckbox = false,
}: DraggableRowProps<T>): JSX.Element => {
  const [{ isOver }, dropRef] = useDrop({
    accept: 'row',
    drop: (draggedRow: Row<T>) => onDrop(draggedRow.index, row.index),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => row,
    type: 'row',
  });

  return (
    <TableRow
      ref={previewRef} //previewRef could go here
      style={{
        opacity: isDragging ? 0.5 : 1,
        background: isOver ? 'lightgrey' : 'transparent',
      }}
    >
      {isMovable && (
        <TableCell sx={{ p: 1 }} ref={dropRef}>
          <span style={{ cursor: 'move' }} ref={dragRef}>
            <DragIndicatorIcon fontSize='small' />
          </span>
        </TableCell>
      )}
      {showCheckbox && (
        <TableCell>
          <CheckBox />
        </TableCell>
      )}
      {row.getVisibleCells().map((cell) => (
        <TableCell sx={{ p: 1 }} key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
};

type InBetweenProps<T> = {
  colSpan: number;
  idx: number;
  onDrop: DraggableRowProps<T>['onDrop'];
};

const InBetween = <T,>({
  colSpan,
  idx,
  onDrop,
}: InBetweenProps<T>): JSX.Element => {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'row',
      drop: (draggedRow: Row<T>) => onDrop(draggedRow.index, idx),
      canDrop: () => true,
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [],
  );

  return (
    <TableRow ref={drop}>
      {!isOver && (
        <TableCell colSpan={colSpan} style={{ padding: 0, height: 5 }} />
      )}
      {isOver && (
        <TableCell
          colSpan={colSpan}
          sx={{ background: 'green', height: 5, padding: 0 }}
          padding='none'
        />
      )}
    </TableRow>
  );
};

type Props<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getRowId?: (row: any) => string;
  sx: React.CSSProperties;
  onDropBetweenRow?: DraggableRowProps<T>['onDrop'];
  onDropInRow?: DraggableRowProps<T>['onDrop'];
  page: number;
  pageSize: number;
  onPageChange?: (newPage: number) => void;
  isMovable?: boolean;
  showCheckbox?: boolean;
};

const NewTable = <T extends object>({
  data,
  columns,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getRowId = (row: any) => row.userId,
  sx = {},
  onDropInRow: onDropInRowFn,
  onDropBetweenRow: onDropBetweenRowFn,
  page,
  pageSize,
  onPageChange,
  isMovable = false,
  showCheckbox = false,
}: Props<T>): JSX.Element => {
  console.log(data);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleChangePage = (_event: unknown, newPage: number) => {
    onPageChange?.(newPage);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onDropInRow = (draggedRowIndex: number, targetRowIndex: number) => {
    console.log('move into');
    onDropInRowFn?.(draggedRowIndex, targetRowIndex);
  };

  const onDropBetweenRow = (
    draggedRowIndex: number,
    targetRowIndex: number,
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  ) => {
    console.log('move into');
    onDropBetweenRowFn?.(draggedRowIndex, targetRowIndex);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId,
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  const indentIdx = isMovable || showCheckbox ? 1 : 0;

  return (
    <DndProvider backend={HTML5Backend}>
      <TableContainer>
        <Table style={{ width: '100%', ...sx }}>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {/* one row for moving or checkbox*/}
                {(isMovable || showCheckbox) && <TableCell width={1} />}
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    colSpan={header.colSpan}
                    sx={{ fontWeight: 'bold' }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            <InBetween
              colSpan={columns.length + indentIdx}
              idx={0}
              onDrop={onDropBetweenRow}
            />
            {table.getRowModel().rows.map((row, idx) => (
              <>
                <DraggableRow
                  isMovable={isMovable}
                  key={row.id}
                  row={row}
                  onDrop={onDropInRow}
                />
                <InBetween
                  colSpan={columns.length + indentIdx}
                  idx={idx + indentIdx}
                  onDrop={onDropBetweenRow}
                />
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component='div'
        count={data.length}
        rowsPerPage={pageSize}
        rowsPerPageOptions={[]}
        page={page}
        onPageChange={handleChangePage}
      />
    </DndProvider>
  );
};
export default NewTable;
