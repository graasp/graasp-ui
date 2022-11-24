import { EmbeddedLinkItemExtra, getEmbeddedLinkExtra } from '@graasp/sdk';

export const getItemImage = ({
  url,
  extra,
  defaultImage,
  thumbnailSrc,
}: {
  url?: string;
  extra?: EmbeddedLinkItemExtra;
  defaultImage?: string;
  thumbnailSrc?: string;
}): string | null | undefined => {
  if (url) {
    return url;
  }
  // todo: check that the type is correct
  const linkThumbnail = getEmbeddedLinkExtra(extra)?.thumbnails?.[0];
  if (linkThumbnail) {
    return linkThumbnail;
  }
  if (thumbnailSrc) {
    return thumbnailSrc;
  }
  if (defaultImage) {
    return defaultImage;
  }

  return null;
};
