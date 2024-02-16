import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import {
  EmbeddedLinkItemFactory,
  EmbeddedLinkItemType,
  ItemType,
} from '@graasp/sdk';

import { MOCK_MEMBER } from '../utils/fixtures';
import { TABLE_CATEGORIES } from '../utils/storybook';
import LinkItem from './LinkItem';

const item: EmbeddedLinkItemType = EmbeddedLinkItemFactory({
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
  description: 'my link description',
});

const itemWithHTMLDescription = EmbeddedLinkItemFactory({
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
  creator: MOCK_MEMBER,
  createdAt: '2023-09-06T11:50:32.894Z',
  updatedAt: '2023-09-06T11:50:32.894Z',
  description:
    '<p class="ql-align-center">I am centered</p><p>I am left aligned</p><p class="ql-align-right">I am right aligned</p><p class="ql-align-right"><span class="ql-emojiblot" data-name="smiling_imp">﻿<span contenteditable="false"><span class="ap ap-smiling_imp">😈</span></span>﻿</span></p><p class="ql-align-right">I <span style="background-color: rgb(204, 224, 245);">have</span> a <span style="background-color: rgb(194, 133, 255);">background</span></p><p class="ql-align-center"><a href="https://www.google.com" rel="noopener noreferrer" target="_blank">Test link</a></p><p><s>Hey !</s></p><p><strong class="ql-font-serif"><s>Wow</s></strong></p><p><br></p><pre class="ql-syntax" spellcheck="false">Some code too !\n</pre>',
});

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
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    if (args.item.description) {
      expect(canvas.getByText(args.item.description)).toBeInTheDocument();
    }
    await userEvent.click(canvas.getByText(args.item.name));
  },
};

export const LinkWithDescription = {
  args: {
    item: itemWithHTMLDescription,
  },
} satisfies Story;

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
