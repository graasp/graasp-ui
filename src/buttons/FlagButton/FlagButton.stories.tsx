import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import { TABLE_CATEGORIES } from '../../utils/storybook';
import FlagButton from './FlagButton';

export default {
  title: 'Buttons/FlagButton',
  component: FlagButton,

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
} as ComponentMeta<typeof FlagButton>;

const Template: ComponentStory<typeof FlagButton> = (args) => (
  <FlagButton {...args}>{args.children}</FlagButton>
);

export const Icon = Template.bind({});
Icon.args = {
  color: 'primary',
  type: 'icon',
  text: 'Flag',
};

export const MenuItem = Template.bind({});
MenuItem.args = {
  type: 'menuItem',
};
