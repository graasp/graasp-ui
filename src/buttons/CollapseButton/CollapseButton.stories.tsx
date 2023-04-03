import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import { ActionButton } from '../../types';
import { TABLE_CATEGORIES } from '../../utils/storybook';
import CollapseButton from './CollapseButton';

export default {
  title: 'Buttons/CollapseButton',
  component: CollapseButton,

  argTypes: {
    color: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    onClick: {
      action: 'collapse',
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
  },
} as ComponentMeta<typeof CollapseButton>;

const Template: ComponentStory<typeof CollapseButton> = (args) => (
  <CollapseButton {...args} />
);

export const IsUncollapsed = Template.bind({});
IsUncollapsed.args = {
  isCollapsed: false,
};

export const Icon = Template.bind({});
Icon.args = {
  type: ActionButton.ICON_BUTTON,
};

export const MenuItem = Template.bind({});
MenuItem.args = {
  type: ActionButton.MENU_ITEM,
};
