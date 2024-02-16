import { Meta, StoryObj } from '@storybook/react';

import TextDisplay from './TextDisplay';
import { HTML_CONTENT, HTML_TABLE, STYLED_HTML_TABLE } from './fixtures';

const meta = {
  title: 'Text/TextDisplay',
  component: TextDisplay,
} satisfies Meta<typeof TextDisplay>;
export default meta;
type Story = StoryObj<typeof meta>;

export const SimpleText = {
  args: {
    content: 'Hello I am some text',
  },
} satisfies Story;

export const QuillContent = {
  args: {
    content: HTML_CONTENT,
  },
} satisfies Story;

export const HtmlTable = {
  args: {
    content: HTML_TABLE,
  },
} satisfies Story;

export const EntireHtmlDocument = {
  args: {
    content: STYLED_HTML_TABLE,
  },
} satisfies Story;
