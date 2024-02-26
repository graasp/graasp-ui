import { expect } from '@storybook/jest';
import type { StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import { PRIMARY_COLOR, SECONDARY_COLOR } from '../theme';
import PlatformSwitch, { PlatformSwitchProps } from './PlatformSwitch';
import { Platform } from './hooks';

export default {
  title: 'Common/PlatformSwitch',
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  canvas: any,
  platform: Platform,
  platformsProps: PlatformSwitchProps['platformsProps'],
): Promise<void> => {
  const button = await canvas.findByTestId(platform);
  const href = platformsProps![platform]!.href!;
  expect(button).toHaveAttribute('href', href);
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
    const href = args.platformsProps![Platform.Analytics]!.href!;
    expect(button).toHaveAttribute('href', href);
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
    const button = await canvas.findByLabelText('platform switch dial');
    await userEvent.hover(button);
    await canvas.findByLabelText(Platform.Player);
    await canvas.findByLabelText(Platform.Builder);
    await canvas.findByLabelText(Platform.Library);
    await canvas.findByLabelText(Platform.Analytics);
  },
};
