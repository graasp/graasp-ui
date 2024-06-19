import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '@mui/material';

import FileDropperWrapper from './FileDropper';

const meta = {
  title: 'Common/FileDropper',
  component: FileDropperWrapper,

  argTypes: {},
} satisfies Meta<typeof FileDropperWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onDrop: () => {
      console.log('drop');
    },
  },
  decorators: (story) => {
    return <Box height='400px'>{story()}</Box>;
  },
} satisfies Story;
