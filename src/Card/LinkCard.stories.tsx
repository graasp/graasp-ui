import { Meta, StoryObj } from '@storybook/react';

import { BrowserRouter } from 'react-router-dom';

import FancyLink from './LinkCard.js';

const meta = {
  title: 'Card/Link',
  component: FancyLink,
  decorators: [
    (story) => {
      return <BrowserRouter>{story()}</BrowserRouter>;
    },
  ],
  args: {
    title: 'Default link name',
    url: 'https://graasp.org',
    description: 'Default link description',
  },
} satisfies Meta<typeof FancyLink>;
export default meta;

type Story = StoryObj<typeof meta>;

export const WithThumbnail = {
  args: {
    url: 'https://google.com',
    thumbnail: 'https://arc.net/og.png',
  },
} satisfies Story;

export const WithFavicon = {
  args: {
    url: 'https://arc.net',
    thumbnail: 'https://arc.net/favicon.svg',
  },
} satisfies Story;

export const LongText = {
  args: {
    title: 'A link to a story in our storybook project',
    url: 'https://graasp.github.io/graasp-ui/?path=/story/icons-itemicon--shortcut?some-parameter=2827oqevuifjiojioj1eurghwrejhferfhwerjkjwqkhefrx84u3jq34ferkl',
    description:
      'Our storybook project is the place where we build our re-usable components that are used accros the platform in a lot of places for uniformity',
    thumbnail: 'https://graasp.github.io/graasp-ui/favicon.svg',
  },
} satisfies Story;

export const NoThumbnail = {
  args: {
    title: 'Graasp learning experience platform',
    url: 'https://graasp.org',
    description:
      'Graasp is a Learning experience platform, that provides rich learning experiences',
  },
} satisfies Story;

export const InternalLink = {
  args: {
    title: 'Check out the Graasp player !',
    url: 'https://player.graasp.org/',
    description: 'Graasp Player',
    thumbnail: 'https://player.graasp.org/player.svg',
    isExternal: false,
  },
} satisfies Story;
