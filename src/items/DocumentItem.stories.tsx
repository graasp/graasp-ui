import { StoryObj } from '@storybook/react';

import { ItemType, convertJs } from '@graasp/sdk';

import TextEditor from '../TextEditor';
import { TABLE_CATEGORIES } from '../utils/storybook';
import DocumentItem from './DocumentItem';

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

  argTypes: {
    onSave: {
      action: 'onSave',
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
    onCancel: {
      action: 'onCancel',
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
    saveButtonId: {
      table: {
        category: TABLE_CATEGORIES.SELECTORS,
      },
    },
    cancelButtonId: {
      table: {
        category: TABLE_CATEGORIES.SELECTORS,
      },
    },
  },
};

type Story = StoryObj<typeof DocumentItem>;

export const Editing: Story = {
  args: {
    item: convertJs(item),
    edit: true,
  },
};

export const EmptyMessage: Story = {
  args: {
    item: convertJs({
      ...item,
      extra: {
        [ItemType.DOCUMENT]: {
          content: '',
        },
      },
    }),
    showEmpty: true,
  },
};
