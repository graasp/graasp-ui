import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import { PRIMARY_COLOR, SECONDARY_COLOR } from '../theme';
import PlatformSwitch, { Platform } from './PlatformSwitch';

export default {
  title: 'Common/PlatformSwitch',
  component: PlatformSwitch,
} as ComponentMeta<typeof PlatformSwitch>;

const Template: ComponentStory<typeof PlatformSwitch> = (args) => (
  <PlatformSwitch {...args} />
);

export const Light = Template.bind({});
Light.args = {
  color: PRIMARY_COLOR,
  accentColor: SECONDARY_COLOR,
  selected: Platform.Builder,
};

export const Dark = Template.bind({});
Dark.args = {
  color: SECONDARY_COLOR,
  accentColor: PRIMARY_COLOR,
  selected: Platform.Builder,
};
Dark.parameters = {
  backgrounds: { default: 'dark' },
};

export const Disabled = Template.bind({});
Disabled.args = {
  color: PRIMARY_COLOR,
  accentColor: SECONDARY_COLOR,
  selected: Platform.Builder,
  platformsProps: {
    Builder: {
      onClick: () => alert('You clicked on Builder'),
    },
    Player: {
      onClick: () => alert('You clicked on Player'),
    },
    Library: {
      onClick: () => alert('You clicked on Library'),
    },
    Analytics: {
      disabled: true,
      // this onClick should not trigger when disabled: true
      onClick: () => alert('You clicked on Analytics'),
    },
  },
};
