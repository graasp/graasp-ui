import { Meta, StoryObj } from '@storybook/react';

import LogoHeader from './LogoHeader.js';

const meta = {
  title: 'Main/LogoHeader',
  component: LogoHeader,

  render: () => (
    <div
      style={{
        backgroundColor: '#5050d2',
        color: 'white',
        padding: '24px',
        width: 'max-content',
      }}
    >
      <LogoHeader />
    </div>
  ),
} satisfies Meta<typeof LogoHeader>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
