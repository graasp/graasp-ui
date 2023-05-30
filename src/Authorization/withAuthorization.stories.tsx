import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';

import { convertJs } from '@graasp/sdk';

import { BuildIcon } from '../icons';
import withAuthorization from './withAuthorization';

const redirectionLink = 'http://redirect.org';

const ComponentWithAuthorization = withAuthorization(BuildIcon, {
  redirectionLink,
  currentMember: convertJs({ id: 'member', name: 'member' }),
});

const meta: Meta<typeof withAuthorization> = {
  title: 'Actions/Autorization',
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
      currentMember: convertJs({ id: 'member', name: 'member' }),
    });
    return <Component />;
  },
};
