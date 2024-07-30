import { Meta, StoryObj, composeStories } from '@storybook/react';

import { Unstable_Grid2 as Grid2 } from '@mui/material';

import { PackedFolderItemFactory } from '@graasp/sdk';

import ItemBadges from '@/ItemBadges/ItemBadges.js';

import * as CardStories from './Card.stories.js';

const { FullWidth, Dense } = composeStories(CardStories);

const data = Array.from({ length: 12 }, () => PackedFolderItemFactory());

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

export const GridOfDenseCards = {
  args: {
    xs: 12,
  },
  render: ({ xs }) => {
    return (
      <Grid2 container spacing={2}>
        {data.map((item) => (
          <Grid2 key={item.id} xs={xs}>
            <Dense
              creator={item.creator?.name}
              name={item.name}
              content={
                <Grid2 container columns={{ xs: 12 }}>
                  <Grid2 xs={12} md={6}>
                    {item.type}
                  </Grid2>
                  <Grid2 xs={12} md={6}>
                    {item.createdAt}
                  </Grid2>
                </Grid2>
              }
              fullWidth
              footer={
                <ItemBadges
                  isCollapsible={item.settings.isCollapsible}
                  isHidden={Boolean(item.hidden)}
                />
              }
            />
          </Grid2>
        ))}
      </Grid2>
    );
  },
} satisfies Story;

export const GridOfDenseWithClickCards = {
  args: {
    xs: 12,
  },
  render: ({ xs }) => {
    return (
      <Grid2 container spacing={2}>
        {data.map((i) => (
          <Grid2 key={`cardno${i}`} xs={xs}>
            <Dense
              creator={i.creator?.name}
              name={i.name}
              to={'to'}
              content={
                <Grid2 container columns={{ xs: 12 }}>
                  <Grid2 xs={12} md={6}>
                    {i.type}
                  </Grid2>
                  <Grid2 xs={12} md={6}>
                    {i.createdAt}
                  </Grid2>
                </Grid2>
              }
              fullWidth
              footer={
                <ItemBadges
                  isCollapsible={i.settings.isCollapsible}
                  isHidden={Boolean(i.hidden)}
                />
              }
            />
          </Grid2>
        ))}
      </Grid2>
    );
  },
} satisfies Story;
