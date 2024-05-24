import type { Meta, StoryObj } from '@storybook/react';

import SavedChip from './SavedChip';

const meta: Meta<typeof SavedChip> = {
  title: 'Apps/Status chips/SavedChip',
  component: SavedChip,
};

export default meta;

type Story = StoryObj<typeof SavedChip>;

export const DefaultSavedChip: Story = {
  args: {
    label: 'Saved',
    tooltip: 'Your answer has been saved.',
    dataCy: 'saved-chip',
  },
};
