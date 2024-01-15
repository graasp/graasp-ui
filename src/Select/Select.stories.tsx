import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';

import { TABLE_CATEGORIES } from '../utils/storybook';
import Select from './Select';

const values = [
  { value: 1, text: 'one' },
  { value: 2, text: 'two', disabled: true },
  { value: 3, text: 'three' },
];
const valuesAllDisabled = [
  { value: 1, text: 'one', disabled: true },
  { value: 2, text: 'two', disabled: true },
  { value: 3, text: 'three', disabled: true },
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
  render: ({ values, ...args }) => <Select {...args} values={values} />,
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Primary: Story = {
  args: {
    color: 'primary',
    label: 'My Label',
    defaultValue: values[0].value,
    values,
  },
};

export const Secondary: Story = {
  args: {
    color: 'secondary',
    defaultValue: undefined,
    displayEmpty: true,
    values,
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    values,
  },
};

export const Standard: Story = {
  args: {
    variant: 'standard',
    values: values,
  },
};

export const AllDisabled: Story = {
  args: {
    variant: 'standard',
    values: valuesAllDisabled,
    defaultValue: valuesAllDisabled[0].value,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'admin',
    values: [
      { value: 'admin', text: 'admin' },
      { value: 'read', text: 'read' },
    ],
  },
};
