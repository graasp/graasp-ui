import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import { convertJs } from '@graasp/sdk';

import { BuildIcon } from '../icons';
import withAuthorization from './withAuthorization';

const redirectionLink = 'http://redirect.org';

const ComponentWithAuthorization = withAuthorization(BuildIcon, {
  redirectionLink,
  currentMember: convertJs({ id: 'member', name: 'member' }),
});

export default {
  title: 'Actions/Autorization',
  component: ComponentWithAuthorization,

  argTypes: {
    onRedirect: { action: 'onRedirect' },
  },
} as ComponentMeta<typeof ComponentWithAuthorization>;

const Template: ComponentStory<typeof ComponentWithAuthorization> = () => {
  const Component = withAuthorization(BuildIcon, {
    redirectionLink,
    currentMember: convertJs({ id: 'member', name: 'member' }),
  });
  return <Component />;
};
export const Authorized = Template.bind({});
