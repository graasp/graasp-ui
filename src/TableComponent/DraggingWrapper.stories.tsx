import { type Meta, type StoryObj } from '@storybook/react';

import { BrowserRouter } from 'react-router-dom';

import { FolderItemFactory, FolderItemType } from '@graasp/sdk';

import { Card, ItemBadges } from '..';
import DraggingWrapper from './DraggingWrapper';

const makeData = (len: number): FolderItemType[] => {
  return Array.from({ length: len }, () => FolderItemFactory());
};

const meta: Meta<typeof DraggingWrapper> = {
  title: 'Common/DraggingWrapper',
  component: DraggingWrapper,
  decorators: [
    (story) => {
      return <BrowserRouter>{story()}</BrowserRouter>;
    },
  ],

  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof DraggingWrapper>;

export const Default: Story = {
  args: {
    // ts issue
    // https://github.com/TanStack/table/issues/4382
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rows: makeData(6),
    isMovable: true,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    renderComponent: (el: FolderItemType, { isDragging, isOver }) => {
      return (
        <Card
          dense
          alt={el.name}
          creator={el.creator?.name}
          name={el.name}
          content={el.description?.slice(0, 55) ?? ''}
          fullWidth
          footer={<ItemBadges isCollapsible isHidden />}
          to={el.name}
          isDragging={isDragging}
          isOver={isOver}
        />
      );
    },
  },
};

export const DisableDragging: Story = {
  args: {
    // ts issue
    // https://github.com/TanStack/table/issues/4382
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rows: makeData(6),
    isMovable: false,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    renderComponent: (el: FolderItemType) => {
      return (
        <Card
          dense
          alt={el.name}
          creator={el.creator?.name}
          name={el.name}
          content={el.description ?? ''}
          fullWidth
          footer={<ItemBadges isCollapsible isHidden />}
        />
      );
    },
  },
};
