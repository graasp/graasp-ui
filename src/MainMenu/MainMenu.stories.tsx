import type { Meta, StoryObj } from '@storybook/react';
import { CirclePlusIcon, SnowflakeIcon, SparklesIcon } from 'lucide-react';

import { TABLE_CATEGORIES } from '../utils/storybook.js';
import MainMenu from './MainMenu.js';
import { MenuItem } from './MenuItem/MenuItem.js';

const meta: Meta<typeof MainMenu> = {
  title: 'Main/Menu',
  component: MainMenu,

  argTypes: {
    children: {
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
  },
  render: (args) => <MainMenu {...args}>{args.children}</MainMenu>,
};
export default meta;

type Story = StoryObj<typeof MainMenu>;

export const Example: Story = {
  args: {
    children: (
      <>
        <MenuItem text='Item 1' icon={<SnowflakeIcon />} />
        <MenuItem text='Item 2' icon={<CirclePlusIcon />} />
        <MenuItem text='Item 3' icon={<SparklesIcon />} />
      </>
    ),
  },
};
