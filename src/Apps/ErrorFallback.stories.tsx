import type { Meta, StoryObj } from '@storybook/react';

import { TABLE_CATEGORIES } from '../utils/storybook';
import ErrorFallback from './ErrorFallback';
import { UserFeedback } from './types';

const meta: Meta<typeof ErrorFallback> = {
  title: 'Apps/ErrorFallback',
  component: ErrorFallback,

  tags: ['autodocs'],
  argTypes: {
    variant: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    sx: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ErrorFallback>;

export const DefaultErrorFallback: Story = {
  args: {
    error: 'Something wrong happened.',
    componentStack: 'none',
    eventId: '1',
    captureUserFeedback: (userFeedback: UserFeedback) =>
      console.log('You sent user feedback: ', userFeedback.toString()),
  },
};
