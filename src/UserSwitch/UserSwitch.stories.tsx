import type { Meta, StoryObj } from '@storybook/react';

import Avatar from '../Avatar/Avatar';
import { MOCK_MEMBER } from '../utils/fixtures';
import { TABLE_CATEGORIES } from '../utils/storybook';
import UserSwitch from './UserSwitch';

const meta: Meta<typeof UserSwitch> = {
  title: 'Common/UserSwitch',
  component: UserSwitch,

  argTypes: {
    id: {
      table: {
        category: TABLE_CATEGORIES.SELECTORS,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof UserSwitch>;

export const SignedIn: Story = {
  args: {
    member: MOCK_MEMBER,
    renderAvatar: () => (
      <Avatar
        url={'https://picsum.photos/100'}
        alt={`profile image ${MOCK_MEMBER?.name}`}
        component={'avatar'}
        sx={{ mx: 1 }}
      />
    ),
  },
};
