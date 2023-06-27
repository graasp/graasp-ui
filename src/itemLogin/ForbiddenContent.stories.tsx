import type { Meta, StoryObj } from '@storybook/react';

import { TABLE_CATEGORIES } from '../utils/storybook';
import ForbiddenContent from './ForbiddenContent';

const meta: Meta<typeof ForbiddenContent> = {
  title: 'Common/ForbiddenContent',
  component: ForbiddenContent,

  argTypes: {
    id: {
      table: {
        category: TABLE_CATEGORIES.SELECTORS,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ForbiddenContent>;

export const SignedIn: Story = {
  args: {
    memberId: 'member-id',
  },
};

export const SignedOut: Story = {
  args: {
    memberId: undefined,
  },
};

export const SignedOutShowPseudonymized: Story = {
  args: {
    showPseudonymized: true,
    memberId: 'member-id',
  },
};
