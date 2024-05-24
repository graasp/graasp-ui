import type { Meta, StoryObj } from '@storybook/react';

import { DescriptionPlacement, DescriptionPlacementType } from '@graasp/sdk';

import withCaption, { Alignment, AlignmentType } from './withCaption';

const renderComponent = ({
  description,
  descriptionPlacement = DescriptionPlacement.BELOW,
  alignment,
}: {
  description: string;
  descriptionPlacement: DescriptionPlacementType;
  alignment: AlignmentType;
}): JSX.Element =>
  withCaption({
    item: {
      description,
      settings: { descriptionPlacement, alignment },
    },
  })(<img src='https://picsum.photos/500' height='100%' />);

const meta: Meta<typeof renderComponent> = {
  title: 'Common/withCaption',
  render: renderComponent,
  argTypes: {
    descriptionPlacement: {
      control: 'radio',
      options: Object.values(DescriptionPlacement),
    },
    alignment: {
      control: 'radio',
      options: Object.values(Alignment),
    },
  },
  args: {
    description: 'My description',
    descriptionPlacement: DescriptionPlacement.BELOW,
    alignment: Alignment.Left,
  },
};

export default meta;

type Story = StoryObj<typeof renderComponent>;

export const CaptionOnImage = {} satisfies Story;
