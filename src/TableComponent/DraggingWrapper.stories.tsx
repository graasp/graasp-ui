import { TABLE_CATEGORIES } from '@/utils/storybook';
import { type Meta, type StoryObj, composeStories } from '@storybook/react';

import { BrowserRouter } from 'react-router-dom';

import { FolderItemFactory, FolderItemType } from '@graasp/sdk';

import { ItemBadges } from '..';
import * as CardStories from '../Card/Card.stories';
import DraggingWrapper from './DraggingWrapper';

const { Dense } = composeStories(CardStories);
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const makeData = (...lens: number[]) => {
  const makeDataLevel = (depth = 0): FolderItemType[] => {
    const len = lens[depth]!;
    return range(len).map((): FolderItemType => {
      return FolderItemFactory();
    });
  };

  return makeDataLevel();
};

const meta: Meta<typeof DraggingWrapper> = {
  title: 'Common/DraggingWrapper',
  component: DraggingWrapper,
  decorators: [
    (story) => {
      return <BrowserRouter>{story()}</BrowserRouter>;
    },
  ],

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
    onCheckboxClick: {
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
      action: 'checkbox clicked',
    },
  },
};
export default meta;

type Story = StoryObj<typeof DraggingWrapper>;

export const SimpleWithClientSideSorting: Story = {
  args: {
    // ts issue
    // https://github.com/TanStack/table/issues/4382
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rows: makeData(6),
    isMovable: true,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    renderComponent: (el: FolderItemType) => {
      console.log(el);
      return (
        <Dense
          creator={el.creator?.name}
          name={el.name}
          content={el.description ?? ''}
          fullWidth
          footer={<ItemBadges isCollapsible isHidden />}
        />
      );
    },
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
};

// export const DisableBetweenDrag: Story = {
//   args: {
//     // ts issue
//     // https://github.com/TanStack/table/issues/4382
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     columns: columns as any,
//     pageSize: 6,
//     page: 0,
//     data: makeData(6),
//     isMovable: true,
//     onClick: (e) => {
//       console.log('click', e);
//     },
//     disableClicking: ['blank'],
//     enableMoveInBetween: false,
//     // tableHeight: 300,
//     // columnDefs: [
//     //   {
//     //     field: 'name',
//     //     headerName: 'Name',
//     //     headerCheckboxSelection: true,
//     //     checkboxSelection: true,
//     //     // rowDrag: true,
//     //   },
//     //   {
//     //     field: 'type',
//     //     headerName: 'Type',
//     //     type: 'rightAligned',
//     //     suppressSizeToFit: true,
//     //     maxWidth: 80,
//     //   },
//     //   {
//     //     field: 'updatedAt',
//     //     headerName: 'Updated At',
//     //     type: 'rightAligned',
//     //     suppressSizeToFit: true,
//     //     maxWidth: 160,
//     //     valueFormatter: dateFormatter,
//     //   },
//     //   {
//     //     field: 'actions',
//     //     headerName: 'Actions',
//     //     suppressSizeToFit: true,
//     //     maxWidth: 100, // approx 50 per iconButton (40px + 8px margin on each side)
//     //     cellRenderer: ({ data }: { data: { id: string } }) => {
//     //       return (
//     //         <>
//     //           <DeleteButton id={'delete' + data.id} />
//     //           <EditButton />
//     //         </>
//     //       );
//     //     },
//     //   },
//     // ],
//     // rowData,
//   },
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);

//     // we need to wait a lot because it is ag grid that triggers
//     await waitFor(async () => {
//       await expect(canvas.getAllByRole('row')).toBeTruthy();
//     });

//     await waitFor(async () => {
//       await expect(canvas.getByText('name 1')).toBeTruthy();
//     });
//     // check mouse onclick trigger event
//     //   await userEvent.click(canvas.getByText('name 1'));
//     //   await waitFor(async () => {
//     //     await expect(args.onCellClicked).toHaveBeenCalledTimes(1);
//     //   });

//     //   // check keyboard navigation
//     //   await userEvent.keyboard('{Tab}{Enter}');
//     //   await waitFor(async () => {
//     //     await expect(args.onCellClicked).toHaveBeenCalledTimes(2);
//     //   });

//     //   await userEvent.keyboard('{Tab}{Enter}');
//     //   await waitFor(async () => {
//     //     await expect(args.onCellClicked).toHaveBeenCalledTimes(3);
//     //   });

//     //   await userEvent.keyboard('{Tab}{Enter}');
//     //   await waitFor(async () => {
//     //     await expect(args.onCellClicked).toHaveBeenCalledTimes(4);
//     //   });

//     // ag grid does not simulate the tab navigation correctly
//     // so we cannot test inner navigation
//   },
// };

