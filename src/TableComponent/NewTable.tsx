import {
  ColumnDef,
  Row,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import React from 'react';
// we could replace dnd with this https://docs.dndkit.com
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

type DraggableRowProps<T> = {
  row: Row<T>;
  reorderRow: (draggedRowIndex: number, targetRowIndex: number) => void;
};

const DraggableRow = <T extends object>({
  row,
  reorderRow,
}: DraggableRowProps<T>): JSX.Element => {
  const [{ isOver }, dropRef] = useDrop({
    accept: 'row',
    drop: (draggedRow: Row<T>) => reorderRow(draggedRow.index, row.index),
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
    <tr
      ref={previewRef} //previewRef could go here
      style={{
        opacity: isDragging ? 0.5 : 1,
        background: isOver ? 'lightgrey' : 'transparent',
      }}
    >
      <td ref={dropRef}>
        <button style={{ cursor: 'move' }} ref={dragRef}>
          m
        </button>
      </td>
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
};

type InBetweenProps = {
  colSpan: number;
};

const InBetween = ({ colSpan }: InBetweenProps): JSX.Element => {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'row',
      drop: () => console.log('drop'),
      canDrop: () => true,
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [],
  );

  return (
    <tr ref={drop}>
      {!isOver && <td colSpan={colSpan} style={{ height: 10 }} />}
      {isOver && (
        <td colSpan={colSpan} style={{ height: 10, background: 'green' }} />
      )}
    </tr>
  );
};

type Props<T> = {
  initialData: T[];
  columns: ColumnDef<T>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getRowId?: (row: any) => string;
  onReorder?: () => Promise<void>;
  sx: React.CSSProperties;
};

const NewTable = <T extends object>({
  initialData,
  columns,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getRowId = (row: any) => row.userId,
  sx = {},
}: Props<T>): JSX.Element => {
  const [data, setData] = React.useState(initialData);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const reorderRow = (draggedRowIndex: number, targetRowIndex: number) => {
    console.log('move into');
    data.splice(targetRowIndex, 0, data.splice(draggedRowIndex, 1)[0]);
    setData([...data]);
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

  return (
    <DndProvider backend={HTML5Backend}>
      <table style={{ width: '100%', ...sx }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <>
              <tr key={headerGroup.id}>
                <th />
                {headerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            </>
          ))}
        </thead>
        <tbody>
          {/* + 1 for the reorder column */}
          <InBetween colSpan={columns.length + 1} />
          {table.getRowModel().rows.map((row) => (
            <>
              <DraggableRow key={row.id} row={row} reorderRow={reorderRow} />
              {/* + 1 for the reorder column */}
              <InBetween colSpan={columns.length + 1} />
            </>
          ))}
        </tbody>
      </table>
    </DndProvider>
  );
};
export default NewTable;
