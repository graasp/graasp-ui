import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { GraaspButton as Button } from './Button';
import { TABLE_CATEGORIES } from '../utils/storybook';

export default {
  title: 'Button',
  component: Button,

  argTypes: {
    color: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    size: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    fullWidth: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    startIcon: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    endIcon: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    autoFocus: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    disabled: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    component: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    variant: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    onClick: {
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>{args.children}</Button>
);

export const Primary = Template.bind({});
Primary.args = {
  color: 'primary',
  children: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  color: 'secondary',
  children: 'Button',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  children: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  children: 'Button',
};
