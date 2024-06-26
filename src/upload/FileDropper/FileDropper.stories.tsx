import { Button } from '@/buttons';
import { TABLE_CATEGORIES } from '@/utils/storybook';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { within } from '@storybook/testing-library';

import { Box } from '@mui/material';

import FileDropper from './FileDropper';

const meta = {
  title: 'upload/FileDropper',
  component: FileDropper,
  args: {
    onChange: fn(),
  },
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
} satisfies Meta<typeof FileDropper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('Browse files')).toHaveRole('button');
    expect(canvas.getByText('Drag your files here to upload or')).toBeVisible();
  },
} satisfies Story;

export const Container = {
  args: {
    buttonText: 'my button text',
    message: 'my text',
    buttons: <Button data-testid='button-test'>my button</Button>,
  },
  decorators: [
    (story) => {
      return <Box height='400px'>{story()}</Box>;
    },
  ],
  play: ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(args.buttonText!)).toHaveRole('button');
    expect(canvas.getByText(args.message!)).toBeVisible();
    expect(canvas.getByTestId('button-test')).toHaveTextContent('my button');
  },
} satisfies Story;

export const WithError = {
  args: {
    error: 'You cannot upload more than 10 files at a time',
    hints: 'Max 15GB',
  },
  decorators: [
    (story) => {
      return <Box height='400px'>{story()}</Box>;
    },
  ],
  play: ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(args.error!).parentNode).toHaveRole('alert');
    expect(canvas.getByRole('dropzone')).toHaveStyle({
      'background-color': '#ffbaba',
    });
  },
} satisfies Story;

export const Loading = {
  args: {
    hints: 'Max 15GB',
    isLoading: true,
    uploadProgress: 40,
  },
  decorators: [
    (story) => {
      return <Box height='400px'>{story()}</Box>;
    },
  ],
  play: ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(`${args.uploadProgress!}%`)).toBeVisible();
    expect(canvas.getByRole('progressbar')).toBeVisible();
  },
} satisfies Story;

export const ZeroLoading = {
  args: {
    hints: 'Max 15GB',
    isLoading: true,
    uploadProgress: 0,
  },
  decorators: [
    (story) => {
      return <Box height='400px'>{story()}</Box>;
    },
  ],
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole('progressbar')).toBeVisible();
  },
} satisfies Story;
