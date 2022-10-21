import { ComponentMeta, ComponentStory } from '@storybook/react';

import Typography from '@mui/material/Typography';

import React from 'react';

import DrawerHeader from './DrawerHeader';

export default {
  title: 'Common/DrawerHeader',
  component: DrawerHeader,

  argTypes: {
    handleDrawerClose: {
      action: 'clicked',
    },
  },
} as ComponentMeta<typeof DrawerHeader>;

const Template: ComponentStory<typeof DrawerHeader> = (args) => (
  <DrawerHeader {...args}>
    <Typography>My Title</Typography>
  </DrawerHeader>
);

export const Example = Template.bind({});
Example.args = {};
