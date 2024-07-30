import { expect } from '@storybook/jest';
import type { StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import type { BoundFunctions } from '@testing-library/dom';
import { queries } from '@testing-library/dom';
import { Snowflake } from 'lucide-react';

import { PRIMARY_COLOR, SECONDARY_COLOR } from '../theme.js';
import PlatformSwitch, { PlatformSwitchProps } from './PlatformSwitch.js';
import { Platform } from './hooks.js';

export default {
  title: 'Main/PlatformSwitch',
  component: PlatformSwitch,
};

const MOCK_PLATFORM_PROPS = {
  [Platform.Builder]: {
    href: 'builder',
  },
  [Platform.Player]: {
    href: 'player',
  },
  [Platform.Library]: {
    href: 'library',
  },
  [Platform.Analytics]: {
    href: 'analytics',
  },
};

type Story = StoryObj<typeof PlatformSwitch>;

const checkHref = async (
  canvas: BoundFunctions<typeof queries>,
  platform: Platform,
  platformsProps: PlatformSwitchProps['platformsProps'],
): Promise<void> => {
  const button = await canvas.findByTestId(platform);

  if (platformsProps) {
    const selectedPlatformProps = platformsProps[platform];
    if (selectedPlatformProps) {
      const href = selectedPlatformProps.href;
      expect(button).toHaveAttribute('href', href);
    }
  }
};

export const Light: Story = {
  args: {
    color: PRIMARY_COLOR,
    accentColor: SECONDARY_COLOR,
    selected: Platform.Builder,
    platformsProps: MOCK_PLATFORM_PROPS,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    checkHref(canvas, Platform.Builder, args.platformsProps);
    checkHref(canvas, Platform.Player, args.platformsProps);
    checkHref(canvas, Platform.Analytics, args.platformsProps);
    checkHref(canvas, Platform.Library, args.platformsProps);
  },
};

export const Dark: Story = {
  args: {
    color: SECONDARY_COLOR,
    accentColor: PRIMARY_COLOR,
    selected: Platform.Builder,
    platformsProps: MOCK_PLATFORM_PROPS,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    checkHref(canvas, Platform.Builder, args.platformsProps);
    checkHref(canvas, Platform.Player, args.platformsProps);
    checkHref(canvas, Platform.Analytics, args.platformsProps);
    checkHref(canvas, Platform.Library, args.platformsProps);
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
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    checkHref(canvas, Platform.Builder, args.platformsProps);
    checkHref(canvas, Platform.Player, args.platformsProps);
    checkHref(canvas, Platform.Library, args.platformsProps);

    // disabled
    const button = await canvas.findByTestId(Platform.Analytics);
    if (args.platformsProps) {
      const selectedPlatformProps = args.platformsProps[Platform.Analytics];
      if (selectedPlatformProps) {
        const href = selectedPlatformProps.href;
        expect(button).toHaveAttribute('href', href);
      }
    }
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
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    checkHref(canvas, Platform.Builder, args.platformsProps);
    checkHref(canvas, Platform.Player, args.platformsProps);
    checkHref(canvas, Platform.Analytics, args.platformsProps);
    checkHref(canvas, Platform.Library, args.platformsProps);
  },
};

export const Mobile: Story = {
  args: {
    color: PRIMARY_COLOR,
    accentColor: SECONDARY_COLOR,
    selected: Platform.Builder,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = (await canvas.findByRole('navigation')).firstChild;
    await userEvent.hover(button as Element);
    await canvas.findByLabelText(Platform.Player);
    await canvas.findByLabelText(Platform.Builder);
    await canvas.findByLabelText(Platform.Library);
    await canvas.findByLabelText(Platform.Analytics);
  },
};

export const CustomIconForMobile: Story = {
  args: {
    color: PRIMARY_COLOR,
    accentColor: SECONDARY_COLOR,
    CustomMobileIcon: (props) => <Snowflake {...props} />,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = (await canvas.findByRole('navigation')).firstChild;
    await userEvent.hover(button as Element);
    await canvas.findByLabelText(Platform.Player);
    await canvas.findByLabelText(Platform.Builder);
    await canvas.findByLabelText(Platform.Library);
    await canvas.findByLabelText(Platform.Analytics);
  },
};
