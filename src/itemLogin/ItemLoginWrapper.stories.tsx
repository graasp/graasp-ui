import type { Meta, StoryObj } from '@storybook/react';
import { expect } from '@storybook/test';
import { within } from '@storybook/testing-library';

import {
  CompleteMember,
  ItemLoginSchemaType,
  PackedDocumentItemFactory,
} from '@graasp/sdk';

import Card from '@/Card/Card.js';

import ItemLoginWrapper from './ItemLoginWrapper.js';
import { FORBIDDEN_TEXT } from './constants.js';

const item = PackedDocumentItemFactory();
const meta = {
  title: 'Actions/ItemLoginAuthorization',
  component: ItemLoginWrapper,

  argTypes: {
    signIn: { action: 'onRedirect' },
  },
  args: {
    signIn: () => {},
    itemId: item.id,

    children: <Card alt='card' name='card' />,
  },
} satisfies Meta<typeof ItemLoginWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Authorized = {
  args: {
    currentAccount: { id: 'member', name: 'member' } as CompleteMember,
    item,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText('card')).toBeVisible();
  },
} satisfies Story;

export const LogInForm = {
  args: {
    itemLoginSchemaType: ItemLoginSchemaType.Username,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText('Sign In')).toBeVisible();
  },
} satisfies Story;

export const Loading = {
  args: {
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByRole('progressbar')).toBeVisible();
  },
} satisfies Story;

export const Forbidden = {
  args: {
    currentAccount: { id: 'member', name: 'member' } as CompleteMember,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText(FORBIDDEN_TEXT)).toBeVisible();
  },
} satisfies Story;
