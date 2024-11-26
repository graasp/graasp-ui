import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from '@storybook/test';
import { StatusCodes } from 'http-status-codes';
import { v4 } from 'uuid';

import {
  AccountType,
  CompleteMember,
  ItemLoginSchemaType,
  PackedDocumentItemFactory,
} from '@graasp/sdk';

import Card from '@/Card/Card.js';

import ItemLoginWrapper from './ItemLoginWrapper.js';
import { FORBIDDEN_TEXT } from './constants.js';

const item = PackedDocumentItemFactory();
const currentAccount = {
  id: 'member',
  name: 'member',
  type: AccountType.Individual,
} as CompleteMember;

const meta = {
  title: 'Actions/itemLogin/ItemLoginWrapper',
  component: ItemLoginWrapper,

  argTypes: {
    signIn: { action: 'onRedirect' },
  },
  args: {
    signIn: fn(),
    itemId: item.id,
    itemErrorStatusCode: null,
    children: <Card alt='card' name='card' key='child' />,
  },
} satisfies Meta<typeof ItemLoginWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Authorized = {
  args: {
    currentAccount,
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

export const Enroll = {
  args: {
    currentAccount,
    itemId: v4(),
    itemLoginSchemaType: ItemLoginSchemaType.Username,
    enrollContent: (
      <div data-testId='enroll' key='enroll'>
        Enroll Content
      </div>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByTestId('enroll')).toBeVisible();
  },
} satisfies Story;

export const RequestAccess = {
  args: {
    currentAccount,
    itemId: v4(),
    itemErrorStatusCode: StatusCodes.FORBIDDEN,
    requestAccessContent: (
      <div data-testId='request' key='request'>
        Request Access
      </div>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByTestId('request')).toBeVisible();
  },
} satisfies Story;

export const ForbiddenSignedIn = {
  args: {
    currentAccount,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText(FORBIDDEN_TEXT)).toBeVisible();
  },
} satisfies Story;

export const ForbiddenSignedOut = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText(FORBIDDEN_TEXT)).toBeVisible();
  },
} satisfies Story;
