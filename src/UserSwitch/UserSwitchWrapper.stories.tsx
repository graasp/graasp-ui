import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { screen, userEvent, within } from '@storybook/testing-library';

import { Link } from '@mui/material';

import Avatar from '../Avatar/Avatar';
import { MOCK_CURRENT_MEMBER } from '../utils/fixtures';
import UserSwitchWrapper, { UserSwitchWrapperProps } from './UserSwitchWrapper';

const meta = {
  title: 'Common/UserSwitch/UserSwitchWrapper',
  component: UserSwitchWrapper,
} satisfies Meta<typeof UserSwitchWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

const LinkComponent: UserSwitchWrapperProps['LinkComponent'] = ({
  children,
  href,
}) => (
  <Link
    sx={{ textDecoration: 'none', color: 'currentcolor' }}
    href={href ?? ''}
  >
    {children}
  </Link>
);

export const SignedIn: Story = {
  args: {
    signOut: () => new Promise((resolve) => resolve()),
    LinkComponent,
    ButtonContent: <>Hello</>,
    redirectPath: 'redirect',
    profilePath: 'profile',
    currentMember: MOCK_CURRENT_MEMBER,
    signOutText: 'Sign Out',
    renderAvatar: () => (
      <Avatar
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
  const profileButton = menuCanvas.getByTestId('account-button');
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
    signOut: () => new Promise((resolve) => resolve()),
    LinkComponent,
    ButtonContent: <>Hello</>,
    redirectPath: 'redirect',
    profilePath: 'profile',
    switchMemberText: 'Sign In',
    renderAvatar: () => (
      <Avatar
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
