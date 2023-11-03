import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { screen, userEvent, within } from '@storybook/testing-library';

import React from 'react';

import Avatar from '../Avatar/Avatar';
import { MOCK_CURRENT_MEMBER } from '../utils/fixtures';
import UserSwitch from './UserSwitch';

const meta: Meta<typeof UserSwitch> = {
  title: 'Common/UserSwitch/UserSwitch',
  component: UserSwitch,
};

export default meta;

type Story = StoryObj<typeof UserSwitch>;

export const SignedIn: Story = {
  args: {
    currentMember: MOCK_CURRENT_MEMBER,
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

  // email
  const emailText = menuCanvas.getByText(MOCK_CURRENT_MEMBER.email);
  expect(emailText).toBeInTheDocument();
};

export const SignedOut: Story = {
  args: {
    renderAvatar: () => (
      <Avatar
        url={'https://picsum.photos/100'}
        alt={`default profile image`}
        component={'avatar'}
        sx={{ mx: 1 }}
      />
    ),
    Actions: [<h3>some content</h3>],
  },
};

SignedOut.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // open dialog
  const nameText = canvas.getByRole('button');
  await userEvent.click(nameText);

  // custom content
  const menuCanvas = within(await screen.getByRole('menu'));
  const profileButton = menuCanvas.getByText('some content');
  expect(profileButton).toBeInTheDocument();
};
