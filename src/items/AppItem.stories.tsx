import { expect } from '@storybook/jest';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { within } from '@storybook/testing-library';

import React from 'react';

import { AppItemExtra, ItemType } from '@graasp/sdk';

import { ImmutableItemFactory } from '../types';
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
} as ComponentMeta<typeof AppItem>;

const Template: ComponentStory<typeof AppItem> = (args) => (
  <AppItem {...args} />
);

export const Example = Template.bind({});
Example.args = {
  item: ImmutableItemFactory<AppItemExtra>({
    name: 'my app',
    id: 'item-id',
    description: 'item-description',
    extra: {
      [ItemType.APP]: {
        url: 'https://graasp.org',
      },
    },
  }),
};
Example.play = async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);

  await expect(canvas.getByText(args.item.description)).toBeInTheDocument();
  await expect(canvas.getByTitle(args.item.name)).toBeInTheDocument();
};
