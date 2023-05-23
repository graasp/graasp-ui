import type { StoryObj } from '@storybook/react';

import { PRIMARY_COLOR, SECONDARY_COLOR } from '../theme';
import PlatformSwitch from './PlatformSwitch';
import { Platform } from './hooks';

export default {
  title: 'Common/PlatformSwitch',
  component: PlatformSwitch,
};

type Story = StoryObj<typeof PlatformSwitch>;

export const Light: Story = {
  args: {
    color: PRIMARY_COLOR,
    accentColor: SECONDARY_COLOR,
    selected: Platform.Builder,
  },
};

export const Dark: Story = {
  args: {
    color: SECONDARY_COLOR,
    accentColor: PRIMARY_COLOR,
    selected: Platform.Builder,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const Disabled: Story = {
  args: {
    color: PRIMARY_COLOR,
    accentColor: SECONDARY_COLOR,
    selected: Platform.Builder,
    platformsProps: {
      Analytics: {
        disabled: true,
      },
    },
  },
};

export const CustomTooltips: Story = {
  args: {
    color: PRIMARY_COLOR,
    accentColor: SECONDARY_COLOR,
    selected: Platform.Builder,
    platformsProps: {
      Builder: {
        tooltip: 'Platform 1',
      },
      Player: {
        tooltip: 'Platform 2',
      },
      Library: {
        disabled: true,
        tooltip: 'Platform 3',
      },
      Analytics: {
        tooltip: 'Platform 4',
        placement: 'right',
      },
    },
  },
};
