import type { Meta, StoryObj } from '@storybook/react';
import { expect } from '@storybook/test';
import { within } from '@storybook/testing-library';

import {
  CompleteMember,
  ItemLoginSchemaType,
  PackedDocumentItemFactory,
} from '@graasp/sdk';

import Card from '@/Card/Card.js';

import ItemLoginAuthorization from './ItemLoginAuthorization.js';
import { FORBIDDEN_TEXT } from './constants.js';

const meta: Meta<typeof ItemLoginAuthorization> = {
  title: 'Actions/ItemLoginAuthorization',
  component: ItemLoginAuthorization,

  argTypes: {
    signIn: { action: 'onRedirect' },
  },
  args: {
    children: <Card alt='card' name='card' />,
  },
};

export default meta;

type Story = StoryObj<typeof ItemLoginAuthorization>;

export const Authorized: Story = {
  args: {
    currentAccount: { id: 'member', name: 'member' } as CompleteMember,
    item: PackedDocumentItemFactory(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText('card')).toBeVisible();
  },
};
export const LogInForm: Story = {
  args: {
    itemLoginSchemaType: ItemLoginSchemaType.Username,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText('Sign In')).toBeVisible();
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByRole('progressbar')).toBeVisible();
  },
};

export const Forbidden: Story = {
  args: {
    currentAccount: { id: 'member', name: 'member' } as CompleteMember,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText(FORBIDDEN_TEXT)).toBeVisible();
  },
};
