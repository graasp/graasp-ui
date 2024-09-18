import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { CompleteMember } from '@graasp/sdk';

import BuildIcon from '@/icons/BuildIcon.js';

import SignedInWrapper from './SignedInWrapper.js';

const redirectionLink = 'https://redirect.org';

const meta: Meta<typeof SignedInWrapper> = {
  title: 'Actions/SignedInWrapper',
  component: SignedInWrapper,

  argTypes: {
    onRedirect: { action: 'onRedirect' },
  },
  args: {
    redirectionLink,
    children: (
      <div data-testid='content'>
        <BuildIcon />
        <BuildIcon />
        <BuildIcon />
      </div>
    ),
  },
};

export default meta;

type Story = StoryObj<typeof SignedInWrapper>;

export const Authorized: Story = {
  args: {
    currentAccount: { id: 'member', name: 'member' } as CompleteMember,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // should see content
    await expect(canvas.getByTestId('content')).toBeVisible();
  },
};

export const SignedOut: Story = {
  args: {
    currentAccount: undefined,
  },
};
