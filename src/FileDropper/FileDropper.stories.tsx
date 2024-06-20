import { TABLE_CATEGORIES } from '@/utils/storybook';
import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '@mui/material';

import FileDropperWrapper from './FileDropper';

const meta = {
  title: 'Common/FileDropper',
  component: FileDropperWrapper,

  argTypes: {
    onChange: {
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
      action: 'on change',
    },
    onDrop: {
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
      action: 'on drop',
    },
  },
} satisfies Meta<typeof FileDropperWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (story) => {
      return <Box height='400px'>{story()}</Box>;
    },
  ],
} satisfies Story;

export const Error: Story = {
  args: {
    error: 'You cannot upload more than 10 files at a time',
    hints: 'Max 15GB',
  },
  decorators: [
    (story) => {
      return <Box height='400px'>{story()}</Box>;
    },
  ],
} satisfies Story;
