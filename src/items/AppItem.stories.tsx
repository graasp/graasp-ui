import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';

import { AppItemType, ItemType, convertJs } from '@graasp/sdk';

import { MOCK_MEMBER } from '../utils/fixtures';
import { TABLE_CATEGORIES } from '../utils/storybook';
import AppItem from './AppItem';

const meta: Meta<typeof AppItem> = {
  title: 'Items/AppItem',
  component: AppItem,

  argTypes: {
    saveButtonId: {
      table: {
        category: TABLE_CATEGORIES.SELECTORS,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof AppItem>;

export const Example: Story = {
  args: {
    item: convertJs<AppItemType>({
      name: 'my app',
      id: 'item-id',
      description: 'item-description',
      extra: {
        [ItemType.APP]: {
          url: 'https://graasp.org',
        },
      },
      type: 'app',
      path: 'item-path',
      settings: {},
      creator: MOCK_MEMBER,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  },
};

Example.play = async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);
  if (args.item.description) {
    await expect(canvas.getByText(args.item.description)).toBeInTheDocument();
  }
  await expect(canvas.getByTitle(args.item.name)).toBeInTheDocument();
};
