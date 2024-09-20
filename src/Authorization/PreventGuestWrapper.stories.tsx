import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { AccountType, CompleteGuest, CompleteMember } from '@graasp/sdk';

import BuildIcon from '@/icons/BuildIcon.js';

import PreventGuestWrapper from './PreventGuestWrapper.js';

const meta = {
  title: 'Actions/PreventGuestWrapper',
  component: PreventGuestWrapper,

  argTypes: {},
  args: {
    buttonText: 'Log out and Create a Graasp account',
    errorText: 'An error occured.',
    text: 'You are currently using Graasp with a guest account. In order to use all features of Graasp, you have to log out and create a Graasp account.',
    children: (
      <div data-testid='content'>
        <BuildIcon />
        <BuildIcon />
        <BuildIcon />
      </div>
    ),
  },
} satisfies Meta<typeof PreventGuestWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Guest = {
  args: {
    currentAccount: { type: AccountType.Guest } as CompleteGuest,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // should see message
    await expect(canvas.getByRole('alert')).toBeVisible();
  },
} satisfies Story;

export const Individual = {
  args: {
    currentAccount: { id: 'member', name: 'member' } as CompleteMember,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // should see content
    await expect(canvas.getByTestId('content')).toBeVisible();
  },
} satisfies Story;

export const ShowError = {
  args: {
    errorText: 'error text',
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // should see error message
    if (args.errorText) {
      await expect(canvas.getByText(args.errorText)).toBeVisible();
    }
  },
} satisfies Story;
