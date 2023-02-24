import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import { ButtonTypeEnum } from '../../types';
import { TABLE_CATEGORIES } from '../../utils/storybook';
import PinButton from './PinButton';

export default {
  title: 'Buttons/PinButton',
  component: PinButton,

  argTypes: {
    color: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    onClick: {
      action: 'pin',
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
  },
} as ComponentMeta<typeof PinButton>;

const Template: ComponentStory<typeof PinButton> = (args) => (
  <PinButton {...args} />
);

export const IsPinned = Template.bind({});
IsPinned.args = {
  isPinned: true,
};

export const Icon = Template.bind({});
Icon.args = {
  type: ButtonTypeEnum.ICON_BUTTON,
};

export const MenuItem = Template.bind({});
MenuItem.args = {
  type: ButtonTypeEnum.MENU_ITEM,
};
