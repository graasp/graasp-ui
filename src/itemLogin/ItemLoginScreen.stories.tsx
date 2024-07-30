import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { userEvent, within } from '@storybook/testing-library';

import { ItemLoginSchemaType } from '@graasp/sdk';

import { TABLE_CATEGORIES } from '../utils/storybook.js';
import ItemLoginScreen from './ItemLoginScreen.js';
import { FORBIDDEN_TEXT } from './constants.js';

const meta: Meta<typeof ItemLoginScreen> = {
  title: 'Actions/ItemLogin/ItemLoginScreen',
  component: ItemLoginScreen,

  args: {
    signIn: fn(),
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
};

export default meta;

type Story = StoryObj<typeof ItemLoginScreen>;

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
};

export const ItemLoginUsername: Story = {
  args: {
    itemLoginSchemaType: ItemLoginSchemaType.Username,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(
      canvas.getByLabelText('Pseudonym'),
      'email@provider.com',
    );
    await userEvent.click(canvas.getByText('Sign In'));

    expect(args.signIn).toHaveBeenCalled();
  },
};

export const Forbidden: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText(FORBIDDEN_TEXT)).toBeInTheDocument();
  },
};
