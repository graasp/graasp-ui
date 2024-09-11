import { Meta, StoryObj } from '@storybook/react';

import DownloadButtonFileItem from './DownloadButtonFileItem.js';

const meta = {
  title: 'Items/FileItemDownload',
  component: DownloadButtonFileItem,
  args: {
    url: '#',
  },
} satisfies Meta<typeof DownloadButtonFileItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Button = {
  args: {
    name: 'My powerpoint presentation',
    caption: '(50Mb - application/pdf)',
  },
} satisfies Story;
