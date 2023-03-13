import { ComponentMeta, ComponentStory } from '@storybook/react';

import AcUnitIcon from '@mui/icons-material/AcUnit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';

import React from 'react';

import ItemBadges from '../ItemBadges/ItemBadges';
import { TABLE_CATEGORIES } from '../utils/storybook';
import Card from './Card';

export default {
  title: 'Common/Card',
  component: Card,

  argTypes: {
    sx: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
  },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Example = Template.bind({});
Example.args = {
  name: 'my card title',
  description:
    'my card description might be really long that is why we cut it after some lines of text to allow some space for more data',
  image: 'https://picsum.photos/200/100',
  creator: 'graasp',
  Actions: (
    <>
      <IconButton>
        <AcUnitIcon />
      </IconButton>
      <IconButton>
        <AcUnitIcon />
      </IconButton>
      <IconButton>
        <AcUnitIcon />
      </IconButton>
    </>
  ),
  ItemMenu: (
    <IconButton>
      <MoreVertIcon />
    </IconButton>
  ),
};

export const Badges = Template.bind({});
Badges.args = {
  name: 'my card title',
  description:
    'my card description might be really long that is why we cut it after some lines of text to allow some space for more data',
  image: 'https://picsum.photos/200/100',
  creator: 'graasp',
  Actions: (
    <>
      <IconButton>
        <AcUnitIcon />
      </IconButton>
      <IconButton>
        <AcUnitIcon />
      </IconButton>
      <IconButton>
        <AcUnitIcon />
      </IconButton>
    </>
  ),
  Badges: <ItemBadges isHidden isPublic isPublished isPinned />,
  ItemMenu: (
    <IconButton>
      <MoreVertIcon />
    </IconButton>
  ),
};

export const NoActions = Template.bind({});
NoActions.args = {
  name: 'my card title',
  description:
    'my card description might be really long that is why we cut it after some lines of text to allow some space for more data and we can see the overflow also here it i going to be visible ?',
  image: 'https://picsum.photos/100/100',
  creator: 'graasp',
  ItemMenu: (
    <IconButton>
      <MoreVertIcon />
    </IconButton>
  ),
};

export const TallCard = Template.bind({});
TallCard.args = {
  name: 'my card title',
  description:
    'my card description might be really long that is why we cut it after some lines of text to allow some space for more data',
  image: 'https://picsum.photos/200/500',
  creator: 'graasp',
  height: 300,
  Actions: (
    <>
      <IconButton>
        <AcUnitIcon />
      </IconButton>
      <IconButton>
        <AcUnitIcon />
      </IconButton>
      <IconButton>
        <AcUnitIcon />
      </IconButton>
    </>
  ),
  ItemMenu: (
    <IconButton>
      <MoreVertIcon />
    </IconButton>
  ),
};
