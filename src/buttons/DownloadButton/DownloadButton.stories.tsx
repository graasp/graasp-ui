import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

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
} as ComponentMeta<typeof DownloadButton>;

const Template: ComponentStory<typeof DownloadButton> = (args) => (
  <DownloadButton {...args} />
);

export const Default = Template.bind({});
Default.args = {};
