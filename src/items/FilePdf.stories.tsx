import type { Meta, StoryObj } from '@storybook/react';

import { TABLE_CATEGORIES } from '../utils/storybook.js';
import FilePdf from './FilePdf.js';

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
    url: 'https://pdfobject.com/pdf/sample.pdf',
  },
};
