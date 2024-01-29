import type { Meta, StoryObj } from '@storybook/react';

import { TABLE_CATEGORIES } from '../utils/storybook';
import Collapse from './Collapse';

const meta: Meta<typeof Collapse> = {
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
};

export default meta;

type Story = StoryObj<typeof Collapse>;

export const CollapsedImage: Story = {
  args: {
    title: 'My collapsed element',
  },
};
