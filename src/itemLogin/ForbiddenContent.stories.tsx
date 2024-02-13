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
  },
} satisfies Meta<typeof ForbiddenContent>;
export default meta;

type Story = StoryObj<typeof meta>;

export const SignedIn = {
  args: {
    memberId: 'member-id',
    authenticatedText: 'Ask the admin of the item to give you access',
  },
} satisfies Story;

export const LongHelperText = {
  args: {
    memberId: 'member-id',
    authenticatedText:
      'As it turns out, this item is not willign to let you in. How bad... Mhmmm aybe you could ask a friend or the admin of the item to kindly let you access it. Do not forget to bring candy, as this should help you be accepted.',
  },
} satisfies Story;

export const SignedOut = {
  args: {
    memberId: undefined,
  },
} satisfies Story;

export const Mobile = {
  args: {
    memberId: 'member-id',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
} satisfies Story;
