import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';

import withResizing from './withResizing';

const ComponentWithResizing = withResizing({
  height: 100,
  itemId: 'my-item-id',
  component: <img src='https://picsum.photos/500' height='100%' />,
});

const meta: Meta<typeof ComponentWithResizing> = {
  title: 'Common/withResizing',
  component: ComponentWithResizing,
};

export default meta;

type Story = StoryObj<typeof ComponentWithResizing>;

export const Authorized: Story = {};
