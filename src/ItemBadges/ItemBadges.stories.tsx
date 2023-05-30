import type { Meta, StoryObj } from '@storybook/react';

import ItemBadges from './ItemBadges';

const meta: Meta<typeof ItemBadges> = {
  title: 'Icons/ItemBadges',
  component: ItemBadges,
};

export default meta;

type Story = StoryObj<typeof ItemBadges>;

export const AllIcons: Story = {
  args: {
    isHidden: true,
    isPinned: true,
    isPublished: true,
    isPublic: true,
    isCollapsible: true,
    showChatbox: true,
  },
};
