import { ComponentMeta, ComponentStory } from '@storybook/react';

import React from 'react';

import TextEditor from './TextEditor';

export default {
  title: 'Common/TextEditor',
  component: TextEditor,
} as ComponentMeta<typeof TextEditor>;

const Template: ComponentStory<typeof TextEditor> = (args) => (
  <TextEditor {...args}>{args.children}</TextEditor>
);

export const ReadMode = Template.bind({});
ReadMode.args = {
  value: 'my text here',
};

export const EmptyReadMode = Template.bind({});
EmptyReadMode.args = {
  value: '',
};

export const EditMode = Template.bind({});
EditMode.args = {
  value: 'my text here',
  edit: true,
};
