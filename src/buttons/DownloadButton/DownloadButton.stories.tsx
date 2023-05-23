import type { StoryObj } from '@storybook/react';

import { TABLE_CATEGORIES } from '../../utils/storybook';
import DownloadButton from './DownloadButton';

export default {
  title: 'Buttons/DownloadButton',
  component: DownloadButton,

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

export const Default: Story = {};
