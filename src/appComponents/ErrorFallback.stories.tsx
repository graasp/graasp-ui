import type { Meta, StoryObj } from '@storybook/react';

import ErrorFallback from './ErrorFallback';
import { UserFeedback } from './types';

const meta: Meta<typeof ErrorFallback> = {
  title: 'Apps/ErrorFallback',
  component: ErrorFallback,
};

export default meta;

type Story = StoryObj<typeof ErrorFallback>;

export const DefaultErrorFallback: Story = {
  args: {
    error: new Error('Something wrong happened.'),
    componentStack: 'none',
    eventId: '1',
    captureFeedback: (userFeedback: UserFeedback) =>
      console.log('You sent user feedback: ', userFeedback.toString()),
  },
};

export const MobileErrorFallback: Story = {
  args: {
    error: new Error('Something wrong happened on mobile'),
    componentStack: 'mobile-view',
    eventId: '1',
    captureFeedback: (userFeedback: UserFeedback) =>
      console.log(
        'You sent user feedback from the mobile view: ',
        userFeedback.toString(),
      ),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
};
