import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';

import Avatar from '../Avatar/Avatar';
import { MOCK_MEMBER_RECORD } from '../utils/fixtures';
import UserSwitch from './UserSwitch';

const meta: Meta<typeof UserSwitch> = {
  title: 'Common/UserSwitch',
  component: UserSwitch,
};

export default meta;

type Story = StoryObj<typeof UserSwitch>;

export const SignedIn: Story = {
  args: {
    member: MOCK_MEMBER_RECORD,
    renderAvatar: () => (
      <Avatar
        url={'https://picsum.photos/100'}
        alt={`profile image ${MOCK_MEMBER_RECORD?.name}`}
        component={'avatar'}
        sx={{ mx: 1 }}
      />
    ),
  },
};
