import type { StoryObj } from '@storybook/react';

import { MimeTypes } from '@graasp/sdk';

import { TABLE_CATEGORIES } from '../utils/storybook.js';
import FileAudio from './FileAudio.js';

const meta = {
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
export default meta;

type Story = StoryObj<typeof meta>;

export const MP3Audio = {
  args: {
    id: 'some-audio-file-id',
    url: '/test-assets/sample.mp3',
    type: MimeTypes.Audio.MP3,
  },
  name: 'MP3 Audio',
} satisfies Story;

export const WAVAudio = {
  args: {
    id: 'some-audio-file-id',
    url: '/test-assets/sample.wav',
    type: MimeTypes.Audio.WAV,
  },
} satisfies Story;

export const M4AAudio = {
  args: {
    id: 'some-audio-file-id',
    url: '/test-assets/sample.m4a',
    type: MimeTypes.Audio.MP4_Apple,
  },
  name: 'M4A Audio',
} satisfies Story;

export const AACAudio = {
  args: {
    id: 'some-audio-file-id',
    url: '/test-assets/sample.aac',
    type: MimeTypes.Audio.AAC,
  },
  name: 'AAC Audio',
} satisfies Story;

export const OGGAudio = {
  args: {
    id: 'some-audio-file-id',
    url: '/test-assets/sample.ogg',
    type: MimeTypes.Audio.OGG,
  },
  name: 'OGG Audio',
} satisfies Story;
