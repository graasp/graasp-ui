import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { List } from 'immutable';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ItemType, LocalFileItemType, MimeTypes, convertJs } from '@graasp/sdk';
import { ItemRecord } from '@graasp/sdk/frontend';

import { MOCK_MEMBER } from '../utils/fixtures';
import HomeMenu from './HomeMenu';
import ItemMenu, { ItemMenuProps } from './ItemMenu';
import Navigation from './Navigation';

const buildItem = (name: string): ItemRecord =>
  convertJs<LocalFileItemType>({
    id: name,
    name,
    extra: {
      [ItemType.LOCAL_FILE]: {
        path: 'https://picsum.photos/100',
        mimetype: MimeTypes.Image.PNG,
        name: 'original file name',
        size: 2600,
      },
    },
    type: 'file',
    description: 'my image description',
    path: 'item-path',
    settings: {},
    creator: MOCK_MEMBER,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

const meta: Meta<typeof Navigation> = {
  title: 'Common/Navigation',
  component: Navigation,
  decorators: [
    (story) => {
      return <BrowserRouter>{story()}</BrowserRouter>;
    },
  ],

  render: (args) => {
    return <Navigation {...args} />;
  },
};

export default meta;

type Story = StoryObj<typeof Navigation>;
type UseChildrenHookType = ReturnType<ItemMenuProps['useChildren']>;

const item = buildItem('my item');
const parents = List([buildItem('parent 1'), buildItem('parent 2')]);
const children = List([buildItem('child 1'), buildItem('child 2')]);
const useChildren: ItemMenuProps['useChildren'] = (id) => {
  console.debug('show children of ' + id);
  return { data: children } as UseChildrenHookType;
};
const buildToItemPath = (id: string): string => id;
const dataTestId = 'NavigateNextIcon';
const folder = convertJs({
  id: 'folder-id',
  name: 'folder',
  extra: {
    [ItemType.FOLDER]: {
      childrenOrder: [],
    },
  },
  type: ItemType.FOLDER,
  description: 'my image description',
  path: 'item-path',
  settings: {},
  creator: MOCK_MEMBER,
  createdAt: new Date(),
  updatedAt: new Date(),
});

const menu = [
  { name: 'Home', id: 'home', to: 'home' },
  { name: 'Shared Items', id: 'shared', to: 'shared' },
];

export const HomeRoot: Story = {
  args: {
    buildToItemPath,
    useChildren,

    renderRoot: () => {
      return (
        <>
          <HomeMenu selected={menu[0]} elements={menu} />
          <ItemMenu
            itemId={item.id}
            useChildren={() => {
              return {
                data: List([
                  buildItem('Home item 1'),
                  buildItem('Home item 2'),
                ]),
              } as UseChildrenHookType;
            }}
            buildToItemPath={buildToItemPath}
          />
        </>
      );
    },
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 2 x Home
    expect(canvas.getAllByTestId(dataTestId)).toHaveLength(2);
  },
};

export const FolderWithParents: Story = {
  args: {
    buildToItemPath,
    useChildren,
    item: folder,

    renderRoot: () => {
      return (
        <>
          <HomeMenu selected={menu[0]} elements={menu} />
          <ItemMenu
            itemId={item.id}
            useChildren={() => {
              return {
                data: List([
                  buildItem('Home item 1'),
                  buildItem('Home item 2'),
                ]),
              } as UseChildrenHookType;
            }}
            buildToItemPath={buildToItemPath}
          />
        </>
      );
    },
    parents,
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // current item
    expect(canvas.getByText(folder.name)).toBeInTheDocument();

    // check parents
    for (const p of parents.toJS()) {
      const b = canvas.getByText(p!.name);
      expect(b).toBeInTheDocument();
    }

    // 4 = 2 parents + 2 x Home + current item is a folder
    expect(canvas.getAllByTestId(dataTestId)).toHaveLength(5);
  },
};

export const FileWithParents: Story = {
  args: {
    buildToItemPath,
    useChildren,
    item,

    renderRoot: () => {
      return (
        <>
          <HomeMenu selected={menu[0]} elements={menu} />
          <ItemMenu
            itemId={item.id}
            useChildren={() => {
              return {
                data: List([
                  buildItem('Home item 1'),
                  buildItem('Home item 2'),
                ]),
              } as UseChildrenHookType;
            }}
            buildToItemPath={buildToItemPath}
          />
        </>
      );
    },
    parents,
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // current item
    expect(canvas.getByText(item.name)).toBeInTheDocument();

    // check parents
    for (const p of parents.toJS()) {
      const b = canvas.getByText(p!.name);
      expect(b).toBeInTheDocument();
    }

    // 4 = 2 parents + 2 x Home
    expect(canvas.getAllByTestId(dataTestId)).toHaveLength(4);
  },
};
