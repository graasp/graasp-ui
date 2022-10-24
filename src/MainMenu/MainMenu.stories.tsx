import { ComponentMeta, ComponentStory } from '@storybook/react';

import AcUnitIcon from '@mui/icons-material/AcUnit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import React from 'react';

import { TABLE_CATEGORIES } from '../utils/storybook';
import MainMenu from './MainMenu';
import MenuItem from './MenuItem';

export default {
  title: 'Common/MainMenu',
  component: MainMenu,
  subcomponents: { MenuItem },

  argTypes: {
    children: {
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
  },
} as ComponentMeta<typeof MainMenu>;

const Template: ComponentStory<typeof MainMenu> = (args) => (
  <MainMenu {...args}>{args.children}</MainMenu>
);

export const Example = Template.bind({});
Example.args = {
  children: (
    <>
      <MenuItem text='Item 1' icon={<AcUnitIcon />} />
      <MenuItem text='Item 2' icon={<AddCircleIcon />} />
      <MenuItem text='Item 3' icon={<AutoAwesomeIcon />} />
    </>
  ),
};
