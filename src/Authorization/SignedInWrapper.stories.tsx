import type { Meta, StoryObj } from '@storybook/react';

import { CompleteMember } from '@graasp/sdk';

import BuildIcon from '@/icons/BuildIcon.js';

import SignedInWrapper from './SignedInWrapper.js';

const redirectionLink = 'http://redirect.org';

const meta: Meta<typeof SignedInWrapper> = {
  title: 'Actions/SignedInWrapper',
  component: SignedInWrapper,

  argTypes: {
    onRedirect: { action: 'onRedirect' },
  },
};

export default meta;

type Story = StoryObj<typeof SignedInWrapper>;

export const Authorized: Story = {
  render: () => (
    <SignedInWrapper
      redirectionLink={redirectionLink}
      currentAccount={{ id: 'member', name: 'member' } as CompleteMember}
    >
      <BuildIcon />
      <BuildIcon />
      <BuildIcon />
    </SignedInWrapper>
  ),
};
