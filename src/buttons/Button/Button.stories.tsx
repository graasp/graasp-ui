import type { Meta, StoryObj } from '@storybook/react';

import { ColorVariants } from '@/types.js';

import { TABLE_CATEGORIES } from '../../utils/storybook.js';
import { GraaspButton as Button } from './Button.js';

const meta: Meta<typeof Button> = {
  title: 'Buttons/Button',
  component: Button,

  argTypes: {
    color: {
      options: Object.keys(ColorVariants).map((x) => x.toLowerCase()),
      control: {
        type: 'radio',
        labels: Object.keys(ColorVariants).map((x) => x.toLowerCase()),
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
  render: (args) => <Button {...args}>{args.children}</Button>,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    color: 'primary',
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    color: 'secondary',
    children: 'Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Button',
  },
};

export const Submit: Story = {
  args: {
    type: 'submit',
    children: 'Submit',
  },
};
