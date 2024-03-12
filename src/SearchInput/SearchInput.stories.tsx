import type { StoryObj } from '@storybook/react';

import { SearchInput } from './SearchInput';

export default {
  title: 'Common/Search',
  component: SearchInput,

  argTypes: {
    onChange: {
      action: 'on change',
    },
  },
};

type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  args: {},
};

export const MaxWidth: Story = {
  args: {
    width: 300,
  },
};

export const Mobile: Story = {
  args: {
    margin: 'none',
    size: 'small',
  },
};
