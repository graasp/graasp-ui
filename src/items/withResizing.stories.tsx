import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import withResizing from './withResizing';

const ComponentWithResizing = withResizing({
  height: 100,
  itemId: 'my-item-id',
  component: <img src='https://picsum.photos/500' height='100%' />,
});

export default {
  title: 'Common/withResizing',
  component: ComponentWithResizing,

  argTypes: {
    onRedirect: { action: 'onRedirect' },
  },
} as ComponentMeta<typeof ComponentWithResizing>;

const Template: ComponentStory<typeof ComponentWithResizing> = () => (
  <ComponentWithResizing />
);
export const Authorized = Template.bind({});
