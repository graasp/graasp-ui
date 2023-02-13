import { expect } from '@storybook/jest';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { screen, userEvent, within } from '@storybook/testing-library';
import { List } from 'immutable';

import React from 'react';

import { convertJs } from '@graasp/sdk';
import { FlagRecord } from '@graasp/sdk/frontend';

import { TABLE_CATEGORIES } from '../utils/storybook';
import ItemFlagDialog from './ItemFlagDialog';

export default {
  title: 'Actions/Flag/ItemFlagDialog',
  component: ItemFlagDialog,

  argTypes: {
    onClose: {
      action: 'onClose',
    },
    onFlag: {
      action: 'onFlag',
    },
    setOpen: {
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
  },
} as ComponentMeta<typeof ItemFlagDialog>;

const flags: List<FlagRecord> = convertJs([
  { id: 'flag-1', name: 'flag-1' },
  { id: 'flag-2', name: 'flag-2' },
  { id: 'flag-3', name: 'flag-3' },
]);

const Template: ComponentStory<typeof ItemFlagDialog> = (args) => (
  <ItemFlagDialog {...args} flags={flags} open />
);

export const Primary = Template.bind({});
Primary.args = {};

Primary.play = async () => {
  const modal = within(screen.getByRole('dialog'));

  flags.forEach(({ name }) => {
    expect(modal.getByText(name)).toBeInTheDocument();
  });

  await userEvent.click(modal.getByText('Cancel'));
  expect(modal.getByText('Flag')).toBeDisabled();

  // choose a flag and validate
  const flagName = flags.first()?.name;
  if (flagName) {
    await userEvent.click(modal.getByText(flagName));
  }
  await userEvent.click(modal.getByText('Flag'));
};
