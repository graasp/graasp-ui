import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import { TABLE_CATEGORIES } from '../../utils/storybook';
import RecycleButton from './RecycleButton';

export default {
  title: 'Buttons/RecycleButton',
  component: RecycleButton,

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
} as ComponentMeta<typeof RecycleButton>;

const Template: ComponentStory<typeof RecycleButton> = (args) => (
  <RecycleButton {...args}>{args.children}</RecycleButton>
);

export const Icon = Template.bind({});
Icon.args = {
  color: 'primary',
  type: 'icon',
  text: 'Delete',
};

export const MenuItem = Template.bind({});
MenuItem.args = {
  type: 'menuItem',
};
