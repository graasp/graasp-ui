import { ComponentMeta, ComponentStory } from '@storybook/react';

import AcUnitIcon from '@mui/icons-material/AcUnit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import React from 'react';

import MenuItem from '../MainMenu/MenuItem';
import { TABLE_CATEGORIES } from '../utils/storybook';
import ItemMenu from './ItemMenu';

export default {
  title: 'Common/ItemMenu',
  component: ItemMenu,
  subcomponents: { MenuItem },

  argTypes: {
    children: {
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
  },
} as ComponentMeta<typeof ItemMenu>;

const Template: ComponentStory<typeof ItemMenu> = (args) => (
  <ItemMenu {...args}>{args.children}</ItemMenu>
);

export const Example = Template.bind({});
Example.args = {
  openMenuText: 'Open Menu',
  children: (
    <>
      <MenuItem text='Item 1' icon={<AcUnitIcon />} />
      <MenuItem text='Item 2' icon={<AddCircleIcon />} />
      <MenuItem text='Item 3' icon={<AutoAwesomeIcon />} />
    </>
  ),
};
