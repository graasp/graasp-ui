import TextDisplay from '@/TextDisplay/TextDisplay';

import { Stack } from '@mui/material';

import {
  Alignment,
  AlignmentType,
  DescriptionPlacement,
  DescriptionPlacementType,
  getAlignItemsFromAlignmentSetting,
} from '@graasp/sdk';

const normalizeDescription = (value: string | null | undefined): string => {
  // description may be null or undefined, we return empty string
  if (!value) {
    return '';
  }
  // empty description from quill is a paragraph with an empty line inside,
  // we do not want to display this, so we return empty string
  if (value === '<p><br></p>') {
    return '';
  }
  return value;
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
      const description = normalizeDescription(item.description);
      return (
        <Stack direction={direction} gap={0.5} alignItems={alignItems}>
          {component}
          <TextDisplay content={description} />
        </Stack>
      );
    };

    return <ChildComponent />;
  };
}

export default withCaption;
