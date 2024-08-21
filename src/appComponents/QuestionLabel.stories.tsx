import type { Meta, StoryObj } from '@storybook/react';

import QuestionLabel from './QuestionLabel.js';

const meta: Meta<typeof QuestionLabel> = {
  title: 'Apps/QuestionLabel',
  component: QuestionLabel,
};

export default meta;

type Story = StoryObj<typeof QuestionLabel>;

export const DefaultQuestionLabel: Story = {
  args: {
    children: <p>How are you today?</p>,
  },
};

export const MobileErrorFallback: Story = {
  args: {
    children: (
      <p>
        In your opinion, how very long questions should appear on mobile,
        considering the limited space and their readability?
      </p>
    ),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
};
