import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.min.css';
import 'ag-grid-community/dist/styles/ag-theme-material.min.css';

import React from 'react';

import { DeleteButton } from '../buttons';
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
  ],
  rowData,
  ToolbarActions,
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
