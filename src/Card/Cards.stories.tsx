import { Meta, StoryObj, composeStories } from '@storybook/react';
import { v4 } from 'uuid';

import { Grid } from '@mui/material';

import { PackedFolderItemFactory } from '@graasp/sdk';

import ItemBadges from '@/ItemBadges/ItemBadges.js';

import * as CardStories from './Card.stories.js';

const { FullWidth, Dense } = composeStories(CardStories);

const data = Array.from({ length: 12 }, () => PackedFolderItemFactory());

const meta = {
  title: 'Common/Cards',
  component: Grid,
  argTypes: {
    xs: {
      options: [3, 6, 12],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

const CARD_IDS = Array.from(Array(12)).map(() => v4());

export const GridOfCards = {
  args: {
    xs: 6,
  },
  render: ({ xs }) => {
    return (
      <Grid container spacing={2}>
        {CARD_IDS.map((id) => (
          <Grid key={id} xs={xs}>
            <FullWidth />
          </Grid>
        ))}
      </Grid>
    );
  },
} satisfies Story;

export const GridOfDenseCards = {
  args: {
    xs: 12,
  },
  render: ({ xs }) => {
    return (
      <Grid container spacing={2}>
        {data.map((item) => (
          <Grid key={item.id} xs={xs}>
            <Dense
              creator={item.creator?.name}
              name={item.name}
              content={
                <Grid container columns={{ xs: 12 }}>
                  <Grid xs={12} md={6}>
                    {item.type}
                  </Grid>
                  <Grid xs={12} md={6}>
                    {item.createdAt}
                  </Grid>
                </Grid>
              }
              fullWidth
              footer={
                <ItemBadges
                  isCollapsible={item.settings.isCollapsible}
                  isHidden={Boolean(item.hidden)}
                />
              }
            />
          </Grid>
        ))}
      </Grid>
    );
  },
} satisfies Story;

export const GridOfDenseWithClickCards = {
  args: {
    xs: 12,
  },
  render: ({ xs }) => {
    return (
      <Grid container spacing={2}>
        {data.map((i) => (
          <Grid key={`cardno${i}`} xs={xs}>
            <Dense
              creator={i.creator?.name}
              name={i.name}
              to={'to'}
              content={
                <Grid container columns={{ xs: 12 }}>
                  <Grid xs={12} md={6}>
                    {i.type}
                  </Grid>
                  <Grid xs={12} md={6}>
                    {i.createdAt}
                  </Grid>
                </Grid>
              }
              fullWidth
              footer={
                <ItemBadges
                  isCollapsible={i.settings.isCollapsible}
                  isHidden={Boolean(i.hidden)}
                />
              }
            />
          </Grid>
        ))}
      </Grid>
    );
  },
} satisfies Story;
