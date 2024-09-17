import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { BrowserRouter } from 'react-router-dom';

import SignedInWrapper from './SignedInWrapper.js';

// this story is separated from the others
// because the redirection breaks a bit the navigation in storybook
const meta: Meta<typeof SignedInWrapper> = {
  title: 'Actions/Authorization/Redirect',
  component: SignedInWrapper,
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
        excludeDecorators: true,
      },
    },
  },
  render: () => (
    <SignedInWrapper redirectionLink=''>
      <div />
    </SignedInWrapper>
  ),
  decorators: [
    (story) => {
      return <BrowserRouter>{story()}</BrowserRouter>;
    },
  ],
};
export default meta;

type Story = StoryObj<typeof SignedInWrapper>;

export const Redirect = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByText('You are being redirected…'),
    ).toBeInTheDocument();
    // cannot check onRedirect because of the HOC layer
  },
} satisfies Story;
