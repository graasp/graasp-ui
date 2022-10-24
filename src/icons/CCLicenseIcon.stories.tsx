import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import { CCLicenseAdaption } from '../constants';
import { TABLE_CATEGORIES } from '../utils/storybook';
import CCLicenseIcon from './CCLicenseIcon';

export default {
  title: 'Icons/CCLicenseIcon',
  component: CCLicenseIcon,

  argTypes: {
    sx: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
  },
} as ComponentMeta<typeof CCLicenseIcon>;

const Template: ComponentStory<typeof CCLicenseIcon> = (args) => (
  <CCLicenseIcon {...args} />
);

export const Alike = Template.bind({});
Alike.args = { adaption: CCLicenseAdaption.ALIKE };

export const Allow = Template.bind({});
Allow.args = { sx: { m: 1 }, adaption: CCLicenseAdaption.ALLOW };
