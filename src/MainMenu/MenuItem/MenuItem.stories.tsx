import { expect } from '@storybook/jest';
import type { StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { userEvent, within } from '@storybook/testing-library';

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

import { TABLE_CATEGORIES } from '../../utils/storybook';
import MenuItem from './MenuItem';

export default {
  title: 'Main/MenuItem',
  component: MenuItem,

  args: {
    onClick: fn(),
  },
  argTypes: {
    children: {
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
    onClick: {
      action: 'click',
    },
  },
};

type Story = StoryObj<typeof MenuItem>;

export const Example: Story = {
  args: {
    icon: <AutoAwesomeIcon />,
    text: 'MenuItem',
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // keydown enter should trigger on click
    await userEvent.type(canvas.getByRole('button'), '{Return}');
    await expect(args.onClick).toHaveBeenCalledTimes(1);

    // mouse click should trigger on click
    await userEvent.click(canvas.getByRole('button'));
    await expect(args.onClick).toHaveBeenCalledTimes(2);
  },
};
