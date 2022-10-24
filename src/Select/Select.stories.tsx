import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import { TABLE_CATEGORIES } from '../utils/storybook';
import Select from './Select';

const values = [
  { value: 1, text: 'one' },
  { value: 2, text: 'two' },
  { value: 3, text: 'three' },
];

export default {
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
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => (
  <Select defaultValue={values[0].value} {...args} values={values} />
);

export const Primary = Template.bind({});
Primary.args = {
  color: 'primary',
  label: 'My Label',
};

export const Secondary = Template.bind({});
Secondary.args = {
  color: 'secondary',
  defaultValue: 'none',
  displayEmpty: true,
};

export const Filled = Template.bind({});
Filled.args = {
  variant: 'filled',
};

export const Standard = Template.bind({});
Standard.args = {
  variant: 'standard',
};
