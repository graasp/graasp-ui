import type { Meta, StoryObj } from '@storybook/react';

import RequiredChip from './RequiredChip';

const meta: Meta<typeof RequiredChip> = {
  title: 'Apps/Status chips/RequiredChip',
  component: RequiredChip,
};

export default meta;

type Story = StoryObj<typeof RequiredChip>;

export const DefaultRequiredChip: Story = {
  args: {
    label: 'Required',
    tooltip: 'This question is required',
    dataCy: 'required-chip',
  },
};
