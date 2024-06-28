import TextDisplay from '@/TextDisplay/TextDisplay';

import { Stack } from '@mui/material';

import { ReactNode } from 'react';

import {
  Alignment,
  AlignmentType,
  DescriptionPlacement,
  DescriptionPlacementType,
  DiscriminatedItem,
  MimeTypes,
  getMimetype,
} from '@graasp/sdk';

export const getDefaultFileAlignmentSetting = (
  mimetype?: string,
): AlignmentType => {
  if (!mimetype) {
    return Alignment.Left;
  }

  switch (true) {
    case MimeTypes.isImage(mimetype):
    case MimeTypes.isAudio(mimetype):
    case MimeTypes.isVideo(mimetype):
    case MimeTypes.isPdf(mimetype):
      return Alignment.Center;

    // unknown mimetype gets
    default:
      return Alignment.Left;
  }
};

const getAlignItemsFromAlignmentSetting = (
  alignment: AlignmentType,
): 'flex-start' | 'flex-end' | 'center' => {
  switch (alignment) {
    case Alignment.Right:
      return 'flex-end';
    case Alignment.Left:
      return 'flex-start';
    case Alignment.Center:
      return 'center';
  }
};

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
  extra?: DiscriminatedItem['extra'];
};

type WithCaptionProps<T extends WithCaptionItem> = {
  item: T;
};

export const CaptionWrapper = <T extends WithCaptionItem>({
  item,
  children,
}: WithCaptionProps<T> & { children: ReactNode }): JSX.Element => {
  const descriptionPlacement = item.settings?.descriptionPlacement ?? 'below';
  const direction =
    descriptionPlacement === DescriptionPlacement.ABOVE
      ? 'column-reverse'
      : 'column';

  const alignment =
    item.settings?.alignment ??
    getDefaultFileAlignmentSetting(
      item.extra ? getMimetype(item.extra) : undefined,
    );

  const alignItems = getAlignItemsFromAlignmentSetting(alignment);
  const description = normalizeDescription(item.description);

  return (
    <Stack direction={direction} gap={0.5} alignItems={alignItems} width='100%'>
      {children}
      <TextDisplay content={description} />
    </Stack>
  );
};

export function withCaption<T extends WithCaptionItem>({
  item,
}: WithCaptionProps<T>) {
  return (component: JSX.Element): JSX.Element => {
    return <CaptionWrapper item={item}>{component}</CaptionWrapper>;
  };
}

export default withCaption;
