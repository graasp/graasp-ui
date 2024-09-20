import type { Meta, StoryObj } from '@storybook/react';
import { expect } from '@storybook/test';
import { screen, userEvent, within } from '@storybook/testing-library';

import {
  GuestFactory,
  ItemLoginSchemaFactory,
  ItemLoginSchemaType,
  PackedFolderItemFactory,
} from '@graasp/sdk';

import { SMALL_AVATAR_SIZE } from '@/constants.js';

import Avatar from '../Avatar/Avatar.js';
import { MOCK_CURRENT_MEMBER } from '../utils/fixtures.js';
import UserSwitchWrapper from './UserSwitchWrapper.js';

const meta = {
  title: 'Common/UserSwitch/UserSwitchWrapper',
  component: UserSwitchWrapper,
  argTypes: {
    signOut: { action: 'signOut' },
  },
  args: {
    signOut: async () => {},
    profilePath: 'profilePath',
    redirectPath: 'redirectPath',
  },
} satisfies Meta<typeof UserSwitchWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SignedIn = {
  args: {
    seeProfileText: 'See Profile',
    signOutText: 'Sign Out',
    currentMember: MOCK_CURRENT_MEMBER,
    avatar: (
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

    // profile button
    const profileButton = menuCanvas.getByText(SignedIn.args!.seeProfileText!);
    expect(profileButton).toBeInTheDocument();

    // email
    const emailText = menuCanvas.getByText(MOCK_CURRENT_MEMBER.email);
    expect(emailText).toBeInTheDocument();

    // sign out button
    const signOutButton = menuCanvas.getByText(SignedIn.args!.signOutText!);
    expect(signOutButton).toBeInTheDocument();
  },
} satisfies Story;

export const Guest = {
  args: {
    seeProfileText: 'See Profile',
    signOutText: 'Sign Out',
    currentMember: GuestFactory({
      itemLoginSchema: ItemLoginSchemaFactory({
        item: PackedFolderItemFactory(),
        type: ItemLoginSchemaType.Username,
      }),
    }),
    avatar: (
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
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // open dialog
    const nameText = canvas.getByLabelText(args.currentMember!.name);
    await userEvent.click(nameText);

    const menuCanvas = within(await screen.getByRole('menu'));

    // have 2 menu items - do not show profile button
    expect(menuCanvas.getAllByRole('menuitem')).toHaveLength(2);

    // sign out button
    const signOutButton = menuCanvas.getByText(SignedIn.args!.signOutText!);
    expect(signOutButton).toBeInTheDocument();
  },
} satisfies Story;

export const SignedOut = {
  args: {
    switchMemberText: 'Sign In',
    avatar: (
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // open dialog
    const nameText = canvas.getByRole('button');
    await userEvent.click(nameText);

    // custom content
    const menuCanvas = within(await screen.getByRole('menu'));
    const signInButton = menuCanvas.getByText(
      SignedOut.args!.switchMemberText!,
    );
    expect(signInButton).toBeInTheDocument();
  },
} satisfies Story;
