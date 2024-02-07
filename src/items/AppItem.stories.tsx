import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';

import { DEFAULT_LANG, ItemType } from '@graasp/sdk';

import { MOCK_MEMBER } from '../utils/fixtures';
import AppItem from './AppItem';

const meta: Meta<typeof AppItem> = {
  title: 'Items/AppItem',
  component: AppItem,
};

export default meta;

type Story = StoryObj<typeof AppItem>;

export const Example: Story = {
  args: {
    item: {
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
      lang: DEFAULT_LANG,
      creator: MOCK_MEMBER,
      createdAt: '2023-09-06T11:50:32.894Z',
      updatedAt: '2023-09-06T11:50:32.894Z',
    },
  },
};

Example.play = async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);
  if (args.item.description) {
    await expect(canvas.getByText(args.item.description)).toBeInTheDocument();
  }
  await expect(canvas.getByTitle(args.item.name)).toBeInTheDocument();
};
