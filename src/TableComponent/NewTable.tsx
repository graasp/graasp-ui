import {
  ColumnDef,
  Row,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
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

import './styles.css';

type DraggableRowProps<T> = {
  row: Row<T>;
  onDrop: (draggedRow: T, targetRow: T) => void;
  isMovable?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (el: T) => void;
  showCheckbox?: boolean;
};

const DraggableRow = <T extends object>({
  row,
  onDrop,
  isMovable = false,
  showCheckbox = false,
  onClick,
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
      className={onClick ? 'table-row' : ''}
      // ref={previewRef} //previewRef could go here
      style={{
        opacity: isDragging ? 0.5 : 1,
        background: isOver ? 'lightgrey' : undefined,
      }}
      onClick={() => onClick?.(row.original)}
      ref={dropRef}
    >
      {isMovable && (
        <TableCell sx={{ p: 1 }}>
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
  previousRowIdx: number;
  onDrop: (draggedRow: T, idx: number) => void;
};

const InBetween = <T extends object>({
  colSpan,
  previousRowIdx,
  onDrop,
}: InBetweenProps<T>): JSX.Element => {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'row',
      drop: (draggedRow: Row<T>) => {
        console.log('wefwef', draggedRow);
        return onDrop(draggedRow.original, previousRowIdx);
      },
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
  sx?: React.CSSProperties;
  onDropBetweenRow?: InBetweenProps<T>['onDrop'];
  onDropInRow?: DraggableRowProps<T>['onDrop'];
  page: number;
  pageSize: number;
  onPageChange?: (newPage: number) => void;
  isMovable?: boolean;
  showCheckbox?: boolean;
  id?: string;
  onClick?: DraggableRowProps<T>['onClick'];
};

const NewTable = <T extends object>({
  id,
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
  onClick,
}: Props<T>): JSX.Element => {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleChangePage = (_event: unknown, newPage: number) => {
    onPageChange?.(newPage);
  };

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

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId,
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    getSortedRowModel: getSortedRowModel(), //client-side sorting
    onSortingChange: setSorting, //optionally control sorting state in your own scope for easy access
    // sortingFns: {
    //   sortStatusFn, //or provide our custom sorting function globally for all columns to be able to use
    // },
    //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
    state: {
      sorting,
    },
  });

  const indentIdx = isMovable || showCheckbox ? 1 : 0;

  return (
    <DndProvider backend={HTML5Backend}>
      <TableContainer id={id}>
        <Table style={{ width: '100%', ...sx }}>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {/* one row for moving or checkbox*/}
                {(isMovable || showCheckbox) && <TableCell width={1} />}
                {headerGroup.headers.map((header) => (
                  <TableCell
                    className='table-head'
                    key={header.id}
                    colSpan={header.colSpan}
                    sx={{ fontWeight: 'bold' }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted() as string] ?? null}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            <InBetween<T>
              colSpan={columns.length + indentIdx}
              previousRowIdx={0}
              onDrop={onDropBetweenRow}
            />
            {table.getRowModel().rows.map((row, idx) => (
              <>
                <DraggableRow<T>
                  isMovable={isMovable}
                  key={row.id}
                  row={row}
                  onDrop={onDropInRow}
                  onClick={onClick}
                />
                <InBetween<T>
                  colSpan={columns.length + indentIdx}
                  previousRowIdx={idx + 1}
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
