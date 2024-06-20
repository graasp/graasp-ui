import type { Meta, StoryObj } from '@storybook/react';

import UploadFileButton from './UploadFileButton';

const meta: Meta<typeof UploadFileButton> = {
  title: 'Buttons/UploadFileButton',
  component: UploadFileButton,
};

export default meta;

type Story = StoryObj<typeof UploadFileButton>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};
