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

export const ImageOnly: Story = {
  args: { accept: 'image/*', text: 'Upload one image' },
};

export const ImageMultipleOnly: Story = {
  args: { accept: 'image/*', multiple: true, text: 'Upload many images' },
};

export const H5pOnly: Story = {
  args: {
    accept: '.h5p',
    multiple: true,
    text: 'Upload an H5P file',
  },
};
