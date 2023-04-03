import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import { TABLE_CATEGORIES } from '../../utils/storybook';
import ShortcutButton from './ShortcutButton';

export default {
  title: 'Buttons/ShortcutButton',
  component: ShortcutButton,

  argTypes: {
    iconClassName: {
      table: {
        category: TABLE_CATEGORIES.SELECTORS,
      },
    },
    id: {
      table: {
        category: TABLE_CATEGORIES.SELECTORS,
      },
    },
    menuItemClassName: {
      table: {
        category: TABLE_CATEGORIES.SELECTORS,
      },
    },
    color: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },

    onClick: {
      action: 'clicked',
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
  },
} as ComponentMeta<typeof ShortcutButton>;

const Template: ComponentStory<typeof ShortcutButton> = (args) => (
  <ShortcutButton {...args}>{args.children}</ShortcutButton>
);

export const Icon = Template.bind({});
Icon.args = {
  color: 'primary',
  type: 'icon',
  text: 'Create Shortcut',
};

export const MenuItem = Template.bind({});
MenuItem.args = {
  type: 'menuItem',
};
