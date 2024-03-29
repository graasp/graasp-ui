import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';

import {
  AppItemFactory,
  Context,
  ItemType,
  PermissionLevel,
} from '@graasp/sdk';

import { MOCK_MEMBER } from '../utils/fixtures';
import AppItem from './AppItem';

const meta = {
  title: 'Items/AppItem',
  component: AppItem,
} satisfies Meta<typeof AppItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example = {
  args: {
    item: AppItemFactory({
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
    }),
    requestApiAccessToken: async () => ({ token: 'token' }),
    contextPayload: {
      apiHost: 'apiHost',
      itemId: 'itemId',
      settings: {},
      permission: PermissionLevel.Read,
      lang: 'en',
      context: Context.Library,
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    if (args.item.description) {
      await expect(canvas.getByText(args.item.description)).toBeInTheDocument();
    }
    await expect(canvas.getByTitle(args.item.name)).toBeInTheDocument();
  },
} satisfies Story;
