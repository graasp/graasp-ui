import type { Meta, StoryObj } from '@storybook/react';
import { expect } from '@storybook/test';
import { screen, userEvent, within } from '@storybook/testing-library';

import { SMALL_AVATAR_SIZE } from '@/constants.js';

import Avatar from '../Avatar/Avatar.js';
import { MOCK_CURRENT_MEMBER } from '../utils/fixtures.js';
import { UserSwitch } from './UserSwitch.js';

const meta = {
  title: 'Common/UserSwitch/UserSwitch',
  component: UserSwitch,
} satisfies Meta<typeof UserSwitch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SignedIn = {
  args: {
    currentMember: MOCK_CURRENT_MEMBER,
    renderAvatar: () => (
      <Avatar
        maxWidth={SMALL_AVATAR_SIZE}
        maxHeight={SMALL_AVATAR_SIZE}
        url={'https://picsum.photos/100'}
        alt={`profile image ${MOCK_CURRENT_MEMBER?.name}`}
        component={'avatar'}
        sx={{ mx: 1 }}
      />
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // open dialog
    const nameText = canvas.getByLabelText(MOCK_CURRENT_MEMBER.name);
    await userEvent.click(nameText);

    const menuCanvas = within(await screen.getByRole('menu'));

    // email
    const emailText = menuCanvas.getByText(MOCK_CURRENT_MEMBER.email);
    expect(emailText).toBeInTheDocument();
  },
} satisfies Story;

export const SignedOut = {
  args: {
    renderAvatar: () => (
      <Avatar
        maxWidth={SMALL_AVATAR_SIZE}
        maxHeight={SMALL_AVATAR_SIZE}
        url={'https://picsum.photos/100'}
        alt='default profile image'
        component={'avatar'}
        sx={{ mx: 1 }}
      />
    ),
    Actions: [<h3>some content</h3>],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // open dialog
    const nameText = canvas.getByRole('button');
    await userEvent.click(nameText);

    // custom content
    const menuCanvas = within(await screen.getByRole('menu'));
    const profileButton = menuCanvas.getByText('some content');
    expect(profileButton).toBeInTheDocument();
  },
} satisfies Story;
