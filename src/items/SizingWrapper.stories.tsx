import { Meta, StoryObj } from '@storybook/react';

import { Container } from '@mui/material';

import { MaxWidth } from '@graasp/sdk';

import { SizingWrapper } from './SizingWrapper.js';

const children = <img width='100%' src='https://picsum.photos/1000' />;

const meta = {
  title: 'Items/SizingWrapper',
  component: SizingWrapper,
  decorators: [
    (Story) => {
      return <Container maxWidth='lg'>{Story()}</Container>;
    },
  ],

  args: {
    children,
  },
  argTypes: {
    size: {
      control: 'radio',
      options: Object.values(MaxWidth),
    },
  },
} satisfies Meta<typeof SizingWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    size: MaxWidth.Medium,
  },
} satisfies Story;

export const TallImage = {
  args: {
    size: MaxWidth.Medium,
    children: <img width='100%' src='https://picsum.photos/1000/3000' />,
  },
};

export const AllSizes = {
  render: () =>
    Object.values(MaxWidth).map((size) => (
      <SizingWrapper size={size} key={size}>
        {children}
      </SizingWrapper>
    )),
};
