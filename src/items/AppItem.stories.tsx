import { expect } from '@storybook/jest';
import { Meta, StoryFn } from '@storybook/react';
import { within } from '@storybook/testing-library';

import React from 'react';

import { AppItemType, ItemType, convertJs } from '@graasp/sdk';

import { TABLE_CATEGORIES } from '../utils/storybook';
import AppItem from './AppItem';

export default {
  title: 'Items/AppItem',
  component: AppItem,

  argTypes: {
    id: {
      table: {
        category: TABLE_CATEGORIES.SELECTORS,
      },
    },
    saveButtonId: {
      table: {
        category: TABLE_CATEGORIES.SELECTORS,
      },
    },
  },
} as Meta<typeof AppItem>;

const Template: StoryFn<typeof AppItem> = (args) => <AppItem {...args} />;

export const Example = Template.bind({});
Example.args = {
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
    creator: 'mock-member-id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }),
};
Example.play = async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);

  await expect(canvas.getByText(args.item.description)).toBeInTheDocument();
  await expect(canvas.getByTitle(args.item.name)).toBeInTheDocument();
};
