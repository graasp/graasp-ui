import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import { MimeTypes } from '@graasp/sdk';

import { TABLE_CATEGORIES } from '../utils/storybook';
import FileAudio from './FileAudio';

export default {
  title: 'Items/FileAudio',
  component: FileAudio,

  argTypes: {
    sx: {
      table: {
        category: TABLE_CATEGORIES.MUI,
      },
    },
  },
} as ComponentMeta<typeof FileAudio>;

const Template: ComponentStory<typeof FileAudio> = (args) => (
  <FileAudio {...args} />
);

export const MP3Audio = Template.bind({});
MP3Audio.args = {
  id: 'some-audio-file-id',
  url: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Heart_Monitor_Beep--freesound.org.mp3',
  type: MimeTypes.Audio.MP3, // should be mp3 format
};
MP3Audio.storyName = 'MP3 Audio';

export const WAVAudio = Template.bind({});
WAVAudio.args = {
  id: 'some-audio-file-id',
  url: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Bigroom_kick.wav',
  type: MimeTypes.Audio.WAV, // should be wav format
};
