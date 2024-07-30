import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';

import { TABLE_CATEGORIES } from '../utils/storybook.js';
import Select from './Select.js';

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

export const Simple: Story = {
  args: {
    color: 'primary',
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

export const AllDisabled = {
  args: {
    variant: 'standard',
    values: valuesAllDisabled,
    defaultValue: valuesAllDisabled[0].value,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // this checks that the MUI select is disabled.
    // we can not use the `.toBeDisabled()` as the MUI select is a custom component that does not put a disabled prop on the top level div.
    expect(canvas.getByRole('combobox')).toHaveAttribute(
      'aria-disabled',
      'true',
    );
  },
} satisfies Story;

export const Disabled = {
  args: {
    id: 'select-id',
    disabled: true,
    defaultValue: 'admin',
    values: [
      { value: 'admin', text: 'admin' },
      { value: 'read', text: 'read' },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // this checks that the MUI select is disabled.
    // we can not use the `.toBeDisabled()` as the MUI select is a custom component that does not put a disabled prop on the top level div.
    expect(canvas.getByRole('combobox')).toHaveAttribute(
      'aria-disabled',
      'true',
    );
  },
} satisfies Story;
