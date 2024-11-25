import type { Meta, StoryObj } from '@storybook/react';
import { expect, screen, userEvent, within } from '@storybook/test';

import { AccountType } from '@graasp/sdk';

import { SMALL_AVATAR_SIZE } from '@/constants.js';

import Avatar from '../Avatar/Avatar.js';
import { MOCK_CURRENT_MEMBER } from '../utils/fixtures.js';
import { UserSwitch } from './UserSwitch.js';

const meta = {
  title: 'Common/UserSwitch/UserSwitch',
  component: UserSwitch,
  args: {
    currentMember: MOCK_CURRENT_MEMBER,
  },
} satisfies Meta<typeof UserSwitch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SignedIn = {
  args: {
    avatar: (
      <Avatar
        maxWidth={SMALL_AVATAR_SIZE}
        maxHeight={SMALL_AVATAR_SIZE}
        url={'https://picsum.photos/100'}
        alt='avatar picture'
        component={'avatar'}
        sx={{ mx: 1 }}
      />
    ),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const member = args.currentMember;
    if (member && member.type === AccountType.Individual) {
      // open dialog
      const nameText = canvas.getByLabelText(member.name);
      await userEvent.click(nameText);

      const menuCanvas = within(screen.getByRole('menu'));

      // email
      const emailText = menuCanvas.getByText(member.email);
      expect(emailText).toBeInTheDocument();
    }
  },
} satisfies Story;

export const SignedOut = {
  args: {
    currentMember: null,
    avatar: (
      <Avatar
        maxWidth={SMALL_AVATAR_SIZE}
        maxHeight={SMALL_AVATAR_SIZE}
        url={'https://picsum.photos/100'}
        alt='default profile image'
        component={'avatar'}
        sx={{ mx: 1 }}
      />
    ),
    Actions: [<h3 key='content'>some content</h3>],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // open dialog
    const nameText = canvas.getByRole('button');
    await userEvent.click(nameText);

    const menuCanvas = within(screen.getByRole('menu'));

    // custom content
    const profileButton = menuCanvas.getByText('some content');
    expect(profileButton).toBeInTheDocument();
  },
} satisfies Story;
