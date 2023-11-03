import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { screen, userEvent, within } from '@storybook/testing-library';

import React from 'react';

import { FlagType } from '@graasp/sdk';

import ItemFlagDialog from './ItemFlagDialog';

const flags: FlagType[] = Object.values(FlagType);

const meta: Meta<typeof ItemFlagDialog> = {
  title: 'Actions/Flag/ItemFlagDialog',
  component: ItemFlagDialog,

  argTypes: {
    onClose: {
      action: 'onClose',
    },
    onFlag: {
      action: 'onFlag',
    },
  },
  render: (args) => <ItemFlagDialog {...args} flags={flags} open />,
};

export default meta;

type Story = StoryObj<typeof ItemFlagDialog>;

export const Primary: Story = {
  args: {},
};

Primary.play = async () => {
  const modal = within(screen.getByRole('dialog'));

  flags.forEach((name) => {
    expect(modal.getByText(name)).toBeInTheDocument();
  });

  await userEvent.click(modal.getByText('Cancel'));
  expect(modal.getByText('Flag')).toBeDisabled();

  // choose a flag and validate
  const flagName = flags[0];
  if (flagName) {
    await userEvent.click(modal.getByText(flagName));
  }
  await userEvent.click(modal.getByText('Flag'));
};
