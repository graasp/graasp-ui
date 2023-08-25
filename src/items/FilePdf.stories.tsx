import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';

import { TABLE_CATEGORIES } from '../utils/storybook';
import FilePdf from './FilePdf';

const meta: Meta<typeof FilePdf> = {
  title: 'Items/FilePdf',
  component: FilePdf,

  argTypes: {
    sx: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
  },
  render: (args) => {
    return <FilePdf {...args} />;
  },
};

export default meta;

type Story = StoryObj<typeof FilePdf>;

export const Pdf: Story = {
  args: {
    url: 'https://www.africau.edu/images/default/sample.pdf',
  },
};
