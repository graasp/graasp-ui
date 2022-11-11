import { expect } from '@storybook/jest';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { RecordOf } from 'immutable';

import React from 'react';

import { Item, ItemType } from '@graasp/sdk';

import {
  EmbeddedLinkItemExtra,
  ImmutableItem,
  ImmutableMember,
} from '../types';
import { TABLE_CATEGORIES } from '../utils/storybook';
import LinkItem from './LinkItem';

const item = new ImmutableItem({
  id: 'item-id',
  name: 'item-name',
  type: ItemType.LINK,
  path: 'item_id',
  extra: {
    [ItemType.LINK]: {
      url: 'https://graasp.org',
    },
  },
  creator: 'creator',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  description: 'my link description',
}) as RecordOf<Item<EmbeddedLinkItemExtra>>;

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
} as ComponentMeta<typeof LinkItem>;

const Template: ComponentStory<typeof LinkItem> = (args) => (
  <LinkItem {...args} />
);

export const Iframe = Template.bind({});
Iframe.args = {
  item,
  isResizable: true,
  showButton: false,
  showIframe: true,
  member: new ImmutableMember({ id: 'link-iframe-id' }),
};
Iframe.play = async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);

  expect(canvas.getByText(args.item.description)).toBeInTheDocument();
  expect(canvas.getByTitle(args.item.name)).toBeInTheDocument();
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
  expect(canvas.getByTitle(args.item.name)).toBeInTheDocument();
  await userEvent.click(canvas.getByText(args.item.name));
};
