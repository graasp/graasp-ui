import { TABLE_CATEGORIES } from '@/utils/storybook';
import { type Meta, type StoryObj } from '@storybook/react';

import { Box } from '@mui/material';

import { BrowserRouter } from 'react-router-dom';

import { FolderItemFactory, FolderItemType } from '@graasp/sdk';

import { Card, ItemBadges } from '..';
import DraggingWrapper from './DraggingWrapper';

const makeData = (len: number): FolderItemType[] => {
  return Array.from({ length: len }, () => FolderItemFactory());
};

const meta: Meta<typeof DraggingWrapper> = {
  title: 'Common/Draggable',
  component: DraggingWrapper,
  decorators: [
    (story) => {
      return <BrowserRouter>{story()}</BrowserRouter>;
    },
  ],

  argTypes: {
    onDropInRow: {
      action: 'on drop in row',

      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
    onDropBetweenRow: {
      action: 'on drop between rows',

      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof DraggingWrapper>;

export const Default = {
  args: {
    rows: makeData(6),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    renderComponent: (el: FolderItemType, { isDragging, isOver }) => {
      return (
        <Card
          dense
          alt={el.name}
          creator={el.creator?.name}
          name={el.name}
          content={el.description?.slice(0, 55) ?? ''}
          fullWidth
          footer={<ItemBadges isCollapsible isHidden />}
          to={el.name}
          isDragging={isDragging}
          isOver={isOver}
        />
      );
    },
  },
} satisfies Story;

export const DisableDragging = {
  args: {
    rows: makeData(6),
    isMovable: () => false,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    renderComponent: (el: FolderItemType) => {
      return (
        <Card
          dense
          alt={el.name}
          creator={el.creator?.name}
          name={el.name}
          content={el.description ?? ''}
          fullWidth
          footer={<ItemBadges isCollapsible isHidden />}
        />
      );
    },
  },
} satisfies Story;

export const DynamicCanDrop = {
  args: {
    rows: makeData(6),
    canDrop: (el) => {
      if (el && 'name' in el) {
        return (el.name as string).length > 10;
      }
      return false;
    },

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    renderComponent: (el: FolderItemType, { isDragging, isOver }) => {
      return (
        <Card
          sx={{
            background: isOver ? 'red' : 'none',

            opacity: isDragging ? 0.5 : 1,
          }}
          dense
          alt={el.name}
          creator={el.creator?.name}
          name={el.name}
          content={el.description ?? ''}
          fullWidth
          footer={<ItemBadges isCollapsible isHidden />}
        />
      );
    },
  },
} satisfies Story;

export const DynamicIsMovable = {
  args: {
    rows: makeData(6),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    isMovable: (el: { name: string }) => {
      return el.name.length > 20;
    },

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    renderComponent: (
      el: FolderItemType,
      { isDragging, isOver, isMovable },
    ) => {
      return (
        <Card
          sx={{
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: isOver ? 'red' : 'none',
            opacity: isDragging ? 0.5 : 1,
            background: isMovable ? 'inherit' : 'lightgrey',
          }}
          dense
          alt={el.name}
          creator={el.creator?.name}
          name={el.name}
          content={el.description ?? ''}
          fullWidth
          footer={<ItemBadges isCollapsible isHidden />}
        />
      );
    },
  },
} satisfies Story;

export const Columns = {
  args: {
    rows: makeData(6),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    isMovable: (el: { name: string }) => {
      return el.name.length > 20;
    },
    xs: 6,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    renderComponent: (
      el: FolderItemType,
      { isDragging, isOver, isMovable },
    ) => {
      return (
        <Box px={1}>
          <Card
            sx={{
              borderStyle: 'solid',
              borderWidth: '1px',
              boxSizing: 'border-box',
              borderColor: isOver ? 'red' : 'none',
              opacity: isDragging ? 0.5 : 1,
              background: isMovable ? 'inherit' : 'lightgrey',
            }}
            dense
            alt={el.name}
            creator={el.creator?.name}
            name={el.name}
            content={el.description ?? ''}
            fullWidth
            footer={<ItemBadges isCollapsible isHidden />}
          />
        </Box>
      );
    },
  },
} satisfies Story;
