import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import { EmbeddedLinkItemType, ItemType, Member } from '@graasp/sdk';

import { TABLE_CATEGORIES } from '../utils/storybook';
import LinkItem from './LinkItem';

const item: EmbeddedLinkItemType = {
  id: 'item-id',
  name: 'item-name',
  type: ItemType.LINK,
  path: 'item_id',
  extra: {
    [ItemType.LINK]: {
      thumbnails: [],
      html: '',
      url: 'https://graasp.org',
      icons: [],
    },
  },
  settings: {},
  creator: { id: 'creator-id' } as Member,
  createdAt: new Date(),
  updatedAt: new Date(),
  description: 'my link description',
};

const meta: Meta<typeof LinkItem> = {
  title: 'Items/LinkItem',
  component: LinkItem,

  argTypes: {
    onSaveCaption: {
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof LinkItem>;

export const Iframe: Story = {
  args: {
    item,
    isResizable: true,
    showButton: false,
    showIframe: true,
    memberId: 'link-iframe-id',
  },

  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    if (args.item.description) {
      expect(canvas.getByText(args.item.description)).toBeInTheDocument();
    }
    expect(canvas.getByTitle(args.item.name)).toBeInTheDocument();
  },
};

export const LinkButton: Story = {
  args: {
    item,
    showButton: true,
    showIframe: false,
  },
};

LinkButton.play = async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);
  if (args.item.description) {
    expect(canvas.getByText(args.item.description)).toBeInTheDocument();
  }
  await userEvent.click(canvas.getByText(args.item.name));
};

export const IframeAndLinkButton: Story = {
  args: {
    item,
    showButton: true,
    showIframe: true,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    if (args.item.description) {
      expect(canvas.getByText(args.item.description)).toBeInTheDocument();
    }

    expect(canvas.getByTitle(args.item.name)).toBeInTheDocument();
    await userEvent.click(canvas.getByText(args.item.name));
  },
};
