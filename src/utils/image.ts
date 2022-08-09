import { EmbeddedLinkItemExtra } from '../types';
import { getEmbeddedLinkExtra } from './itemExtra';

export const getItemImage = ({
  url,
  extra,
  defaultImage,
  extraThumbnail,
}: {
  url?: string;
  extra?: EmbeddedLinkItemExtra;
  defaultImage?: string;
  extraThumbnail?: string;
}): string | null | undefined => {
  if (url) {
    return url;
  }
  const linkThumbnail = getEmbeddedLinkExtra(extra)?.thumbnails?.get(0);
  if (linkThumbnail) {
    return linkThumbnail;
  }
  if (extraThumbnail) {
    return extraThumbnail;
  }
  if (defaultImage) {
    return defaultImage;
  }

  return null;
};
