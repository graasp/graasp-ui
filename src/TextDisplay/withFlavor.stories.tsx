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
    flavor: DocumentItemExtraFlavor.Info,
  },
} satisfies Story;

export const SimpleHtml = {
  args: {
    content: (
      <TextDisplay content='<p>Hello<br/>Next line</p><p>Nice to meet you !</p>' />
    ),
    flavor: DocumentItemExtraFlavor.Info,
  },
} satisfies Story;

export const InformationFlavor = {
  args: {
    content,
    flavor: DocumentItemExtraFlavor.Info,
  },
} satisfies Story;

export const WarningFlavor = {
  args: {
    content,
    flavor: DocumentItemExtraFlavor.Warning,
  },
} satisfies Story;

export const ErrorFlavor = {
  args: {
    content,
    flavor: DocumentItemExtraFlavor.Error,
  },
} satisfies Story;

export const SuccessFlavor = {
  args: {
    content,
    flavor: DocumentItemExtraFlavor.Success,
  },
} satisfies Story;
