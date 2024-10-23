import { Meta, StoryObj, composeStories } from '@storybook/react';
import { v4 } from 'uuid';

import { Grid2 as Grid } from '@mui/material';

import { PackedFolderItemFactory } from '@graasp/sdk';

import ItemBadges from '@/ItemBadges/ItemBadges.js';

import * as CardStories from './Card.stories.js';

const { FullWidth, Dense } = composeStories(CardStories);

const data = Array.from({ length: 12 }, () => PackedFolderItemFactory());

const meta = {
  title: 'Common/Cards',
  component: Grid,
  argTypes: {
    size: {
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
    size: 6,
  },
  render: ({ size }) => {
    return (
      <Grid container spacing={2}>
        {CARD_IDS.map((id) => (
          <Grid key={id} size={size}>
            <FullWidth />
          </Grid>
        ))}
      </Grid>
    );
  },
} satisfies Story;

export const GridOfDenseCards = {
  args: {
    size: 12,
  },
  render: ({ size }) => {
    return (
      <Grid container spacing={2}>
        {data.map((item) => (
          <Grid key={item.id} size={size}>
            <Dense
              creator={item.creator?.name}
              name={item.name}
              content={
                <Grid container columns={{ xs: 12 }}>
                  <Grid size={{ xs: 12, md: 6 }}>{item.type}</Grid>
                  <Grid size={{ xs: 12, md: 6 }}>{item.createdAt}</Grid>
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
    size: 12,
  },
  render: ({ size }) => {
    return (
      <Grid container spacing={2}>
        {data.map((i) => (
          <Grid key={`cardno${i}`} size={size}>
            <Dense
              creator={i.creator?.name}
              name={i.name}
              to={'to'}
              content={
                <Grid container columns={{ xs: 12 }}>
                  <Grid size={{ xs: 12, md: 6 }}>{i.type}</Grid>
                  <Grid size={{ xs: 12, md: 6 }}>{i.createdAt}</Grid>
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
