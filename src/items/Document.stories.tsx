import type { Meta, StoryObj } from '@storybook/react';

import FileDocument from './FileDocument';

const meta: Meta<typeof FileDocument> = {
  title: 'Items/Document File',
  component: FileDocument,

  render: (args) => {
    return <FileDocument {...args} />;
  },
};

export default meta;

type Story = StoryObj<typeof FileDocument>;

export const Document: Story = {
  args: {
    uri: 'https://www.lehman.edu/faculty/john/classroomrespolicy1.docx',
  },
};
