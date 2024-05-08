import type { Meta, StoryObj } from '@storybook/react';

import EtherpadIcon from './EtherpadIcon';

const meta: Meta<typeof EtherpadIcon> = {
  title: 'Icons/Etherpad',
  component: EtherpadIcon,
};

export default meta;

type Story = StoryObj<typeof EtherpadIcon>;

export const Default: Story = {
  args: {},
};
