import type { Meta, StoryObj } from '@storybook/react';

import AcUnitIcon from '@mui/icons-material/AcUnit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import React from 'react';

import { TABLE_CATEGORIES } from '../utils/storybook';
import MainMenu from './MainMenu';
import MenuItem from './MenuItem';

const meta: Meta<typeof MainMenu> = {
  title: 'Common/MainMenu',
  component: MainMenu,

  argTypes: {
    children: {
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
  },
  render: (args) => <MainMenu {...args}>{args.children}</MainMenu>,
};
export default meta;

type Story = StoryObj<typeof MainMenu>;

export const Example: Story = {
  args: {
    children: (
      <>
        <MenuItem text='Item 1' icon={<AcUnitIcon />} />
        <MenuItem text='Item 2' icon={<AddCircleIcon />} />
        <MenuItem text='Item 3' icon={<AutoAwesomeIcon />} />
      </>
    ),
  },
};
