import { expect } from '@storybook/jest';
import type { StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { userEvent, within } from '@storybook/testing-library';

import { ActionButton } from '../../types';
import { TABLE_CATEGORIES } from '../../utils/storybook';
import DownloadButton from './DownloadButton';

export default {
  title: 'Buttons/DownloadButton',
  component: DownloadButton,

  args: {
    handleDownload: fn(),
  },
  argTypes: {
    loaderColor: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    loaderSize: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    title: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    placement: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    handleDownload: {
      action: 'click',
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
  },
};

type Story = StoryObj<typeof DownloadButton>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByLabelText('download'));

    expect(args.handleDownload).toHaveBeenCalled();
  },
};

export const MenuItem: Story = {
  args: {
    type: ActionButton.MENU_ITEM,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText('Download'));

    expect(args.handleDownload).toHaveBeenCalled();
  },
};
