import { expect } from '@storybook/jest';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { within } from '@storybook/testing-library';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { BuildIcon } from '../icons';
import withAuthorization from './withAuthorization';

const ComponentWithAuthorization = withAuthorization(BuildIcon, {});

export default {
  title: 'Actions/Autorization/Redirect',
  component: ComponentWithAuthorization,
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
        excludeDecorators: true,
      },
    },
  },
  decorators: [
    (story) => {
      return <BrowserRouter>{story()}</BrowserRouter>;
    },
  ],
} as ComponentMeta<typeof ComponentWithAuthorization>;

const Template: ComponentStory<typeof ComponentWithAuthorization> = (args) => (
  <ComponentWithAuthorization {...args} />
);

export const Redirect = Template.bind({});

Redirect.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await expect(
    canvas.getByText('You are being redirected…'),
  ).toBeInTheDocument();
  // cannot check onRedirect because of the HOC layer
};
