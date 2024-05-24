import type { Meta, StoryObj } from '@storybook/react';

import SubmittedChip from './SubmittedChip';

const meta: Meta<typeof SubmittedChip> = {
  title: 'Apps/Status chips/SubmittedChip',
  component: SubmittedChip,
};

export default meta;

type Story = StoryObj<typeof SubmittedChip>;

export const DefaultSubmittedChip: Story = {
  args: {
    label: 'Submitted',
    tooltip: 'Your answer has been submitted.',
    dataCy: 'submitted-chip',
  },
};
