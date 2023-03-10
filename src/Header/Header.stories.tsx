import { ComponentMeta, ComponentStory } from '@storybook/react';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import React from 'react';

import { Context } from '@graasp/sdk';

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

export const Builder = Template.bind({});
Builder.args = {
  ...Example.args,
  context: Context.BUILDER,
};

export const Player = Template.bind({});
Player.args = {
  ...Example.args,
  context: Context.PLAYER,
};

export const Library = Template.bind({});
Library.args = {
  ...Example.args,
  context: Context.LIBRARY,
};

export const Analytics = Template.bind({});
Analytics.args = {
  ...Example.args,
  context: Context.ANALYTICS,
};
