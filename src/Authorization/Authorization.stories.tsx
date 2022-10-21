import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import { BuildIcon } from '../icons';
import { ImmutableMember } from '../types';
import withAuthorization from './withAuthorization';

const ComponentWithAuthorization = withAuthorization(BuildIcon, {
  redirectionLink: 'http://redirect.org',
  currentMember: new ImmutableMember({ id: 'member', name: 'member' }),
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
    redirectionLink: 'http://redirect.org',
    currentMember: new ImmutableMember({ id: 'member', name: 'member' }),
  });
  return <Component />;
};
export const Authorized = Template.bind({});
