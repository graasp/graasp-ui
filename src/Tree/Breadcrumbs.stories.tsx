import { TABLE_CATEGORIES } from '@/utils/storybook';
import { expect } from '@storybook/jest';
import { Meta, type StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import Breadcrumbs from './Breadcrumbs';

const elements = [
  { id: 'element-1', name: 'element-1', path: 'element_1' },
  { id: 'element-2', name: 'element-2', path: 'element_2' },
  { id: 'element-3', name: 'element-3', path: 'element_3' },
];

const meta = {
  title: 'Common/Tree/Breadcrumbs',
  component: Breadcrumbs,

  argTypes: {
    onSelect: {
      table: {
        category: TABLE_CATEGORIES.EVENTS,
      },
      action: 'onselect',
    },
  },
} satisfies Meta<typeof Breadcrumbs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    elements,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const el = canvas.getByText(args.elements[0].name);
    expect(el).toBeVisible();
    await userEvent.click(el);
    expect(args.onSelect).toHaveBeenCalled();
  },
} satisfies Story;

export const WithRootElements = {
  args: {
    elements,
    rootElements: [
      { id: 'root-1', name: 'root-1', path: 'root_1' },
      { id: 'root-2', name: 'root-2', path: 'root_2' },
    ],
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const el = canvas.getByText(args.elements[0].name);
    expect(el).toBeVisible();
    await userEvent.click(el);
    expect(args.onSelect).toHaveBeenCalled();

    const rootEl = canvas.getByText(args.rootElements![0].name);
    expect(rootEl).toBeVisible();
    await userEvent.click(rootEl);
    expect(args.onSelect).toHaveBeenCalled();
  },
} satisfies Story;

export const ShowFirstRoot = {
  args: {
    elements: [],
    selectedId: 'root-1',
    rootElements: [
      { id: 'root-1', name: 'root-1', path: 'root_1' },
      { id: 'root-2', name: 'root-2', path: 'root_2' },
    ],
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const el = canvas.getByText(args.rootElements![0].name);
    expect(el).toBeVisible();
    await userEvent.click(el);
    expect(args.onSelect).toHaveBeenCalled();
  },
} satisfies Story;
