import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';

import { BrowserRouter } from 'react-router-dom';

import { BuildIcon } from '../icons';
import withAuthorization from './withAuthorization';

const ComponentWithAuthorization = withAuthorization(BuildIcon, {
  redirectionLink: 'https://graasp.org',
});

// this story is separated from the others
// because the redirection breaks a bit the navigation in storybook
const meta: Meta<typeof ComponentWithAuthorization> = {
  title: 'Actions/Authorization/Redirect',
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
};
export default meta;

type Story = StoryObj<typeof ComponentWithAuthorization>;

export const Redirect: Story = {};

Redirect.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await expect(
    canvas.getByText('You are being redirected…'),
  ).toBeInTheDocument();
  // cannot check onRedirect because of the HOC layer
};
