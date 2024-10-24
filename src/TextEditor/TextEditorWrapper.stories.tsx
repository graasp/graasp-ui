import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';

import { useState } from 'react';

import TextEditor, { TextEditorProps } from './TextEditor.js';

const BUTTON_ID = 'button-id';
const NEW_PLACEHOLDER_TEXT = 'new placeholder text';
const TextEditorWrapper = (args: TextEditorProps): JSX.Element => {
  const [placeholder, setPlaceholder] = useState(args.placeholderText);
  return (
    <>
      <button
        data-testid={BUTTON_ID}
        onClick={() => setPlaceholder(NEW_PLACEHOLDER_TEXT)}
      >
        change text
      </button>
      <TextEditor {...args} placeholderText={placeholder} />
    </>
  );
};

const meta = {
  title: 'Text/TextEditorWrapper',
  component: TextEditorWrapper,
  args: {
    onChange: fn(),
    id: 'editor-id',
  },
} satisfies Meta<typeof TextEditor>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Placeholder = {
  args: {
    placeholderText: 'Initial placeholder',
    value: '',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    expect(
      canvasElement
        .querySelector(`[id=${args.id}] .ql-editor`)
        ?.getAttribute('data-placeholder'),
    ).toEqual(args.placeholderText);
    await userEvent.click(canvas.getByTestId(BUTTON_ID));
    expect(
      canvasElement
        .querySelector(`[id=${args.id}] .ql-editor`)
        ?.getAttribute('data-placeholder'),
    ).toEqual(NEW_PLACEHOLDER_TEXT);
  },
} satisfies Story;
