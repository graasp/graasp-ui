import type { Meta, StoryObj } from '@storybook/react';

import Typography from '@mui/material/Typography';

import DrawerHeader from './DrawerHeader';

const meta: Meta<typeof DrawerHeader> = {
  title: 'Common/DrawerHeader',
  component: DrawerHeader,

  argTypes: {
    handleDrawerClose: {
      action: 'clicked',
    },
  },

  render: (args) => (
    <DrawerHeader {...args}>
      <Typography>My Title</Typography>
    </DrawerHeader>
  ),
};

export default meta;

type Story = StoryObj<typeof DrawerHeader>;

export const Example: Story = {
  args: {},
};
