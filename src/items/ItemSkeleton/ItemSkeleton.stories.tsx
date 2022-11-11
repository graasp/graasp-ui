import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import { ItemType } from '@graasp/sdk';

import ItemSkeleton from './ItemSkeleton';

export default {
  title: 'Items/ItemSkeleton',
  component: ItemSkeleton,
} as ComponentMeta<typeof ItemSkeleton>;

const Template: ComponentStory<typeof ItemSkeleton> = (args) => (
  <ItemSkeleton {...args} />
);

export const Folder = Template.bind({});
Folder.args = {
  itemType: ItemType.FOLDER,
};

export const File = Template.bind({});
File.args = {
  itemType: ItemType.LOCAL_FILE,
};

export const App = Template.bind({});
App.args = {
  itemType: ItemType.APP,
};

export const Document = Template.bind({});
Document.args = {
  itemType: ItemType.DOCUMENT,
};

export const Link = Template.bind({});
Link.args = {
  itemType: ItemType.LINK,
};

export const Collpasible = Template.bind({});
Collpasible.args = {
  isCollapsible: true,
  itemType: ItemType.LINK,
};
