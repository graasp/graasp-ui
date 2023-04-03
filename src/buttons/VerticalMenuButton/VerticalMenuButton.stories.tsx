import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import { ActionButton } from '../../types';
import { TABLE_CATEGORIES } from '../../utils/storybook';
import VerticalMenuButton from './VerticalMenuButton';

export default {
  title: 'Buttons/VerticalMenuButton',
  component: VerticalMenuButton,

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
} as ComponentMeta<typeof VerticalMenuButton>;

const Template: ComponentStory<typeof VerticalMenuButton> = (args) => (
  <VerticalMenuButton {...args} />
);

export const IsOpen = Template.bind({});
IsOpen.args = {
  isOpen: false,
  openText: 'Open menu',
  closeText: '',
};

export const Icon = Template.bind({});
Icon.args = {
  type: ActionButton.ICON_BUTTON,
};
