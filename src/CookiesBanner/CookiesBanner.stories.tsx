import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';

import CookiesBanner from './CookiesBanner';

const cookieName = 'cookieName';

const meta: Meta<typeof CookiesBanner> = {
  title: 'Common/CookiesBanner',
  component: CookiesBanner,
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
        excludeDecorators: true,
      },
    },
  },
  decorators: [
    (story) => {
      // delete cookie on mount
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      return <>{story()}</>;
    },
  ],
  render: (args) => <CookiesBanner {...args} cookieName={cookieName} />,
};
export default meta;

type Story = StoryObj<typeof CookiesBanner>;

export const Banner: Story = {
  args: {},
};
