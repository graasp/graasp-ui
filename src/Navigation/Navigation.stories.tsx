import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';

import SettingsIcon from '@mui/icons-material/Settings';

import { BrowserRouter } from 'react-router-dom';

import {
  FolderItemFactory,
  ItemType,
  LocalFileItemFactory,
  LocalFileItemType,
  MimeTypes,
} from '@graasp/sdk';

import { MOCK_MEMBER } from '../utils/fixtures';
import HomeMenu from './HomeMenu';
import ItemMenu, { ItemMenuProps } from './ItemMenu';
import Navigation from './Navigation';

const buildItem = (name: string): LocalFileItemType =>
  LocalFileItemFactory({
    id: name,
    name,
    extra: {
      [ItemType.LOCAL_FILE]: {
        path: 'https://picsum.photos/100',
        mimetype: MimeTypes.Image.PNG,
        name: 'original file name',
        size: 2600,
        content: '',
      },
    },
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
const parents = [buildItem('parent 1'), buildItem('parent 2')];
const children = [buildItem('child 1'), buildItem('child 2')];
const useChildren: ItemMenuProps['useChildren'] = (id) => {
  console.debug('show children of ' + id);
  return { data: children } as UseChildrenHookType;
};
const buildToItemPath = (id: string): string => id;
const dataTestId = 'NavigateNextIcon';
const folder = FolderItemFactory({
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
                data: [buildItem('Home item 1'), buildItem('Home item 2')],
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
                data: [buildItem('Home item 1'), buildItem('Home item 2')],
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
    for (const p of parents) {
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
                data: [buildItem('Home item 1'), buildItem('Home item 2')],
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
    for (const p of parents) {
      const b = canvas.getByText(p!.name);
      expect(b).toBeInTheDocument();
    }

    // 4 = 2 parents + 2 x Home
    expect(canvas.getAllByTestId(dataTestId)).toHaveLength(4);
  },
};

const extraItems = [
  {
    name: 'Settings',
    path: '/settings',
    icon: <SettingsIcon />,
    menuItems: [
      { name: 'Information', path: '/info' },
      { name: 'Settings', path: '/settings' },
      { name: 'Publish', path: '/publish' },
    ],
  },
];

export const FolderWithParentsWithExtraItems: Story = {
  args: {
    buildToItemPath,
    useChildren,
    item: folder,
    maxItems: 10,
    renderRoot: () => {
      return (
        <>
          <HomeMenu selected={menu[0]} elements={menu} />
          <ItemMenu
            itemId={item.id}
            useChildren={() => {
              return {
                data: [buildItem('Home item 1'), buildItem('Home item 2')],
              } as UseChildrenHookType;
            }}
            buildToItemPath={buildToItemPath}
          />
        </>
      );
    },
    parents,
    extraItems,
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // current item
    expect(canvas.getByText(folder.name)).toBeInTheDocument();

    // check parents
    for (const p of parents) {
      const b = canvas.getByText(p!.name);
      expect(b).toBeInTheDocument();
    }

    // 4 = 2 parents + 2 x Home + current item is a folder + 1 extra item
    expect(canvas.getAllByTestId(dataTestId)).toHaveLength(6);
  },
};
