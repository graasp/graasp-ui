import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Box } from '@mui/material';

import React from 'react';

import CreativeCommons from '.';
import { PRIMARY_COLOR } from '../theme';
import { CCSharing } from '../types';
import { TABLE_CATEGORIES } from '../utils/storybook';

const TABLE_CATEGORY_LICENSE = 'License';
const TABLE_CATEGORY_APPEARANCE = 'Appearance';

export default {
  title: 'Common/CreativeCommons',
  component: CreativeCommons,

  argTypes: {
    requireAccreditation: {
      name: 'Require Accreditation',
      defaultValue: true,
      table: { category: TABLE_CATEGORY_LICENSE },
    },
    allowSharedAdaptation: {
      name: 'Allow Shared Adaptation',
      options: Object.keys(CCSharing).map((x) => x.toLowerCase()),
      control: {
        type: 'radio',
        labels: Object.keys(CCSharing).map((x) => x.toLowerCase()),
      },
      if: { arg: 'requireAccreditation', truthy: true },
      table: { category: TABLE_CATEGORY_LICENSE },
    },
    allowCommercialUse: {
      name: 'Allow Commercial Use',
      if: { arg: 'requireAccreditation', truthy: true },
      table: { category: TABLE_CATEGORY_LICENSE },
    },

    textColor: {
      name: 'Text Color',
      defaultValue: PRIMARY_COLOR,
      table: { category: TABLE_CATEGORY_APPEARANCE },
    },
    iconSize: {
      name: 'Icon Size',
      defaultValue: 64,
      table: { category: TABLE_CATEGORY_APPEARANCE },
    },
    withLicenseName: {
      name: 'Show License Name',
      defaultValue: true,
      table: { category: TABLE_CATEGORY_APPEARANCE },
    },
    textSize: {
      name: 'License Text Size',
      defaultValue: 16,
      table: { category: TABLE_CATEGORY_APPEARANCE },
    },

    sx: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
  },
} as ComponentMeta<typeof CreativeCommons>;

const Template: ComponentStory<typeof CreativeCommons> = (args) => {
  const boxWidth =
    args.iconSize && Number.isSafeInteger(args.iconSize)
      ? Number(args.iconSize) * 4 + Number(args.iconSize) * 0.4 + 120
      : undefined;

  return (
    <Box width={boxWidth} margin={5}>
      <CreativeCommons {...args} />
    </Box>
  );
};

export const Example = Template.bind({});
Example.args = {
  requireAccreditation: true,
  allowCommercialUse: false,
  allowSharedAdaptation: 'yes',
  iconSize: 50,
};

export const CC0 = Template.bind({});
CC0.args = {
  requireAccreditation: false,
  allowCommercialUse: true,
  allowSharedAdaptation: 'yes',
  iconSize: 50,
};

export const NoDerivatives = Template.bind({});
NoDerivatives.args = {
  requireAccreditation: true,
  allowCommercialUse: true,
  allowSharedAdaptation: 'no',
  iconSize: 50,
};

export const NoncommercialShareAlike = Template.bind({});
NoncommercialShareAlike.args = {
  requireAccreditation: true,
  allowCommercialUse: false,
  allowSharedAdaptation: 'alike',
  iconSize: 50,
};
