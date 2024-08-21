import type { StoryObj } from '@storybook/react';

import { MimeTypes } from '@graasp/sdk';

import { TABLE_CATEGORIES } from '../utils/storybook.js';
import FileAudio from './FileAudio.js';

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
};

type Story = StoryObj<typeof FileAudio>;

export const MP3Audio: Story = {
  args: {
    id: 'some-audio-file-id',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Heart_Monitor_Beep--freesound.org.mp3',
    type: MimeTypes.Audio.MP3, // should be mp3 format
  },
};
MP3Audio.storyName = 'MP3 Audio';

export const WAVAudio: Story = {
  args: {
    id: 'some-audio-file-id',
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Bigroom_kick.wav',
    type: MimeTypes.Audio.WAV, // should be wav format
  },
};
