import { expect } from '@storybook/jest';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import React from 'react';

import { ItemLoginSchemaType, convertJs } from '@graasp/sdk';

import { TABLE_CATEGORIES } from '../utils/storybook';
import ItemLoginScreen from './ItemLoginScreen';
import MemberIdTextField from './MemberIdTextField';
import { FORBIDDEN_TEXT } from './constants';

export default {
  title: 'Actions/ItemLogin/ItemLoginScreen',
  component: ItemLoginScreen,
  subcomponents: { MemberIdTextField },

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
} as ComponentMeta<typeof ItemLoginScreen>;

const Template: ComponentStory<typeof ItemLoginScreen> = (args) => (
  <ItemLoginScreen {...args} />
);

export const ItemLoginUsernameAndPassword = Template.bind({});
ItemLoginUsernameAndPassword.args = {
  itemLoginSchemaType: ItemLoginSchemaType.UsernameAndPassword,
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

export const ItemLoginUsername = Template.bind({});
ItemLoginUsername.args = {
  itemLoginSchemaType: ItemLoginSchemaType.Username,
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

export const Forbidden = Template.bind({});
Forbidden.args = {};
Forbidden.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await expect(canvas.getByText(FORBIDDEN_TEXT)).toBeInTheDocument();
};
