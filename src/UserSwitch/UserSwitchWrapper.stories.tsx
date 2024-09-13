import type { Meta, StoryObj } from '@storybook/react';
import { expect } from '@storybook/test';
import { screen, userEvent, within } from '@storybook/testing-library';

import { SMALL_AVATAR_SIZE } from '@/constants.js';

import Avatar from '../Avatar/Avatar.js';
import { MOCK_CURRENT_MEMBER } from '../utils/fixtures.js';
import UserSwitchWrapper from './UserSwitchWrapper.js';

const meta: Meta<typeof UserSwitchWrapper> = {
  title: 'Common/UserSwitch/UserSwitchWrapper',
  component: UserSwitchWrapper,
};

export default meta;

type Story = StoryObj<typeof UserSwitchWrapper>;

export const SignedIn: Story = {
  args: {
    currentMember: MOCK_CURRENT_MEMBER,
    seeProfileText: 'See Profile',
    signOutText: 'Sign Out',
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
};
SignedIn.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // open dialog
  const nameText = canvas.getByLabelText(MOCK_CURRENT_MEMBER.name);
  await userEvent.click(nameText);

  const menuCanvas = within(await screen.getByRole('menu'));

  // profile button
  const profileButton = menuCanvas.getByText(SignedIn.args!.seeProfileText!);
  expect(profileButton).toBeInTheDocument();

  // email
  const emailText = menuCanvas.getByText(MOCK_CURRENT_MEMBER.email);
  expect(emailText).toBeInTheDocument();

  // sign out button
  const signOutButton = menuCanvas.getByText(SignedIn.args!.signOutText!);
  expect(signOutButton).toBeInTheDocument();
};

export const SignedOut: Story = {
  args: {
    switchMemberText: 'Sign In',
    renderAvatar: () => (
      <Avatar
        maxWidth={SMALL_AVATAR_SIZE}
        maxHeight={SMALL_AVATAR_SIZE}
        url={'https://picsum.photos/100'}
        alt={`default profile image`}
        component={'avatar'}
        sx={{ mx: 1 }}
      />
    ),
  },
};

SignedOut.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // open dialog
  const nameText = canvas.getByRole('button');
  await userEvent.click(nameText);

  // custom content
  const menuCanvas = within(await screen.getByRole('menu'));
  const signInButton = menuCanvas.getByText(SignedOut.args!.switchMemberText!);
  expect(signInButton).toBeInTheDocument();
};
