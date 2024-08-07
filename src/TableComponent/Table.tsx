import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  CellClickedEvent,
  CellKeyDownEvent,
  ColDef,
  GridApi,
  IRowDragItem,
  RowDataUpdatedEvent,
  RowNode,
  SelectionChangedEvent,
  SortChangedEvent,
} from '@ag-grid-community/core';
import { AgGridReact } from '@ag-grid-community/react';

import { SxProps, styled } from '@mui/material';
import Box from '@mui/material/Box';
import TablePagination, {
  TablePaginationProps,
} from '@mui/material/TablePagination';

import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';

import DragCellRenderer from './DragCellRenderer';
import TableNoRowsContent from './TableNoRowsContent';
import TableToolbar from './TableToolbar';
import { suppressKeyboardEventForParentCell } from './utils';

const DRAG_COLUMN_WIDTH = 22;
const ITEMS_DEFAULT_PAGE_SIZE = 10;

export interface TableProps<T = unknown> {
  className?: string;
  /**
   * definition of the columns following AG Grid definitions
   */
  columnDefs: ColDef[];
  /**
   * Table Toolbar's count text
   */
  countTextFunction?: (selected: string[]) => string;
  emptyMessage?: string;
  enableBrowserTooltips?: boolean;
  enableDrag?: boolean;
  getRowId?: (args: { data: T }) => string;
  id?: string;
  isClickable?: boolean;
  NoRowsComponent?: ReactElement;
  NoSelectionToolbar?: () => JSX.Element;
  onCellClicked?: ((event: CellClickedEvent<T, unknown>) => void) | undefined;
  onDragEnd?: (nodes: RowNode[]) => void;
  onRowDataChanged?: (context: RowDataUpdatedEvent<T>) => void;
  onSelectionChanged?: (context: SelectionChangedEvent<T>) => void;
  rowData: T[];
  rowDragManaged?: boolean;
  rowDragText?: (params: IRowDragItem, dragItemCount: number) => string;
  rowHeight?: number;
  rowSelection?: 'single' | 'multiple';
  suppressCellFocus?: boolean;
  suppressRowClickSelection?: boolean;
  sx?: SxProps;
  tableHeight?: number | string;
  onSortChanged?: (event: SortChangedEvent) => void;
  ToolbarActions?: ({ selectedIds }: { selectedIds: string[] }) => JSX.Element;
  /**
   * enable pagination
   * We don't use AG Grid's pagination because it disables the custom dragging
   */
  pagination?: boolean;
  page?: number;
  onPageChange?: (event: unknown, newPage: number) => void;
  totalCount?: number;
  labelDisplayedRows?: TablePaginationProps['labelDisplayedRows'];
  pageSize?: number;
}

const StyledDiv = styled('div')(({ theme }) => ({
  width: '100%',
  '.ag-theme-material .ag-checkbox-input-wrapper.ag-checked:after': {
    color: theme.palette.primary.main,
  },
  // override table background color
  '& .ag-root-wrapper, & .ag-row, & .ag-row-odd, & .ag-header': {
    backgroundColor: 'transparent',
  },
  height: '100%',
  '.ag-selection-checkbox, .ag-header-select-all': {
    // reduce margin after checkbox in cells and header
    marginRight: `${theme.spacing(2)}!important`,
  },
  '.ag-cell, .ag-header-cell': {
    // reduce padding on left and right of cells
    padding: theme.spacing(0, 1),
  },
  '.ag-cell-wrapper': {
    minWidth: '0px',
  },
  // style comes from https://github.com/ag-grid/ag-grid/blob/2765a7ee68f78ce09a68549890015990cf68016b/community-modules/styles/src/internal/base/parts/_common-structural.scss#L16
  // needed in order to not show the aria-description above the table
  '.ag-aria-description-container': {
    zIndex: 9999,
    border: '0px',
    clip: 'rect(1px, 1px, 1px, 1px)',
    height: '1px',
    width: '1px',
    position: 'absolute',
    overflow: 'hidden',
    padding: '0px',
    whiteSpace: 'nowrap',
  },
}));

const ROW_CLASS_NAME = 'row-class-name';
const ROW_CLICKABLE_CLASS_NAME = 'row-clickable-class-name';
const DRAG_CELL_CLASS_NAME = 'drag-cell-class-name';

const DEFAULT_COL_DEF = {
  resizable: true,
  sortable: true,
  flex: 1,
};

const StyledBox = styled(Box, {
  shouldForwardProp: (prop: string) => prop !== 'tableHeight',
})<{ tableHeight: string | number }>(({ theme, tableHeight }) => ({
  fontSize: `${theme.typography.fontSize} !important`,
  width: '100%',
  height: tableHeight,
  [`.${ROW_CLASS_NAME}`]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  [`.${ROW_CLICKABLE_CLASS_NAME}`]: {
    cursor: 'pointer',
  },
  [`.${DRAG_CELL_CLASS_NAME}`]: {
    paddingLeft: '0!important',
    paddingRight: '0!important',
    display: 'flex',
    alignItems: 'center',
  },
}));

