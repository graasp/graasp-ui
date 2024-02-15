import { Meta, StoryObj } from '@storybook/react';

import { DocumentItemExtraFlavor } from '@graasp/sdk';

import { TextDisplay, withFlavor } from '..';
import { HTML_CONTENT } from './fixtures';

const meta = {
  title: 'Text/withFlavor',
  component: withFlavor,
  argTypes: {
    flavor: {
      control: {
        type: 'radio',
        values: Object.values(DocumentItemExtraFlavor),
      },
    },
  },
} satisfies Meta<typeof withFlavor>;
export default meta;
type Story = StoryObj<typeof meta>;

const content = <TextDisplay content={HTML_CONTENT} />;

export const NoFlavor = {
  args: {
    content,
  },
} satisfies Story;

export const TextContent = {
  args: {
    content: 'Hello, this is just pure text',
  },
} satisfies Story;

export const WithTitle = {
  args: {
    content,
    title: 'Info message',
    flavor: 'info',
  },
} satisfies Story;

export const SimpleHtml = {
  args: {
    content: (
      <TextDisplay content='<p>Hello<br/>Next line</p><p>Nice to meet you !</p>' />
    ),
    flavor: 'info',
  },
} satisfies Story;

export const InformationFlavor = {
  args: {
    content,
    flavor: 'info',
  },
} satisfies Story;

export const WarningFlavor = {
  args: {
    content,
    flavor: 'warning',
  },
} satisfies Story;

export const ErrorFlavor = {
  args: {
    content,
    flavor: 'error',
  },
} satisfies Story;

export const SuccessFlavor = {
  args: {
    content,
    flavor: 'success',
  },
} satisfies Story;
