import type { Meta, StoryObj } from '@storybook/react';

import { ColorVariants } from '@/types.js';

import { TABLE_CATEGORIES } from '../../utils/storybook.js';
import { GraaspButton as Button } from './Button.js';

const meta: Meta<typeof Button> = {
  title: 'Buttons/Button',
  component: Button,

  argTypes: {
    color: {
      options: Object.values(ColorVariants),
      control: {
        type: 'radio',
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

export const Primary = {
  args: {
    color: 'primary',
    children: 'Button',
  },
} satisfies Story;

export const Builder = {
  args: {
    color: 'builder',
    children: 'Button',
  },
} satisfies Story;

export const Secondary = {
  args: {
    color: 'secondary',
    children: 'Button',
  },
} satisfies Story;

export const Large = {
  args: {
    size: 'large',
    children: 'Button',
  },
} satisfies Story;

export const Small = {
  args: {
    size: 'small',
    children: 'Button',
  },
} satisfies Story;

export const Submit = {
  args: {
    type: 'submit',
    children: 'Submit',
  },
} satisfies Story;
