import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Box } from '@mui/material';

import React from 'react';

import CreativeCommons from '.';
import { CCSharing } from '../types';

export default {
  title: 'Common/CreativeCommons',
  component: CreativeCommons,

  argTypes: {
    requireAccreditation: {
      name: 'Require Accreditation',
      defaultValue: true,
    },
    allowSharedAdaptation: {
      name: 'Allow Shared Adaptation',
      options: Object.keys(CCSharing)
        .map((x) => Number(x))
        .filter((x) => !Number.isNaN(x)),
      control: {
        type: 'radio',
        labels: Object.keys(CCSharing).filter((x) => Number.isNaN(Number(x))),
      },
      if: { arg: 'requireAccreditation', truthy: true },
    },
    allowCommercialUse: {
      name: 'Allow Commercial Use',
      if: { arg: 'requireAccreditation', truthy: true },
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
  allowSharedAdaptation: CCSharing.Yes,
  iconSize: 50,
};

export const CC0 = Template.bind({});
CC0.args = {
  requireAccreditation: false,
  allowCommercialUse: true,
  allowSharedAdaptation: CCSharing.Yes,
  iconSize: 50,
};

export const NoDerivatives = Template.bind({});
NoDerivatives.args = {
  requireAccreditation: true,
  allowCommercialUse: true,
  allowSharedAdaptation: CCSharing.No,
  iconSize: 50,
};

export const NoncommercialShareAlike = Template.bind({});
NoncommercialShareAlike.args = {
  requireAccreditation: true,
  allowCommercialUse: false,
  allowSharedAdaptation: CCSharing.Alike,
  iconSize: 50,
};
