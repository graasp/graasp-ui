import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import LinkItem from './LinkItem';
import { RecordOf } from 'immutable';
import { Item, ItemType } from '@graasp/sdk';
import { EmbeddedLinkItemExtra, ImmutableItemClass } from '../types';
import { TABLE_CATEGORIES } from '../utils/storybook';

const item = new ImmutableItemClass({
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
  settings: {},
  description: 'my link description',
}) as RecordOf<Item<EmbeddedLinkItemExtra>>;

export default {
  title: 'LinkItem',
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
};

export const LinkButton = Template.bind({});
LinkButton.args = {
  item,
  showButton: true,
  showIframe: false,
};

export const IframeAndLinkButton = Template.bind({});
IframeAndLinkButton.args = {
  item,
  showButton: true,
};
