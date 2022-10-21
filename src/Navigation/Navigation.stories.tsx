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

export const White = Template.bind({});
White.args = {
  currentValue: Context.BUILDER,
};
White.parameters = {
  backgrounds: {
    default: 'black',
  },
};
White.play = async ({ canvasElement, args }) => {
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

export const Black = Template.bind({});
Black.args = {
  currentValue: Context.PLAYER,
  buttonColor: 'primary',
  buttonClassname: 'blackColor',
  triangleClassname: 'blackBorderTop',
};
Black.parameters = {
  backgrounds: {
    default: 'white',
  },
};
Black.play = async ({ canvasElement, args }) => {
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
