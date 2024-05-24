import type { Meta, StoryObj } from '@storybook/react';

import { CompleteMember } from '@graasp/sdk';

import { BuildIcon } from '../icons';
import withAuthorization from './withAuthorization';

const redirectionLink = 'http://redirect.org';

const ComponentWithAuthorization = withAuthorization(BuildIcon, {
  redirectionLink,
  currentMember: { id: 'member', name: 'member' } as CompleteMember,
});

const meta: Meta<typeof withAuthorization> = {
  title: 'Actions/Authorization',
  component: ComponentWithAuthorization,

  argTypes: {
    onRedirect: { action: 'onRedirect' },
  },
};

export default meta;

type Story = StoryObj<typeof withAuthorization>;

export const Authorized: Story = {
  render: () => {
    const Component = withAuthorization(BuildIcon, {
      redirectionLink,
      currentMember: { id: 'member', name: 'member' } as CompleteMember,
    });
    return <Component />;
  },
};
