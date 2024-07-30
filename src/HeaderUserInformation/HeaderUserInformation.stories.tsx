import type { Meta, StoryObj } from '@storybook/react';

import { TABLE_CATEGORIES } from '../utils/storybook.js';
import HeaderUserInformation from './HeaderUserInformation.js';

const meta: Meta<typeof HeaderUserInformation> = {
  title: 'Common/HeaderUserInformation',
  component: HeaderUserInformation,

  argTypes: {
    id: {
      table: {
        category: TABLE_CATEGORIES.SELECTORS,
      },
    },
    onClick: { action: 'click' },
  },
};

export default meta;

type Story = StoryObj<typeof HeaderUserInformation>;

export const SignedIn: Story = {
  args: {
    avatar: 'https://picsum.photos/100',
    username: 'username',
  },
};

export const SignedOut: Story = {
  args: {},
};
