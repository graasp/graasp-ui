import type { Meta, StoryObj } from '@storybook/react';

import ResizingIcon from './ResizingIcon.js';

const meta: Meta<typeof ResizingIcon> = {
  title: 'Icons/ResizingIcon',
  component: ResizingIcon,
};

export default meta;

type Story = StoryObj<typeof ResizingIcon>;

export const Default: Story = {
  args: {},
};
