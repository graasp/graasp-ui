import type { Meta, StoryObj } from '@storybook/react';

import { TABLE_CATEGORIES } from '../utils/storybook';
import ForbiddenContent from './ForbiddenContent';

const meta = {
  title: 'Common/ForbiddenContent',
  component: ForbiddenContent,

  argTypes: {
    id: {
      table: {
        category: TABLE_CATEGORIES.SELECTORS,
      },
    },
    forbiddenTextId: {
      table: {
        category: TABLE_CATEGORIES.SELECTORS,
      },
    },
  },
} satisfies Meta<typeof ForbiddenContent>;
export default meta;

type Story = StoryObj<typeof meta>;

export const SignedIn = {
  args: {
    memberId: 'member-id',
  },
} satisfies Story;

export const SignedOut = {
  args: {
    memberId: undefined,
  },
} satisfies Story;
