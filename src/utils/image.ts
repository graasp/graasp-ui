import { DEFAULT_IMAGE_SRC } from '../constants';
import { EmbeddedLinkItemExtra } from '../types';
import { getEmbeddedLinkExtra } from './itemExtra';

export const getItemImage = ({
  url,
  extra,
  useDefault = true,
  defaultImage,
}: {
  url?: string;
  extra: EmbeddedLinkItemExtra;
  useDefault?: boolean;
  defaultImage?: string;
}): string | null => {
  if (url) {
    return url;
  }
  const linkThumbnail = getEmbeddedLinkExtra(extra)?.thumbnails?.[0];
  if (linkThumbnail) {
    return linkThumbnail;
  }

  if (useDefault) {
    return defaultImage ?? DEFAULT_IMAGE_SRC;
  }

  return null;
};
