import React, { ReactElement, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { GridApi, RowNode, ColDef, IRowDragItem } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.min.css';

import TableToolbar from './TableToolbar';
import DragCellRenderer from './DragCellRenderer';
import TableNoRowsContent from './TableNoRowsContent';
import { DRAG_ICON_SIZE } from '../constants';

interface Props {
  id: string;
  tableHeight?: number;
  rowData: unknown[];
  NoRowsComponent?: ReactElement;
  onDragEnd: (nodes: RowNode[]) => void;
  renderActions?: (args: { selectedIds: string[] }) => ReactElement;
  className?: string;
  onSelectionChanged: () => void;
  columnDefs: ColDef[];
  isClickable: boolean;
  onCellClicked: () => void;
  getRowId: () => string;
  onRowDataChanged: () => void;
  rowSelection?: string;
  NoSelectionToolbarComponent: ReactElement;
  suppressCellFocus?: boolean;
  suppressRowClickSelection?: boolean;
  rowDragManaged?: boolean;
  rowDragText: (params: IRowDragItem, dragItemCount: number) => string;
  enableDrag?: boolean;
  rowHeight: number;
  emptyMessage?: string;
  countTextFunction?: (selected: string[]) => string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& .ag-checked::after': {
      color: `${theme.palette.primary.main}!important`,
    },
  },
  table: {
    fontSize: theme.typography.fontSize,
    width: '100%',
    height: (props: { tableHeight: number | string }) => props.tableHeight,
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowClickable: {
    cursor: 'pointer',
  },
  dragCell: {
    paddingLeft: '0!important',
    paddingRight: '0!important',
    display: 'flex',
    alignItems: 'center',
  },
  actionCell: {
    paddingLeft: '0!important',
    paddingRight: '0!important',
    textAlign: 'right',
  },
}));

const GraaspTable: React.FC<Props> = ({
  renderActions,
  emptyMessage,
  onRowDataChanged,
  id,
  rowData,
  NoRowsComponent,
  onDragEnd,
  onSelectionChanged,
  columnDefs,
  onCellClicked,
  getRowId,
  NoSelectionToolbarComponent,
  rowDragText,
  rowHeight,
  countTextFunction,
  tableHeight = 'auto',
  className = '',
  isClickable = true,
  rowSelection = 'multiple',
  suppressCellFocus = true,
  suppressRowClickSelection = true,
  rowDragManaged = true,
  enableDrag = false,
}) => {
  const [gridApi, setGridApi] = useState<GridApi>();
  const [selected, setSelected] = useState<string[]>([]);
  const classes = useStyles({ tableHeight });

  const onGridReady = (params: { api: GridApi }): void => {
    setGridApi(params.api);
  };

  // never changes, so we can use useMemo
  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
    }),
    [],
  );

  const changeSelection = (): void => {
    setSelected(gridApi?.getSelectedRows().map((r) => r.id) ?? []);
  };

  const handleRowDataChanged = (): void => {
    changeSelection();
    // eslint-disable-next-line no-unused-expressions
    onRowDataChanged?.();
  };

  const handleSelectionChanged = (): void => {
    changeSelection();
    // eslint-disable-next-line no-unused-expressions
    onSelectionChanged?.();
  };

  const handleDragEnd = (): void => {
    // return displayed rows
    const nodes: RowNode[] = [];
    // eslint-disable-next-line no-unused-expressions
    gridApi?.getModel().forEachNode((n) => nodes.push(n));
    // eslint-disable-next-line no-unused-expressions
    onDragEnd?.(nodes);
  };

  const dragColumn: ColDef = {
    hide: !enableDrag,
    cellRenderer: DragCellRenderer,
    cellClass: classes.dragCell,
    headerClass: classes.dragCell,
    rowDragText,
    sortable: false,
    maxWidth: DRAG_ICON_SIZE,
  };

  const colDefs: ColDef[] = [dragColumn, ...columnDefs];

  return (
    <div className={classes.root}>
      <TableToolbar
        numSelected={selected.length}
        selected={selected}
        renderActions={renderActions}
        NoSelectionToolbarComponent={NoSelectionToolbarComponent}
        countText={countTextFunction?.(selected)}
      />
      <div
        className={clsx('ag-theme-material', classes.table, className)}
        id={id}
      >
        <AgGridReact
          columnDefs={colDefs}
          rowData={rowData}
          defaultColDef={defaultColDef}
          rowSelection={rowSelection}
          suppressRowClickSelection={suppressRowClickSelection}
          suppressCellFocus={suppressCellFocus}
          noRowsOverlayComponentFramework={
            NoRowsComponent ?? TableNoRowsContent({ emptyMessage })
          }
          rowDragManaged={rowDragManaged}
          onRowDragEnd={handleDragEnd}
          onGridReady={onGridReady}
          onSelectionChanged={handleSelectionChanged}
          onCellClicked={isClickable ? onCellClicked : undefined}
          rowClass={clsx({
            [classes.row]: !isClickable,
            [classes.rowClickable]: isClickable,
          })}
          getRowHeight={() => rowHeight}
          getRowId={getRowId}
          onRowDataChanged={handleRowDataChanged}
          suppressRowHoverHighlight={!isClickable}
        />
      </div>
    </div>
  );
};

export default GraaspTable;
