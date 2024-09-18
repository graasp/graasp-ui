import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { AccountType, CompleteGuest, CompleteMember } from '@graasp/sdk';

import BuildIcon from '@/icons/BuildIcon.js';

import PreventGuestWrapper from './PreventGuestWrapper.js';

const meta: Meta<typeof PreventGuestWrapper> = {
  title: 'Actions/PreventGuestWrapper',
  component: PreventGuestWrapper,

  argTypes: {},
  args: {
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

type Story = StoryObj<typeof PreventGuestWrapper>;

export const Guest: Story = {
  args: {
    currentAccount: { type: AccountType.Guest } as CompleteGuest,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // should see message
    await expect(canvas.getByRole('alert')).toBeVisible();
  },
};

export const Individual: Story = {
  args: {
    currentAccount: { id: 'member', name: 'member' } as CompleteMember,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // should see content
    await expect(canvas.getByTestId('content')).toBeVisible();
  },
};

export const ShowError: Story = {
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
};
