import { Meta, type StoryObj } from '@storybook/react';
import { expect, fn } from '@storybook/test';
import { userEvent, within } from '@storybook/testing-library';

import { TABLE_CATEGORIES } from '@/utils/storybook.js';

import RowMenu from './RowMenu.js';

const item = { id: 'element-1', name: 'element-1', path: 'element_1' };

const meta = {
  title: 'Common/Tree/RowMenu',
  component: RowMenu,

  args: {
    onClick: fn(),
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
  },
} satisfies Meta<typeof RowMenu>;
export default meta;

type Story = StoryObj<typeof RowMenu>;

export const Default = {
  args: {
    item,
    selectedId: item.id,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const el = canvas.getByText(args.item.name);
    expect(el).toBeVisible();
    await userEvent.click(el);
    expect(args.onClick).toHaveBeenCalled();
  },
} satisfies Story;
