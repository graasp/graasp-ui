import { Meta, StoryObj, composeStories } from '@storybook/react';

import Grid2 from '@mui/material/Unstable_Grid2';

import * as CardStories from './Card.stories';

const { FullWidth } = composeStories(CardStories);

const meta = {
  title: 'Common/Cards',
  component: Grid2,
  argTypes: {
    xs: {
      options: [3, 6, 12],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Grid2>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GridOfCards = {
  args: {
    xs: 6,
  },
  render: ({ xs }) => {
    return (
      <Grid2 container spacing={2}>
        {Array.from(Array(12)).map((_, i) => (
          <Grid2 key={`cardno${i}`} xs={xs}>
            <FullWidth />
          </Grid2>
        ))}
      </Grid2>
    );
  },
} satisfies Story;
