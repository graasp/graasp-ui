import type { Meta, StoryObj } from '@storybook/react';

import { CCLicenseAdaption } from '../constants';
import { TABLE_CATEGORIES } from '../utils/storybook';
import CCLicenseIcon from './CCLicenseIcon';

const meta: Meta<typeof CCLicenseIcon> = {
  title: 'Icons/CCLicenseIcon',
  component: CCLicenseIcon,

  argTypes: {
    sx: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof CCLicenseIcon>;

export const Alike: Story = {
  args: { adaption: CCLicenseAdaption.ALIKE },
};

export const Allow: Story = {
  args: { sx: { m: 1 }, adaption: CCLicenseAdaption.ALLOW },
};
