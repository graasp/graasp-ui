import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { AgGridReact } from '@ag-grid-community/react';

import { Box, TablePagination, styled } from '@mui/material';

import { useCallback, useEffect, useRef, useState } from 'react';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

import DragCellRenderer from './DragCellRenderer.js';
import TableNoRowsContent from './TableNoRowsContent.js';
import TableToolbar from './TableToolbar.js';
import { suppressKeyboardEventForParentCell } from './utils.js';

const DRAG_COLUMN_WIDTH = 22;
const ITEMS_DEFAULT_PAGE_SIZE = 10;
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
  shouldForwardProp: (prop) => prop !== 'tableHeight',
})(({ theme, tableHeight }) => ({
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
function GraaspTable({
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
}) {
  const gridRef = useRef(null);
  const [selected, setSelected] = useState([]);
  const [gridApi, setGridApi] = useState();
  const [rowData, setRowData] = useState(initialData);
  useEffect(() => {
    if (rowData !== initialData) {
      setRowData(initialData);
    }
  }, [initialData]);
  const onGridReady = (params) => {
    if (!gridApi) {
      setGridApi(params.api);
    }
    // size columns to fit the width of the screen
    gridApi?.sizeColumnsToFit();
  };
  const changeSelection = () => {
    setSelected(gridApi?.getSelectedRows().map((r) => r.id) ?? []);
  };
  const onKeyPress = (event) => {
    if (event.event?.key === 'Enter') {
      onCellClicked?.(event);
    }
  };
  const handleRowDataChanged = (context) => {
    changeSelection();
    // eslint-disable-next-line no-unused-expressions
    onRowDataChanged?.(context);
  };
  const handleSelectionChanged = (context) => {
    changeSelection();
    // eslint-disable-next-line no-unused-expressions
    onSelectionChanged?.(context);
  };
  const handleDragEnd = () => {
    const api = gridRef.current?.api;
    // return displayed rows
    const nodes = [];
    // eslint-disable-next-line no-unused-expressions
    api?.getModel().forEachNode((n) => nodes.push(n));
    // eslint-disable-next-line no-unused-expressions
    onDragEnd?.(nodes);
  };
  const buildColumnDefs = useCallback(() => {
    if (!enableDrag) {
      return [...columnDefs];
    }
    // adds the column drag on the left of the table
    const dragCellClasses = [DRAG_CELL_CLASS_NAME];
    const dragColumn = {
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
  const EmptyTableComponent = () =>
    _jsx(TableNoRowsContent, { emptyMessage: emptyMessage });
  return _jsxs(StyledDiv, {
    children: [
      _jsx(TableToolbar, {
        selected: selected,
        Actions: ToolbarActions,
        NoSelectionToolbar: NoSelectionToolbar,
        countTextFunction: countTextFunction,
      }),
      _jsxs(StyledBox, {
        className: className,
        id: id,
        sx: sx,
        tableHeight: tableHeight,
        children: [
          _jsx(AgGridReact, {
            onGridReady: onGridReady,
            ref: gridRef,
            modules: [ClientSideRowModelModule],
            columnDefs: buildColumnDefs(),
            rowData: rowData,
            rowDragManaged: rowDragManaged,
            defaultColDef: DEFAULT_COL_DEF,
            rowSelection: rowSelection,
            suppressRowClickSelection: suppressRowClickSelection,
            suppressCellFocus: suppressCellFocus,
            noRowsOverlayComponent: NoRowsComponent ?? EmptyTableComponent,
            onRowDragEnd: handleDragEnd,
            onSelectionChanged: handleSelectionChanged,
            onSortChanged: onSortChanged,
            onCellKeyDown: isClickable ? onKeyPress : undefined,
            onCellClicked: isClickable ? onCellClicked : undefined,
            rowClass: `${isClickable ? ROW_CLICKABLE_CLASS_NAME : ROW_CLASS_NAME}`,
            getRowHeight: () => rowHeight,
            getRowId: getRowId,
            onRowDataUpdated: handleRowDataChanged,
            suppressRowHoverHighlight: !isClickable,
            enableBrowserTooltips: enableBrowserTooltips,
            enableCellTextSelection: true,
            ensureDomOrder: true,
            animateRows: true,
          }),
          pagination &&
            _jsx(TablePagination, {
              count: totalCount ?? rowData.length,
              labelDisplayedRows: labelDisplayedRows,
              page: Math.max(0, page),
              onPageChange: onPageChange ?? (() => {}),
              rowsPerPageOptions: [],
              component: 'div',
              rowsPerPage: page >= 0 ? pageSize : -1,
            }),
        ],
      }),
    ],
  });
}
export default Object.assign(GraaspTable, {
  textComparator: (text1, text2) =>
    text1.localeCompare(text2, undefined, { sensitivity: 'base' }),
  dateComparator: (d1, d2) => new Date(d1).getTime() - new Date(d2).getTime(),
  suppressKeyboardEventForParentCell,
});