function GraaspTable<T>({
  className = 'ag-theme-material',
  columnDefs,
  countTextFunction,
  emptyMessage,
  enableBrowserTooltips = true,
  enableDrag = false,
  getRowId,
  id,
  isClickable = true,
  NoRowsComponent,
  NoSelectionToolbar,
  onCellClicked,
  onDragEnd,
  onRowDataChanged,
  onSelectionChanged,
  rowData: initialData,
  rowDragText,
  rowHeight,
  rowSelection = 'multiple',
  suppressCellFocus = false,
  suppressRowClickSelection = true,
  labelDisplayedRows,
  pagination = true,
  sx,
  tableHeight = 500,
  ToolbarActions,
  page = 1,
  onPageChange,
  totalCount,
  rowDragManaged,
  onSortChanged,
  pageSize = ITEMS_DEFAULT_PAGE_SIZE,
}: TableProps<T>): JSX.Element {
  const gridRef = useRef<AgGridReact>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [gridApi, setGridApi] = useState<GridApi>();
  const [rowData, setRowData] = useState<T[]>(initialData);

  useEffect(() => {
    if (rowData !== initialData) {
      setRowData(initialData);
    }
  }, [initialData]);

  const onGridReady = (params: { api: GridApi }): void => {
    if (!gridApi) {
      setGridApi(params.api);
    }
    // size columns to fit the width of the screen
    gridApi?.sizeColumnsToFit();
  };

  const changeSelection = (): void => {
    setSelected(gridApi?.getSelectedRows().map((r) => r.id) ?? []);
  };

  const onKeyPress = (event: CellKeyDownEvent): void => {
    if ((event.event as KeyboardEvent)?.key === 'Enter') {
      onCellClicked?.(event);
    }
  };

  const handleRowDataChanged = (context: RowDataUpdatedEvent<T>): void => {
    changeSelection();
    // eslint-disable-next-line no-unused-expressions
    onRowDataChanged?.(context);
  };

  const handleSelectionChanged = (context: SelectionChangedEvent<T>): void => {
    changeSelection();
    // eslint-disable-next-line no-unused-expressions
    onSelectionChanged?.(context);
  };

  const handleDragEnd = (): void => {
    const api = gridRef.current?.api;
    // return displayed rows
    const nodes: RowNode[] = [];
    // eslint-disable-next-line no-unused-expressions
    api?.getModel().forEachNode((n) => nodes.push(n));
    // eslint-disable-next-line no-unused-expressions
    onDragEnd?.(nodes);
  };

  const buildColumnDefs = useCallback((): ColDef[] => {
    if (!enableDrag) {
      return [...columnDefs];
    }

    // adds the column drag on the left of the table
    const dragCellClasses = [DRAG_CELL_CLASS_NAME];
    const dragColumn: ColDef = {
      cellRenderer: DragCellRenderer,
      rowDragText,
      field: 'name',
      cellClass: dragCellClasses,
      cellStyle: {
        display: 'flex',
      },
      headerClass: DRAG_CELL_CLASS_NAME,
      width: DRAG_COLUMN_WIDTH,
      maxWidth: DRAG_COLUMN_WIDTH,
      sortable: false,
      headerName: '',
      flex: 0,
    };

    // adds the drag column
    return [dragColumn, ...columnDefs];
  }, [columnDefs, enableDrag]);

  const EmptyTableComponent = (): JSX.Element => (
    <TableNoRowsContent emptyMessage={emptyMessage} />
  );

  return (
    <StyledDiv>
      <TableToolbar
        selected={selected}
        Actions={ToolbarActions}
        NoSelectionToolbar={NoSelectionToolbar}
        countTextFunction={countTextFunction}
      />
      <StyledBox
        className={className}
        id={id}
        sx={sx}
        tableHeight={tableHeight}
      >
        <AgGridReact
          onGridReady={onGridReady}
          ref={gridRef}
          modules={[ClientSideRowModelModule]}
          columnDefs={buildColumnDefs()}
          rowData={rowData}
          rowDragManaged={rowDragManaged}
          defaultColDef={DEFAULT_COL_DEF}
          rowSelection={rowSelection}
          suppressRowClickSelection={suppressRowClickSelection}
          suppressCellFocus={suppressCellFocus}
          noRowsOverlayComponent={NoRowsComponent ?? EmptyTableComponent}
          onRowDragEnd={handleDragEnd}
          onSelectionChanged={handleSelectionChanged}
          onSortChanged={onSortChanged}
          onCellKeyDown={isClickable ? onKeyPress : undefined}
          onCellClicked={isClickable ? onCellClicked : undefined}
          rowClass={`${
            isClickable ? ROW_CLICKABLE_CLASS_NAME : ROW_CLASS_NAME
          }`}
          getRowHeight={() => rowHeight}
          getRowId={getRowId}
          onRowDataUpdated={handleRowDataChanged}
          suppressRowHoverHighlight={!isClickable}
          enableBrowserTooltips={enableBrowserTooltips}
          enableCellTextSelection
          ensureDomOrder
          animateRows={true}
        />
        {pagination && (
          <TablePagination
            count={totalCount ?? rowData.length}
            labelDisplayedRows={labelDisplayedRows}
            page={Math.max(0, page)}
            onPageChange={onPageChange ?? (() => {})}
            rowsPerPageOptions={[]}
            component='div'
            rowsPerPage={page >= 0 ? pageSize : -1}
          />
        )}
      </StyledBox>
    </StyledDiv>
  );
}

export default Object.assign(GraaspTable, {
  textComparator: (text1: string, text2: string) =>
    text1.localeCompare(text2, undefined, { sensitivity: 'base' }),
  dateComparator: (d1: string, d2: string) =>
    new Date(d1).getTime() - new Date(d2).getTime(),
  suppressKeyboardEventForParentCell,
});
