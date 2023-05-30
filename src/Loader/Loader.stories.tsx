import { StoryObj } from '@storybook/react';

import Loader from './Loader';

export default {
  title: 'Common/Loader',
  component: Loader,
};

type Story = StoryObj<typeof Loader>;

export const Default: Story = {
  args: {},
};
