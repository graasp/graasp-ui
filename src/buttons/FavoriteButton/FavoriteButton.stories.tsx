import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import { TABLE_CATEGORIES } from '../../utils/storybook';
import FavoriteButton from './FavoriteButton';

export default {
  title: 'Buttons/FavoriteButton',
  component: FavoriteButton,

  argTypes: {
    size: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    color: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
    handleFavorite: {
      action: 'add to favorites',
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
    handleUnfavorite: {
      action: 'remove from favorites',
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
    },
  },
} as ComponentMeta<typeof FavoriteButton>;

const Template: ComponentStory<typeof FavoriteButton> = (args) => (
  <FavoriteButton {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const IsFavorite = Template.bind({});
IsFavorite.args = { isFavorite: true };
