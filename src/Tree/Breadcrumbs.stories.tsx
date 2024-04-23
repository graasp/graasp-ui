import { TABLE_CATEGORIES } from '@/utils/storybook';
import { expect } from '@storybook/jest';
import { Meta, type StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import Breadcrumbs from './Breadcrumbs';

const elements = [
  { id: 'element-1', name: 'element-1', path: 'element_1' },
  { id: 'element-2', name: 'element-2', path: 'element_2' },
  { id: 'element-3', name: 'element-3', path: 'element_3' },
];

const meta = {
  title: 'Common/Tree/Breadcrumbs',
  component: Breadcrumbs,

  argTypes: {
    onSelect: {
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
      action: 'onselect',
    },
  },
} satisfies Meta<typeof Breadcrumbs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    elements,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const el = canvas.getByText(args.elements[0].name);
    expect(el).toBeVisible();
    await userEvent.click(el);
    expect(args.onSelect).toHaveBeenCalled();
  },
} satisfies Story;
