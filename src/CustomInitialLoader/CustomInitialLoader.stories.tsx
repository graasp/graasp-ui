import type { Meta, StoryObj } from '@storybook/react';

import CustomInitialLoader from './CustomInitialLoader.js';

const meta: Meta<typeof CustomInitialLoader> = {
  title: 'Actions/CustomInitialLoader',
  component: CustomInitialLoader,
  decorators: [
    (story) => {
      return (
        <div style={{ height: '100%', width: '100%', position: 'relative' }}>
          {story()}
        </div>
      );
    },
  ],
  argTypes: {},
  render: (args) => <CustomInitialLoader {...args} />,
};

export default meta;

type Story = StoryObj<typeof CustomInitialLoader>;

export const Default: Story = {
  args: {},
};
