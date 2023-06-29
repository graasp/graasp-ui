import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import { ItemLoginSchemaType } from '@graasp/sdk';

import { TABLE_CATEGORIES } from '../utils/storybook';
import ItemLoginScreen from './ItemLoginScreen';
import { FORBIDDEN_TEXT } from './constants';

const meta: Meta<typeof ItemLoginScreen> = {
  title: 'Actions/ItemLogin/ItemLoginScreen',
  component: ItemLoginScreen,

  argTypes: {
    memberIdInputId: {
      table: {
        category: TABLE_CATEGORIES.SELECTORS,
      },
    },
    modeSelectId: {
      table: {
        category: TABLE_CATEGORIES.SELECTORS,
      },
    },
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
};

ItemLoginUsernameAndPassword.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.type(
    canvas.getByLabelText('Pseudonym'),
    'email@provider.com',
  );
  await userEvent.type(canvas.getByLabelText('Password'), 'mypassword');
  await userEvent.click(canvas.getByText('Sign In'));

  expect(args.signIn).toHaveBeenCalled();
};

export const ItemLoginUsername: Story = {
  args: {
    itemLoginSchemaType: ItemLoginSchemaType.Username,
  },
};

ItemLoginUsername.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.type(
    canvas.getByLabelText('Pseudonym'),
    'email@provider.com',
  );
  await userEvent.click(canvas.getByText('Sign In'));

  expect(args.signIn).toHaveBeenCalled();
};

export const Forbidden: Story = {
  args: {},
};

Forbidden.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await expect(canvas.getByText(FORBIDDEN_TEXT)).toBeInTheDocument();
};
