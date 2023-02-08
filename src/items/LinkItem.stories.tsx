import { expect } from '@storybook/jest';
import { Meta, StoryFn } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import React from 'react';

import { ItemType, convertJs } from '@graasp/sdk';
import { EmbeddedLinkItemTypeRecord } from '@graasp/sdk/frontend';

import { TABLE_CATEGORIES } from '../utils/storybook';
import LinkItem from './LinkItem';

const item: EmbeddedLinkItemTypeRecord = convertJs({
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
  creator: 'creator',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  description: 'my link description',
});

export default {
  title: 'Items/LinkItem',
  component: LinkItem,

  argTypes: {
    onSaveCaption: {
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
  },
} as Meta<typeof LinkItem>;

const Template: StoryFn<typeof LinkItem> = (args) => <LinkItem {...args} />;

export const Iframe = Template.bind({});
Iframe.args = {
  item,
  isResizable: true,
  showButton: false,
  showIframe: true,
  memberId: 'link-iframe-id',
};
Iframe.play = async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);

  expect(canvas.getByText(args.item.description)).toBeInTheDocument();
  expect(canvas.getByText(args.item.name)).toBeInTheDocument();
};

export const LinkButton = Template.bind({});
LinkButton.args = {
  item,
  showButton: true,
  showIframe: false,
};
LinkButton.play = async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);

  expect(canvas.getByText(args.item.description)).toBeInTheDocument();
  await userEvent.click(canvas.getByText(args.item.name));
};

export const IframeAndLinkButton = Template.bind({});
IframeAndLinkButton.args = {
  item,
  showButton: true,
  showIframe: true,
};

IframeAndLinkButton.play = async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);

  expect(canvas.getByText(args.item.description)).toBeInTheDocument();
  expect(canvas.getByText(args.item.name)).toBeInTheDocument();
  await userEvent.click(canvas.getByText(args.item.name));
};
