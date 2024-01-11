import { faker } from '@faker-js/faker';
import {
  ColumnDef,
  Row,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import React from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export type Person = {
  userId: string;
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: 'relationship' | 'complicated' | 'single';
  subRows?: Person[];
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (): Person => {
  return {
    userId: faker.datatype.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int(40),
    visits: faker.number.int(1000),
    progress: faker.number.int(100),
    status: faker.helpers.shuffle<Person['status']>([
      'relationship',
      'complicated',
      'single',
    ])[0]!,
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const makeData = (...lens: number[]) => {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!;
    return range(len).map((): Person => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
};

const defaultColumns: ColumnDef<Person>[] = [
  {
    header: 'Name',
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: 'firstName',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.lastName,
        id: 'lastName',
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
      },
    ],
  },
  {
    header: 'Info',
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: 'age',
        header: () => 'Age',
        footer: (props) => props.column.id,
      },
      {
        header: 'More Info',
        columns: [
          {
            accessorKey: 'visits',
            header: () => <span>Visits</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorKey: 'status',
            header: 'Status',
            footer: (props) => props.column.id,
          },
          {
            accessorKey: 'progress',
            header: 'Profile Progress',
            footer: (props) => props.column.id,
          },
        ],
      },
    ],
  },
];

type Props<T> = {
  row: Row<T>;
  reorderRow: (draggedRowIndex: number, targetRowIndex: number) => void;
};

const DraggableRow = <T extends object>({
  row,
  reorderRow,
}: Props<T>): JSX.Element => {
  const [, dropRef] = useDrop({
    accept: 'row',
    drop: (draggedRow: Row<Person>) => reorderRow(draggedRow.index, row.index),
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
      style={{ opacity: isDragging ? 0.5 : 1 }}
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

const NewTable = ({
  initialData = makeData(6),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getRowId = (row: any) => row.userId,
}): JSX.Element => {
  const [columns] = React.useState(() => [...defaultColumns]);
  const [data, setData] = React.useState(initialData);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const reorderRow = (draggedRowIndex: number, targetRowIndex: number) => {
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
      <div>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
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
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <DraggableRow key={row.id} row={row} reorderRow={reorderRow} />
            ))}
          </tbody>
        </table>
      </div>
    </DndProvider>
  );
};
export default NewTable;
