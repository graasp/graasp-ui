import { Meta, StoryObj, composeStories } from '@storybook/react';

import { BrowserRouter } from 'react-router-dom';

import { TextDisplay } from '..';
import * as TextDisplayStories from '../TextDisplay/TextDisplay.stories';
import FolderCard from './FolderCard';

const { SimpleText } = composeStories(TextDisplayStories);

const meta = {
  title: 'Card/Folder',
  component: FolderCard,
  decorators: [
    (story) => {
      return <BrowserRouter>{story()}</BrowserRouter>;
    },
  ],
  args: {
    name: 'Example folder',
    description: 'Optional description',
    to: 'https://graasp.org',
  },
} satisfies Meta<typeof FolderCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    thumbnail: 'https://picsum.photos/256/256',
  },
} satisfies Story;

export const NoThumbnail = {
  args: { thumbnail: undefined },
} satisfies Story;

export const OverflowDescription = {
  args: {
    thumbnail: undefined,
    description: <SimpleText />,
  },
} satisfies Story;

export const LongHtmlDescription = {
  args: {
    thumbnail: undefined,
    description: (
      <TextDisplay content='<p>Hello wefh uwhf uqhw hqwkjehr jkqwher jkqwhej khqwefhj hwkjefh jwhef jahwefj khawjkf hawjkf hajkwefh ajk hajkhf wkej </p><p>World</p>' />
    ),
  },
} satisfies Story;

export const LongTitle = {
  args: {
    thumbnail: undefined,
    name: 'aewrfgaf jawef kjkew hqwjerh jweqh jhkjqwehjwkrmwfkmacqjfiqfm34ion q3fmqifjkamsdk we whj hjhkwjehf jhkjweh jkwhejk hwjkehr jwkeh jf jiajweifiaiowef uawefu iuaioweuiouoi auwer ',
  },
} satisfies Story;

export const NoDescription = {
  args: {
    thumbnail: undefined,
    description: null,
  },
} satisfies Story;
