import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import { TABLE_CATEGORIES } from '../../utils/storybook';
import CopyButton from './CopyButton';

export default {
  title: 'Buttons/CopyButton',
  component: CopyButton,

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
} as ComponentMeta<typeof CopyButton>;

const Template: ComponentStory<typeof CopyButton> = (args) => (
  <CopyButton {...args}>{args.children}</CopyButton>
);

export const Icon = Template.bind({});
Icon.args = {
  color: 'primary',
  type: 'icon',
  text: 'Copier',
};

export const MenuItem = Template.bind({});
MenuItem.args = {
  type: 'menuItem',
};
