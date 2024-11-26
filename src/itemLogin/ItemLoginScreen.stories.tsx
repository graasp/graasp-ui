import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';

import { ItemLoginSchemaType, PackedDocumentItemFactory } from '@graasp/sdk';

import { TABLE_CATEGORIES } from '../utils/storybook.js';
import ItemLoginScreen from './ItemLoginScreen.js';
import { FORBIDDEN_TEXT } from './constants.js';

const item = PackedDocumentItemFactory();
const meta = {
  title: 'Actions/ItemLogin/ItemLoginScreen',
  component: ItemLoginScreen,

  args: {
    signIn: fn(),
    itemId: item.id,
  },
  argTypes: {
    passwordInputId: {
      table: {
        category: TABLE_CATEGORIES.SELECTORS,
      },
    },
    signInButtonId: {
      table: {
        category: TABLE_CATEGORIES.SELECTORS,
      },
    },
    usernameInputId: {
      table: {
        category: TABLE_CATEGORIES.SELECTORS,
      },
    },
    signIn: { action: 'signin' },
  },
} satisfies Meta<typeof ItemLoginScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ItemLoginUsernameAndPassword: Story = {
  args: {
    itemLoginSchemaType: ItemLoginSchemaType.UsernameAndPassword,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(
      canvas.getByLabelText('Pseudonym'),
      'email@provider.com',
    );
    await userEvent.type(canvas.getByLabelText('Password'), 'mypassword');
    await userEvent.click(canvas.getByText('Sign In'));

    expect(args.signIn).toHaveBeenCalled();
  },
} satisfies Story;

export const ItemLoginUsername: Story = {
  args: {
    itemLoginSchemaType: ItemLoginSchemaType.Username,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByLabelText('Pseudonym'), 'my name');
    await userEvent.click(canvas.getByText('Sign In'));

    expect(args.signIn).toHaveBeenCalled();
  },
} satisfies Story;

export const Forbidden = {
  args: {
    itemId: item.id,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText(FORBIDDEN_TEXT)).toBeInTheDocument();
  },
} satisfies Story;