// export const ShowCheckbox: Story = {
//   args: {
//     // ts issue
//     // https://github.com/TanStack/table/issues/4382
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     columns: columns as any,
//     pageSize: 6,
//     page: 0,
//     data: makeData(6),
//     isMovable: true,
//     onClick: (e) => {
//       console.log('click', e);
//     },
//     isChecked: (el) => el.age < 20,
//     showCheckbox: true,
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     onCheckboxClick: (e: any, row: any) => {
//       console.log(e.target.checked, row);
//     },
//     // tableHeight: 300,
//     // columnDefs: [
//     //   {
//     //     field: 'name',
//     //     headerName: 'Name',
//     //     headerCheckboxSelection: true,
//     //     checkboxSelection: true,
//     //     // rowDrag: true,
//     //   },
//     //   {
//     //     field: 'type',
//     //     headerName: 'Type',
//     //     type: 'rightAligned',
//     //     suppressSizeToFit: true,
//     //     maxWidth: 80,
//     //   },
//     //   {
//     //     field: 'updatedAt',
//     //     headerName: 'Updated At',
//     //     type: 'rightAligned',
//     //     suppressSizeToFit: true,
//     //     maxWidth: 160,
//     //     valueFormatter: dateFormatter,
//     //   },
//     //   {
//     //     field: 'actions',
//     //     headerName: 'Actions',
//     //     suppressSizeToFit: true,
//     //     maxWidth: 100, // approx 50 per iconButton (40px + 8px margin on each side)
//     //     cellRenderer: ({ data }: { data: { id: string } }) => {
//     //       return (
//     //         <>
//     //           <DeleteButton id={'delete' + data.id} />
//     //           <EditButton />
//     //         </>
//     //       );
//     //     },
//     //   },
//     // ],
//     // rowData,
//   },
// };
// export const ShowToolbar: Story = {
//   args: {
//     // ts issue
//     // https://github.com/TanStack/table/issues/4382
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     columns: columns as any,
//     pageSize: 6,
//     page: 0,
//     data: makeData(6),
//     onClick: (e) => {
//       console.log('click', e);
//     },
//     disableClicking: ['blank'],
//     showCheckbox: true,
//     header: (
//       <TableToolbar
//         actions={
//           <IconButton color='secondary'>
//             <Home />
//           </IconButton>
//         }
//         colSpan={columns.length + 1}
//         selected={['2']}
//       />
//     ),
//   },
// };

// export const DefaultSorting: Story = {
//   args: {
//     // ts issue
//     // https://github.com/TanStack/table/issues/4382
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     columns: columns as any,
//     pageSize: 6,
//     page: 0,

//     data: makeData(6),
//     isMovable: true,
//     onClick: (e) => {
//       console.log('click', e);
//     },
//     disableClicking: ['blank'],
//     showCheckbox: true,
//   },
//   render: (args) => {
//     const [sorting, setSorting] = useSorting([{ desc: true, id: 'firstName' }]);

//     return (
//       <NewTable
//         {...args}
//         sorting={sorting}
//         onSortingChange={(id: string) => {
//           console.log(id);
//           setSorting(id);
//         }}
//       />
//     );
//   },
// };

// export const Pagination: Story = {
//   args: {
//     // ts issue
//     // https://github.com/TanStack/table/issues/4382
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     columns: columns as any,
//     data: makeData(2),
//     isMovable: true,
//     onClick: (e) => {
//       console.log('click', e);
//     },
//     disableClicking: ['blank'],
//     showCheckbox: true,
//     page: 0,
//     pageSize: 2,
//     totalCount: 6,
//   },
//   render: (args) => {
//     const [sorting, setSorting] = useSorting([{ desc: true, id: 'firstName' }]);

//     return (
//       <NewTable
//         {...args}
//         sorting={sorting}
//         onSortingChange={(id: string) => {
//           console.log(id);
//           setSorting(id);
//         }}
//       />
//     );
//   },
// };

// // export const SimpleWithDrag: Story = {
// //   args: {
// //     tableHeight: 300,
// //     enableDrag: true,
// //     columnDefs: [
// //       {
// //         headerCheckboxSelection: true,
// //         checkboxSelection: true,
// //         field: 'name',
// //         headerName: 'Name',
// //         // rowDrag: true,
// //       },
// //       {
// //         field: 'type',
// //         headerName: 'Type',
// //         type: 'rightAligned',
// //       },
// //       {
// //         field: 'updatedAt',
// //         headerName: 'Updated At',
// //         type: 'rightAligned',
// //         valueFormatter: dateFormatter,
// //       },
// //     ],
// //     rowData,
// //   },
// // };

// // export const Empty: Story = {
// //   args: {
// //     tableHeight: 300,
// //     columnDefs: [
// //       {
// //         headerCheckboxSelection: true,
// //         checkboxSelection: true,
// //         field: 'name',
// //         headerName: 'Name',
// //       },
// //       {
// //         field: 'type',
// //         headerName: 'Type',
// //         type: 'rightAligned',
// //         flex: 2,
// //       },
// //       {
// //         field: 'updatedAt',
// //         headerName: 'Updated At',
// //         flex: 3,
// //         type: 'rightAligned',
// //         valueFormatter: dateFormatter,
// //       },
// //     ],
// //     rowData: [],
// //   },
// // };
