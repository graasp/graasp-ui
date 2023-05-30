import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';

import { TABLE_CATEGORIES } from '../utils/storybook';
import Select from './Select';

const values = [
  { value: 1, text: 'one' },
  { value: 2, text: 'two' },
  { value: 3, text: 'three' },
];

const meta: Meta<typeof Select> = {
  title: 'Common/Select',
  component: Select,

  argTypes: {
    buildOptionId: {
      table: {
        category: TABLE_CATEGORIES.SELECTORS,
      },
    },
    className: {
      table: {
        category: TABLE_CATEGORIES.SELECTORS,
      },
    },
    color: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    variant: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    onChange: {
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
  },
  render: (args) => (
    <Select defaultValue={values[0].value} {...args} values={values} />
  ),
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Primary: Story = {
  args: {
    color: 'primary',
    label: 'My Label',
  },
};

export const Secondary: Story = {
  args: {
    color: 'secondary',
    defaultValue: 'none',
    displayEmpty: true,
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
  },
};

export const Standard: Story = {
  args: {
    variant: 'standard',
  },
};
