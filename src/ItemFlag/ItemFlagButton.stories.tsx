import type { Meta, StoryObj } from '@storybook/react';

import ItemFlagButton from './ItemFlagButton';

const meta: Meta<typeof ItemFlagButton> = {
  title: 'Actions/Flag/ItemFlagButton',
  component: ItemFlagButton,
};

export default meta;

type Story = StoryObj<typeof ItemFlagButton>;

export const Default: Story = {};
