import { faker } from '@faker-js/faker';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { waitFor, within } from '@storybook/testing-library';
import { ColumnDef } from '@tanstack/react-table';
import 'ag-grid-community/dist/styles/ag-grid.min.css';
import 'ag-grid-community/dist/styles/ag-theme-material.min.css';

import React from 'react';

import NewTable from './NewTable';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

export type Person = {
  userId: string;
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
};

const columns: ColumnDef<Person>[] = [
  {
    accessorFn: (row) => row.firstName,
    accessorKey: 'firstName',
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => row.lastName,
    id: 'lastName',
    cell: (info) => info.getValue(),
    header: () => <span>Last Name</span>,
  },
  {
    accessorFn: (row) => row.age,
    accessorKey: 'age',
    header: 'Age',
  },
  {
    accessorFn: (row) => row.visits,
    accessorKey: 'visits',
    header: () => <span>Visits</span>,
  },
];
const newPerson = (): Person => {
  return {
    userId: faker.datatype.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int(40),
    visits: faker.number.int(1000),
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const makeData = (...lens: number[]) => {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!;
    return range(len).map((): Person => {
      return newPerson();
    });
  };

  return makeDataLevel();
};

const meta: Meta<typeof NewTable> = {
  title: 'Common/NewTable',
  component: NewTable,

  argTypes: {
    // enableDrag: {},
    // sx: {
    //   table: {
    //     category: TABLE_CATEGORIES.MUI,
    //   },
    // },
    // className: {
    //   table: {
    //     category: TABLE_CATEGORIES.SELECTORS,
    //   },
    // },
    // id: {
    //   table: {
    //     category: TABLE_CATEGORIES.SELECTORS,
    //   },
    // },
    // columnDefs: {
    //   table: {
    //     category: agGridCategory,
    //   },
    // },
    // getRowId: {
    //   table: {
    //     category: agGridCategory,
    //   },
    // },
    // onRowDataChanged: {
    //   table: {
    //     category: agGridCategory,
    //   },
    // },
    // enableBrowserTooltips: {
    //   table: {
    //     category: agGridCategory,
    //   },
    // },
    // rowDragManaged: {
    //   table: {
    //     category: agGridCategory,
    //   },
    // },
    // suppressCellFocus: {
    //   table: {
    //     category: agGridCategory,
    //   },
    // },
    // suppressRowClickSelection: {
    //   table: {
    //     category: agGridCategory,
    //   },
    // },
    // rowSelection: {
    //   table: {
    //     category: agGridCategory,
    //   },
    // },
    // onCellClicked: {
    //   table: {
    //     category: TABLE_CATEGORIES.EVENTS,
    //   },
    //   action: 'cell clicked',
    // },
  },
};
export default meta;

type Story = StoryObj<typeof NewTable>;

export const Simple: Story = {
  args: {
    // ts issue
    // https://github.com/TanStack/table/issues/4382
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    columns: columns as any,
    pageSize: 6,
    page: 0,
    data: makeData(6),
    isMovable: true,
    // tableHeight: 300,
    // columnDefs: [
    //   {
    //     field: 'name',
    //     headerName: 'Name',
    //     headerCheckboxSelection: true,
    //     checkboxSelection: true,
    //     // rowDrag: true,
    //   },
    //   {
    //     field: 'type',
    //     headerName: 'Type',
    //     type: 'rightAligned',
    //     suppressSizeToFit: true,
    //     maxWidth: 80,
    //   },
    //   {
    //     field: 'updatedAt',
    //     headerName: 'Updated At',
    //     type: 'rightAligned',
    //     suppressSizeToFit: true,
    //     maxWidth: 160,
    //     valueFormatter: dateFormatter,
    //   },
    //   {
    //     field: 'actions',
    //     headerName: 'Actions',
    //     suppressSizeToFit: true,
    //     maxWidth: 100, // approx 50 per iconButton (40px + 8px margin on each side)
    //     cellRenderer: ({ data }: { data: { id: string } }) => {
    //       return (
    //         <>
    //           <DeleteButton id={'delete' + data.id} />
    //           <EditButton />
    //         </>
    //       );
    //     },
    //   },
    // ],
    // rowData,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // we need to wait a lot because it is ag grid that triggers
    await waitFor(async () => {
      await expect(canvas.getAllByRole('row')).toBeTruthy();
    });

    await waitFor(async () => {
      await expect(canvas.getByText('name 1')).toBeTruthy();
    });
    // check mouse onclick trigger event
    //   await userEvent.click(canvas.getByText('name 1'));
    //   await waitFor(async () => {
    //     await expect(args.onCellClicked).toHaveBeenCalledTimes(1);
    //   });

    //   // check keyboard navigation
    //   await userEvent.keyboard('{Tab}{Enter}');
    //   await waitFor(async () => {
    //     await expect(args.onCellClicked).toHaveBeenCalledTimes(2);
    //   });

    //   await userEvent.keyboard('{Tab}{Enter}');
    //   await waitFor(async () => {
    //     await expect(args.onCellClicked).toHaveBeenCalledTimes(3);
    //   });

    //   await userEvent.keyboard('{Tab}{Enter}');
    //   await waitFor(async () => {
    //     await expect(args.onCellClicked).toHaveBeenCalledTimes(4);
    //   });

    // ag grid does not simulate the tab navigation correctly
    // so we cannot test inner navigation
  },
};

// export const SimpleWithDrag: Story = {
//   args: {
//     tableHeight: 300,
//     enableDrag: true,
//     columnDefs: [
//       {
//         headerCheckboxSelection: true,
//         checkboxSelection: true,
//         field: 'name',
//         headerName: 'Name',
//         // rowDrag: true,
//       },
//       {
//         field: 'type',
//         headerName: 'Type',
//         type: 'rightAligned',
//       },
//       {
//         field: 'updatedAt',
//         headerName: 'Updated At',
//         type: 'rightAligned',
//         valueFormatter: dateFormatter,
//       },
//     ],
//     rowData,
//   },
// };

// export const Empty: Story = {
//   args: {
//     tableHeight: 300,
//     columnDefs: [
//       {
//         headerCheckboxSelection: true,
//         checkboxSelection: true,
//         field: 'name',
//         headerName: 'Name',
//       },
//       {
//         field: 'type',
//         headerName: 'Type',
//         type: 'rightAligned',
//         flex: 2,
//       },
//       {
//         field: 'updatedAt',
//         headerName: 'Updated At',
//         flex: 3,
//         type: 'rightAligned',
//         valueFormatter: dateFormatter,
//       },
//     ],
//     rowData: [],
//   },
// };

// export const WithPagination: Story = {
//   args: {
//     page: 2,
//     pageSize: 2,
//     totalCount: rowData.length,
//     columnDefs: [
//       {
//         headerCheckboxSelection: true,
//         checkboxSelection: true,
//         field: 'name',
//         headerName: 'Name',
//       },
//       {
//         field: 'type',
//         headerName: 'Type',
//         type: 'rightAligned',
//         flex: 2,
//       },
//       {
//         field: 'updatedAt',
//         headerName: 'Updated At',
//         flex: 3,
//         type: 'rightAligned',
//         valueFormatter: dateFormatter,
//       },
//     ],
//     rowData: rowData.slice(4, 6),
//   },
// };
