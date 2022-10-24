import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import CookiesBanner from './CookiesBanner';

const cookieName = 'cookieName';

export default {
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
} as ComponentMeta<typeof CookiesBanner>;

const Template: ComponentStory<typeof CookiesBanner> = (args) => (
  <CookiesBanner {...args} cookieName={cookieName} />
);

export const Banner = Template.bind({});
Banner.args = {};
