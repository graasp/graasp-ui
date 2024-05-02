import {
  ColumnDef,
  Row,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { useState } from 'react';
// we could replace dnd with this https://docs.dndkit.com
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { TableBody } from '@mui/material';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import DraggableRow, { DraggableRowProps, TableMetaType } from './DraggableRow';

type InBetweenProps<T> = {
  colSpan: number;
  previousRowIdx: number;
  enableMoveInBetween: boolean;
  onDrop: (draggedRow: T, idx: number) => void;
};

const InBetween = <T extends object>({
  colSpan,
  previousRowIdx,
  onDrop,
  enableMoveInBetween,
}: InBetweenProps<T>): JSX.Element => {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'row',
      drop: (draggedRow: Row<T>) => {
        console.log('wefwef', draggedRow);
        return onDrop(draggedRow.original, previousRowIdx);
      },
      canDrop: () => enableMoveInBetween,
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [onDrop],
  );

  return (
    <TableRow ref={drop}>
      {(!isOver || !enableMoveInBetween) && (
        <TableCell colSpan={colSpan} style={{ padding: 0, height: 5 }} />
      )}
      {isOver && enableMoveInBetween && (
        <TableCell
          colSpan={colSpan}
          sx={{ background: 'green', height: 5, padding: 0 }}
        />
      )}
    </TableRow>
  );
};

// todo: handle multi sorting
export const useSorting = (
  defaultSorting: SortingState,
): [SortingState, (id: string) => void] => {
  const [sorting, setSorting] = useState<SortingState>(defaultSorting);

  // todo: set desc first on numeral columns
  const smartSetSorting = (id: string): void => {
    if (!sorting.length) {
      setSorting([{ id, desc: true }]);
    } else {
      if (sorting[0].desc) {
        setSorting([{ id, desc: false }]);
      } else {
        setSorting([]);
      }
    }
  };

  return [sorting, smartSetSorting];
};

export type TableProps<T> = {
  /** data to show, pagination happens outside of the table */
  data: T[];

  /** definition of the columns
   * meta: {
   *  disableClicking: boolean;
   *  align: left | right | center
   * }
   */
  columns: ColumnDef<T>[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // getRowId?: (row: any) => string;

  /** pagination, starts at 0 */
  page: number;
  pageSize: number;
  totalCount: number;
  /** handler for page change */
  onPageChange?: (newPage: number) => void;

  /** table id */
  id?: string;

  /** handler for row click */
  onClick?: DraggableRowProps<T>['onClick'];

  /** show checkbox */
  showCheckbox?: boolean;
  isChecked?: (row: T) => boolean;
  /** handler on checkbox click */
  onCheckboxClick?: DraggableRowProps<T>['onCheckboxClick'];

  /** show drag anchor */
  isMovable?: boolean;
  /** handler on drop in a row */
  onDropInRow?: DraggableRowProps<T>['onDrop'];
  /** enable to drag in between rows */
  enableMoveInBetween?: boolean;
  /** handler on drop in between rows */
  onDropBetweenRow?: InBetweenProps<T>['onDrop'];

  /** controller sorting, not defining them will allow automatic client side sorting based on sortingFn */
  sorting?: SortingState;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSortingChange?: any;

  /** toolbar */
  header?: JSX.Element;
};

const NewTable = <T extends object>({
  id,
  data,
  columns,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // getRowId = (row: any) => row.userId,
  // sx = {},
  onDropInRow: onDropInRowFn,
  onDropBetweenRow: onDropBetweenRowFn,
  page,
  pageSize,
  totalCount,
  onPageChange,
  isMovable = false,
  showCheckbox = false,
  onClick,
  enableMoveInBetween = true,
  onCheckboxClick,
  onSortingChange,
  sorting = [],
  header,
  isChecked,
}: TableProps<T>): JSX.Element => {
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

  const sortingProps = onSortingChange
    ? {
        onSortingChange,
        state: {
          sorting,
        },
      }
    : {
        getSortedRowModel: getSortedRowModel(), //client-side sorting
      };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // getRowId,
    debugTable: false,
    debugHeaders: false,
    debugColumns: true,
    ...sortingProps,
  });

  const indentIdx = (isMovable ? 1 : 0) + (showCheckbox ? 1 : 0);

  return (
    <DndProvider backend={HTML5Backend}>
      <TableContainer id={id}>
        <Table style={{ width: '100%' }}>
          <TableHead>
            {header || (
              <>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {/* one row for moving or checkbox*/}
                    {isMovable && <TableCell width={1} />}
                    {showCheckbox && <TableCell width={1} />}
                    {headerGroup.headers.map((header) => (
                      <TableCell
                        key={header.id}
                        colSpan={header.colSpan}
                        align={
                          (header.column.columnDef.meta as TableMetaType)?.align
                        }
                        sx={{
                          fontWeight: 'bold',
                          '&:hover': {
                            cursor: header.column.getCanSort()
                              ? 'pointer'
                              : 'default',
                          },
                        }}
                        onClick={
                          onSortingChange
                            ? () => {
                                if (header.column.getCanSort()) {
                                  onSortingChange?.(header.id);
                                }
                              }
                            : header.column.getToggleSortingHandler()
                        }
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
              </>
            )}
          </TableHead>
          <TableBody>
            <InBetween<T>
              colSpan={columns.length + indentIdx}
              previousRowIdx={0}
              onDrop={onDropBetweenRow}
              enableMoveInBetween={enableMoveInBetween}
            />
            {table.getRowModel().rows.map((row, idx) => (
              <>
                <DraggableRow<T>
                  isMovable={isMovable}
                  key={row.id}
                  row={row}
                  onDrop={onDropInRow}
                  onClick={onClick}
                  showCheckbox={showCheckbox}
                  onCheckboxClick={onCheckboxClick}
                  checked={isChecked?.(row.original)}
                />
                <InBetween<T>
                  enableMoveInBetween={enableMoveInBetween}
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
        count={totalCount}
        rowsPerPage={pageSize}
        rowsPerPageOptions={[]}
        page={page}
        onPageChange={handleChangePage}
      />
    </DndProvider>
  );
};
export default NewTable;
