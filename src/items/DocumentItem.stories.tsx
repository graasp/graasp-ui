import { StoryObj } from '@storybook/react';

import { ItemType } from '@graasp/sdk';

import TextEditor from '../TextEditor/TextEditor.js';
import DocumentItem from './DocumentItem.js';

const item = {
  id: 'item-id',
  name: 'item-name',
  type: ItemType.DOCUMENT,
  path: 'item_id',
  extra: {
    [ItemType.DOCUMENT]: {
      content: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a neque massa. Sed eget lacinia leo. Fusce non nibh ac ante volutpat volutpat. Donec lacinia est et turpis laoreet semper. Nam tellus ante, consequat luctus erat sed, suscipit volutpat justo. Phasellus sollicitudin, nibh ac pretium blandit, odio magna dapibus leo, non commodo arcu augue eu odio. Phasellus nisl odio, ornare in diam et, convallis vestibulum dui. Sed elit justo, pharetra vitae sapien vel, pretium sollicitudin odio.</p>`,
    },
  },
  creator: 'creator',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  description: 'my document description',
};

export default {
  title: 'Items/DocumentItem',
  component: DocumentItem,
  subcomponents: { TextEditor },
};

type Story = StoryObj<typeof DocumentItem>;

export const Editing: Story = {
  args: {
    item,
  },
};

export const EmptyMessage: Story = {
  args: {
    item: {
      ...item,
      extra: {
        [ItemType.DOCUMENT]: {
          content: '',
        },
      },
    },
    showEmpty: true,
  },
};
