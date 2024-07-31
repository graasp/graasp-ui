import type { Meta, StoryObj } from '@storybook/react';

import { TABLE_CATEGORIES } from '../utils/storybook.js';
import Collapse from './Collapse.js';

const meta = {
  title: 'Common/Collapse',
  component: Collapse,

  argTypes: {
    sx: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
  },
  render: (args) => (
    <Collapse {...args}>
      <img src='https://picsum.photos/100' />
    </Collapse>
  ),
} satisfies Meta<typeof Collapse>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CollapsedImage = {
  args: {
    title: 'My collapsed element',
  },
} satisfies Story;
