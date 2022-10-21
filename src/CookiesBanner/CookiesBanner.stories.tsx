import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import CookiesBanner from './CookiesBanner';

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
      return (
        <>
          If you don't see the banner, you might need to remove the
          corresponding cookie.
          {story()}
        </>
      );
    },
  ],
} as ComponentMeta<typeof CookiesBanner>;

const Template: ComponentStory<typeof CookiesBanner> = (args) => (
  <CookiesBanner {...args} cookieName='cookieName' />
);

export const Banner = Template.bind({});
Banner.args = {};
