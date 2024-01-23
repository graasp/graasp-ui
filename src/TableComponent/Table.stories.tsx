import { action } from '@storybook/addon-actions';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.min.css';
import 'ag-grid-community/dist/styles/ag-theme-material.min.css';

import React from 'react';

import { DeleteButton, EditButton } from '../buttons';
import { TABLE_CATEGORIES } from '../utils/storybook';
import Table, { TableProps } from './Table';

const agGridCategory = 'Ag Grid';
const rowData = [
  {
    id: 1,
    name: 'name 1',
    type: 'file',
    updatedAt: '2023-09-06T11:50:32.894Z',
  },
  { id: 2, name: 'name 2', type: 'h5p', updatedAt: '2023-09-06T11:50:32.894Z' },
  {
    id: 3,
    name: 'name 3 is a very long file name ',
    type: 'folder',
    updatedAt: '2023-09-06T11:50:32.894Z',
  },
  {
    id: 1,
    name: 'name 4',
    type: 'file',
    updatedAt: '2023-09-06T11:50:32.894Z',
  },
  { id: 2, name: 'name 5', type: 'h5p', updatedAt: '2023-09-06T11:50:32.894Z' },
  {
    id: 3,
    name: 'name 6',
    type: 'folder',
    updatedAt: '2023-09-06T11:50:32.894Z',
  },
  {
    id: 1,
    name: 'name 7',
    type: 'file',
    updatedAt: '2023-09-06T11:50:32.894Z',
  },
  { id: 2, name: 'name 8', type: 'h5p', updatedAt: '2023-09-06T11:50:32.894Z' },
  {
    id: 3,
    name: 'name 9',
    type: 'folder',
    updatedAt: '2023-09-06T11:50:32.894Z',
  },
];
const dateFormatter: ColDef['valueFormatter'] = ({ value: date }) =>
  date.toLocaleString('en-US');

const ToolbarActions: TableProps['ToolbarActions'] = ({ selectedIds }) => (
  <DeleteButton
    color='secondary'
    onClick={(e) => {
      action(selectedIds.join(', '))(e);
    }}
  />
);

const meta: Meta<typeof Table> = {
  title: 'Common/Table',
  component: Table,

  argTypes: {
    enableDrag: {},
    sx: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    className: {
      table: {
        category: TABLE_CATEGORIES.SELECTORS,
      },
    },
    id: {
      table: {
        category: TABLE_CATEGORIES.SELECTORS,
      },
    },
    columnDefs: {
      table: {
        category: agGridCategory,
      },
    },
    getRowId: {
      table: {
        category: agGridCategory,
      },
    },
    onRowDataChanged: {
      table: {
        category: agGridCategory,
      },
    },
    enableBrowserTooltips: {
      table: {
        category: agGridCategory,
      },
    },
    rowDragManaged: {
      table: {
        category: agGridCategory,
      },
    },
    suppressCellFocus: {
      table: {
        category: agGridCategory,
      },
    },
    suppressRowClickSelection: {
      table: {
        category: agGridCategory,
      },
    },
    rowSelection: {
      table: {
        category: agGridCategory,
      },
    },
    onCellClicked: {
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
      action: 'cell clicked',
    },
  },
};
export default meta;

type Story = StoryObj<typeof Table>;

export const Simple: Story = {
  args: {
    columnDefs: [
      {
        field: 'name',
        headerName: 'Name',
        headerCheckboxSelection: true,
        checkboxSelection: true,
        // rowDrag: true,
      },
      {
        field: 'type',
        headerName: 'Type',
        type: 'rightAligned',
        suppressSizeToFit: true,
        maxWidth: 80,
      },
      {
        field: 'updatedAt',
        headerName: 'Updated At',
        type: 'rightAligned',
        suppressSizeToFit: true,
        maxWidth: 160,
        valueFormatter: dateFormatter,
      },
      {
        field: 'actions',
        headerName: 'Actions',
        suppressSizeToFit: true,
        maxWidth: 100, // approx 50 per iconButton (40px + 8px margin on each side)
        suppressKeyboardEvent: Table.suppressKeyboardEventForParentCell,
        cellRenderer: ({ data }: { data: { id: string } }) => {
          return (
            <>
              <DeleteButton id={'delete' + data.id} />
              <EditButton />
            </>
          );
        },
      },
    ],
    rowData,
    ToolbarActions,
  },
};

Simple.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);

  // we need to wait a lot because it is ag grid that triggers
  await waitFor(async () => {
    await expect(canvas.getAllByRole('row')).toBeTruthy();
  });

  await waitFor(async () => {
    await expect(canvas.getByText('name 1')).toBeTruthy();
  });
  // check mouse onclick trigger event
  await userEvent.click(canvas.getByText('name 1'));
  await waitFor(async () => {
    await expect(args.onCellClicked).toHaveBeenCalledTimes(1);
  });

  // check keyboard navigation
  await userEvent.keyboard('{Tab}{Enter}');
  await waitFor(async () => {
    await expect(args.onCellClicked).toHaveBeenCalledTimes(2);
  });

  await userEvent.keyboard('{Tab}{Enter}');
  await waitFor(async () => {
    await expect(args.onCellClicked).toHaveBeenCalledTimes(3);
  });

  await userEvent.keyboard('{Tab}{Enter}');
  await waitFor(async () => {
    await expect(args.onCellClicked).toHaveBeenCalledTimes(4);
  });

  // ag grid does not simulate the tab navigation correctly
  // so we cannot test inner navigation
};

export const SimpleWithDrag: Story = {
  args: {
    tableHeight: 300,
    enableDrag: true,
    columnDefs: [
      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        field: 'name',
        headerName: 'Name',
        // rowDrag: true,
      },
      {
        field: 'type',
        headerName: 'Type',
        type: 'rightAligned',
      },
      {
        field: 'updatedAt',
        headerName: 'Updated At',
        type: 'rightAligned',
        valueFormatter: dateFormatter,
      },
    ],
    rowData,
  },
};

export const Empty: Story = {
  args: {
    tableHeight: 300,
    columnDefs: [
      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        field: 'name',
        headerName: 'Name',
      },
      {
        field: 'type',
        headerName: 'Type',
        type: 'rightAligned',
        flex: 2,
      },
      {
        field: 'updatedAt',
        headerName: 'Updated At',
        flex: 3,
        type: 'rightAligned',
        valueFormatter: dateFormatter,
      },
    ],
    rowData: [],
  },
};

export const WithPagination: Story = {
  args: {
    page: 2,
    pageSize: 2,
    totalCount: rowData.length,
    columnDefs: [
      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        field: 'name',
        headerName: 'Name',
      },
      {
        field: 'type',
        headerName: 'Type',
        type: 'rightAligned',
        flex: 2,
      },
      {
        field: 'updatedAt',
        headerName: 'Updated At',
        flex: 3,
        type: 'rightAligned',
        valueFormatter: dateFormatter,
      },
    ],
    rowData: rowData.slice(4, 6),
  },
};
