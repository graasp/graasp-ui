import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Box } from '@mui/material';

import React from 'react';

import CreativeCommons from '.';
import { CCSharing } from './CreativeCommons';

export default {
  title: 'Common/CreativeCommons',
  component: CreativeCommons,

  argTypes: {
    allowSharedAdaptation: {
      options: Object.keys(CCSharing)
        .map((x) => Number(x))
        .filter((x) => !Number.isNaN(x)),
      control: {
        type: 'radio',
        labels: Object.keys(CCSharing).filter((x) => Number.isNaN(Number(x))),
      },
    },
  },
} as ComponentMeta<typeof CreativeCommons>;

const Template: ComponentStory<typeof CreativeCommons> = (args) => {
  const boxWidth =
    args.iconSize && Number.isSafeInteger(args.iconSize)
      ? Number(args.iconSize) * 4 + Number(args.iconSize) * 0.4
      : undefined;

  return (
    <Box width={boxWidth}>
      <CreativeCommons {...args} />
    </Box>
  );
};

export const Example = Template.bind({});
Example.args = {
  allowCommercialUse: false,
  allowSharedAdaptation: CCSharing.Yes,
  iconSize: 50,
};

export const NoDerivatives = Template.bind({});
NoDerivatives.args = {
  allowCommercialUse: true,
  allowSharedAdaptation: CCSharing.No,
  iconSize: 50,
};

export const NonCommercialShareAlike = Template.bind({});
NonCommercialShareAlike.args = {
  allowCommercialUse: false,
  allowSharedAdaptation: CCSharing.Alike,
  iconSize: 50,
};
