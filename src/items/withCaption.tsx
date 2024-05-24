import TextDisplay from '@/TextDisplay/TextDisplay';

import { Stack } from '@mui/material';

import {
  DescriptionPlacement,
  DescriptionPlacementType,
  UnionOfConst,
} from '@graasp/sdk';

const DEFAULT_ITEM_DESCRIPTION = '';

// NOTE: This is experimental and most likely is going to be moved to sdk when implementing the feature
export const Alignment = {
  Center: 'center',
  Left: 'left',
  Right: 'right',
} as const;
export type AlignmentType = UnionOfConst<typeof Alignment>;

const getAlignItemsFromAlignmentSetting = (
  alignment: AlignmentType,
): 'flex-start' | 'flex-end' | 'center' => {
  switch (alignment) {
    case Alignment.Right:
      return 'flex-end';
    case Alignment.Center:
      return 'center';
    case Alignment.Left:
    default:
      return 'flex-start';
  }
};

type WithCaptionItem = {
  description: string | null;
  settings?: {
    descriptionPlacement?: DescriptionPlacementType;
    alignment?: AlignmentType;
  };
};

type WithCaptionProps<T extends WithCaptionItem> = {
  item: T;
};

function withCaption<T extends WithCaptionItem>({ item }: WithCaptionProps<T>) {
  return (component: JSX.Element): JSX.Element => {
    const ChildComponent = (): JSX.Element => {
      const descriptionPlacement =
        item.settings?.descriptionPlacement ?? 'below';
      const alignmentSetting = item.settings?.alignment ?? Alignment.Left;
      const direction =
        descriptionPlacement === DescriptionPlacement.ABOVE
          ? 'column-reverse'
          : 'column';
      const alignItems = getAlignItemsFromAlignmentSetting(alignmentSetting);
      return (
        <Stack direction={direction} gap={0.5} alignItems={alignItems}>
          {component}
          <TextDisplay content={item.description ?? DEFAULT_ITEM_DESCRIPTION} />
        </Stack>
      );
    };

    return <ChildComponent />;
  };
}

export default withCaption;
