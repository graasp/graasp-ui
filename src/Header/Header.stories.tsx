import { ComponentMeta, ComponentStory } from '@storybook/react';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import React from 'react';

import { TABLE_CATEGORIES } from '../utils/storybook';
import Header from './Header';

export default {
  title: 'Common/Header',
  component: Header,

  argTypes: {
    id: {
      table: {
        category: TABLE_CATEGORIES.SELECTORS,
      },
    },
    sx: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    handleDrawerOpen: { action: 'open' },
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Example = Template.bind({});
Example.args = {
  hasSidebar: true,
  leftContent: <Typography sx={{ ml: 2 }}>Header</Typography>,
  rightContent: <Avatar sx={{ mr: 2 }}>H</Avatar>,
  centerContent: <Typography sx={{ ml: 2 }}>Title</Typography>,
};
