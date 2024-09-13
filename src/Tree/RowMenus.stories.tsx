import { Meta, type StoryObj } from '@storybook/react';
import { expect, fn } from '@storybook/test';
import { userEvent, within } from '@storybook/testing-library';

import { Box } from '@mui/material';

import { TABLE_CATEGORIES } from '@/utils/storybook.js';

import RowMenus from './RowMenus.js';

const elements = [
  { id: 'element-1', name: 'element-1', path: 'element_1' },
  { id: 'element-2', name: 'element-2', path: 'element_2' },
  { id: 'element-3', name: 'element-3', path: 'element_3' },
];

const meta = {
  title: 'Common/Tree/RowMenus',
  component: RowMenus,

  args: {
    onClick: fn(),
    setPage: fn(),
  },
  argTypes: {
    onNavigate: {
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
      action: 'on navigate',
    },
    onClick: {
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
      action: 'on click',
    },
    setPage: {
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
      action: 'set page',
    },
  },
} satisfies Meta<typeof RowMenus>;

export default meta;

type Story = StoryObj<typeof RowMenus>;

export const Default = {
  args: {
    elements,
    selectedId: elements[0].id,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const el = canvas.getByText(args.elements![0].name);
    expect(el).toBeVisible();
    await userEvent.click(el);
    expect(args.onClick).toHaveBeenCalled();
  },
} satisfies Story;

export const WithPages = {
  args: {
    elements,
    page: 2,
    nbPages: 3,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const el = canvas.getByText(args.elements![0].name);
    expect(el).toBeVisible();
    await userEvent.click(el);
    expect(args.onClick).toHaveBeenCalled();

    const pageEl = canvas.getByText('1');
    await userEvent.click(pageEl);
    expect(args.setPage).toHaveBeenCalled();
  },
} satisfies Story;

export const Empty = {
  args: {
    elements: [],
    emptyContent: <Box>I am empty</Box>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const el = canvas.getByText('I am empty');
    expect(el).toBeVisible();
  },
} satisfies Story;
