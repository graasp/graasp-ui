import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { screen, userEvent, within } from '@storybook/testing-library';

import { Button, Link } from '@mui/material';

import Avatar from '../Avatar/Avatar';
import { MOCK_CURRENT_MEMBER } from '../utils/fixtures';
import UserSwitch, { UserSwitchProps } from './UserSwitch';

const meta = {
  title: 'Common/UserSwitch/UserSwitch',
  component: UserSwitch,
} satisfies Meta<typeof UserSwitch>;

export default meta;

type Story = StoryObj<typeof meta>;

const LinkComponent: UserSwitchProps['LinkComponent'] = ({
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

export const SignedIn = {
  args: {
    accountPath: 'hello',
    LinkComponent,
    ButtonContent: <>Hello</>,
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

export const Loading = {
  args: {
    currentMember: undefined,
    accountPath: 'hello',
    LinkComponent,
    ButtonContent: <></>,
  },
} satisfies Story;

export const SignedOut = {
  args: {
    ButtonContent: <Button sx={{ textTransform: 'none' }}>Sign In</Button>,
    currentMember: null,
    accountPath: 'hello',
    LinkComponent,
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
