import { Meta, StoryObj } from '@storybook/react';

import FolderCard from './FolderCard';

const meta = {
  title: 'Card/Folder',
  component: FolderCard,
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
