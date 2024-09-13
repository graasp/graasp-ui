import type { Meta, StoryObj } from '@storybook/react';
import { expect } from '@storybook/test';
import { within } from '@storybook/testing-library';
import { FileBox } from 'lucide-react';

import { TABLE_CATEGORIES } from '@/utils/storybook.js';

import UploadFileButton from './UploadFileButton.js';

const meta = {
  title: 'upload/UploadFileButton',
  component: UploadFileButton,
  argTypes: {
    onChange: {
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
      action: 'on change',
    },
  },
} satisfies Meta<typeof UploadFileButton>;

export default meta;

type Story = StoryObj<typeof UploadFileButton>;

export const Default: Story = {
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole('button')).toHaveTextContent('Upload a file');
  },
};

export const Loading = {
  args: {
    isLoading: true,
  },
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole('button')).toHaveTextContent('Uploading...');
    expect(canvas.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
  },
} satisfies Story;

export const ImageOnly = {
  args: { accept: 'image/*', text: 'Upload one image' },
  play: ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole('button')).toHaveTextContent(args.text!);
  },
} satisfies Story;

export const ImageMultipleOnly = {
  args: { accept: 'image/*', multiple: true, text: 'Upload many images' },
  play: ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole('button')).toHaveTextContent(args.text!);
    // select input
    const input =
      canvas.getByRole('button').firstChild?.nextSibling!.nextSibling;
    expect(input).toHaveAttribute('multiple');
    expect(input).toHaveAttribute('accept', args.accept);
  },
} satisfies Story;

export const H5pOnly = {
  args: {
    accept: '.h5p',
    text: 'Upload an H5P file',
    icon: <FileBox />,
    color: 'warning',
  },
  play: ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole('button')).toHaveTextContent(args.text!);
    // select input
    const input =
      canvas.getByRole('button').firstChild?.nextSibling!.nextSibling;
    expect(input).not.toHaveAttribute('multiple');
    expect(input).toHaveAttribute('accept', args.accept);
  },
} satisfies Story;
