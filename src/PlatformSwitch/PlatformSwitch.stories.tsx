import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import PlatformSwitch from './PlatformSwitch';

export default {
  title: 'Common/PlatformSwitch',
  component: PlatformSwitch,
} as ComponentMeta<typeof PlatformSwitch>;

const Template: ComponentStory<typeof PlatformSwitch> = (args) => (
  <PlatformSwitch {...args} />
);

export const Example = Template.bind({});
