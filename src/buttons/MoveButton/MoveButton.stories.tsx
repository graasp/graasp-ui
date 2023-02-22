import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import { ButtonTypeEnum } from '../../types';
import { TABLE_CATEGORIES } from '../../utils/storybook';
import MoveButton from './MoveButton';

export default {
  title: 'Buttons/MoveButton',
  component: MoveButton,

  argTypes: {
    color: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    onClick: {
      action: 'move',
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
  },
} as ComponentMeta<typeof MoveButton>;

const Template: ComponentStory<typeof MoveButton> = (args) => (
  <MoveButton {...args} />
);

export const MenuItem = Template.bind({});
MenuItem.args = {
  type: ButtonTypeEnum.MENU_ITEM,
};

export const Icon = Template.bind({});
Icon.args = {
  type: ButtonTypeEnum.ICON_BUTTON,
};
