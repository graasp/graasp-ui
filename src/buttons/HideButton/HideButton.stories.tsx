import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import { ActionButton } from '../../types';
import { TABLE_CATEGORIES } from '../../utils/storybook';
import HideButton from './HideButton';

export default {
  title: 'Buttons/HideButton',
  component: HideButton,

  argTypes: {
    color: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    onClick: {
      action: 'hide',
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
  },
} as ComponentMeta<typeof HideButton>;

const Template: ComponentStory<typeof HideButton> = (args) => (
  <HideButton {...args} />
);

export const IsHidden = Template.bind({});
IsHidden.args = {
  isHidden: true,
};

export const Icon = Template.bind({});
Icon.args = {
  type: ActionButton.ICON_BUTTON,
};

export const MenuItem = Template.bind({});
MenuItem.args = {
  type: ActionButton.MENU_ITEM,
};
