import { expect } from '@storybook/jest';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { screen, userEvent, within } from '@storybook/testing-library';

import React from 'react';

import { Context } from '@graasp/sdk';

import Navigation from './Navigation';

export default {
  title: 'Common/Navigation',
  component: Navigation,
  parameters: {
    backgrounds: {
      values: [
        { name: 'black', value: '#000' },
        { name: 'white', value: '#fff' },
      ],
    },
  },
} as ComponentMeta<typeof Navigation>;

const Template: ComponentStory<typeof Navigation> = (args) => (
  <Navigation {...args} />
);

export const WhiteOnBlackBackground = Template.bind({});
WhiteOnBlackBackground.args = {
  currentValue: Context.BUILDER,
};
WhiteOnBlackBackground.parameters = {
  backgrounds: {
    default: 'black',
  },
};
WhiteOnBlackBackground.play = async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);

  await userEvent.click(canvas.getByText(args.currentValue));

  const listbox = within(screen.getByRole('presentation'));
  expect(listbox.getByText(args.currentValue)).toHaveAttribute(
    'aria-disabled',
    'true',
  );
  await userEvent.click(listbox.getByText(Context.PLAYER));
  await userEvent.click(listbox.getByText(Context.LIBRARY));
};

export const BlackOnWhiteBackground = Template.bind({});
BlackOnWhiteBackground.args = {
  currentValue: Context.PLAYER,
  buttonColor: 'primary',
  buttonClassname: 'blackColor',
  triangleClassname: 'blackBorderTop',
};
BlackOnWhiteBackground.parameters = {
  backgrounds: {
    default: 'white',
  },
};
BlackOnWhiteBackground.play = async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);

  await userEvent.click(canvas.getByText(args.currentValue));

  const listbox = within(screen.getByRole('presentation'));
  expect(listbox.getByText(args.currentValue)).toHaveAttribute(
    'aria-disabled',
    'true',
  );
  await userEvent.click(listbox.getByText(Context.BUILDER));
  await userEvent.click(listbox.getByText(Context.LIBRARY));
};
