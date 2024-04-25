import { Meta, StoryObj } from '@storybook/react';

import FolderCard from './FolderCard';

const meta = {
  title: 'Card/Folder',
  component: FolderCard,
} satisfies Meta<typeof FolderCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    name: 'Example folder',
    description: 'Optional description',
    thumbnail: 'https://picsum.photos/200/100',
  },
} satisfies Story;
