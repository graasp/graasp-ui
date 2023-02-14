import { action } from '@storybook/addon-actions';
import { expect } from '@storybook/jest';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.min.css';
import 'ag-grid-community/dist/styles/ag-theme-material.min.css';

import React from 'react';

import { DeleteButton, EditButton } from '../buttons';
import { TABLE_CATEGORIES } from '../utils/storybook';
import Table, { TableProps } from './Table';
import TableToolbar from './TableToolbar';

const agGridCategory = 'Ag Grid';
const rowData = [
  { id: 1, name: 'name 1', type: 'file', updatedAt: new Date() },
  { id: 2, name: 'name 2', type: 'h5p', updatedAt: new Date() },
  { id: 3, name: 'name 3', type: 'folder', updatedAt: new Date() },
  { id: 1, name: 'name 4', type: 'file', updatedAt: new Date() },
  { id: 2, name: 'name 5', type: 'h5p', updatedAt: new Date() },
  { id: 3, name: 'name 6', type: 'folder', updatedAt: new Date() },
  { id: 1, name: 'name 7', type: 'file', updatedAt: new Date() },
  { id: 2, name: 'name 8', type: 'h5p', updatedAt: new Date() },
  { id: 3, name: 'name 9', type: 'folder', updatedAt: new Date() },
];
const dateFormatter: ColDef<any>['valueFormatter'] = ({ value: date }) =>
  date.toLocaleString('en-US');

const ToolbarActions: TableProps<any>['ToolbarActions'] = ({ selectedIds }) => (
  <DeleteButton
    color='secondary'
    onClick={(e) => {
      action(selectedIds.join(', '))(e);
    }}
  />
);

export default {
  title: 'Common/Table',
  component: Table,
  subcomponents: { TableToolbar },

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
    dragClassName: {
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
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  tableHeight: 300,
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
    {
      field: 'actions',
      suppressKeyboardEvent: Table.suppressKeyboardEventForParentCell,
      cellRenderer: ({ data }: any) => {
        return (
          <>
            <DeleteButton id={'delete' + data.id} />
            <EditButton />
          </>
        );
      },
      headerName: 'actions',
    },
  ],
  rowData,
  ToolbarActions,
};

Simple.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);

  // we need to wait a lot because it is ag grid that triggers
  await waitFor(async () => {
    await expect(canvas.getAllByRole('row')).toBeTruthy();
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

export const SimpleWithDrag = Template.bind({});
SimpleWithDrag.args = {
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
};

export const Empty = Template.bind({});
Empty.args = {
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
};
