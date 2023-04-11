import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import ItemBadges from './ItemBadges';

export default {
  title: 'Icons/ItemBadges',
  component: ItemBadges,
} as ComponentMeta<typeof ItemBadges>;

const Template: ComponentStory<typeof ItemBadges> = (args) => (
  <ItemBadges {...args} />
);

export const AllIcons = Template.bind({});
AllIcons.args = {
  isHidden: true,
  isPinned: true,
  isPublished: true,
  isPublic: true,
  isCollapsible: true,
  showChatbox: true,
};
