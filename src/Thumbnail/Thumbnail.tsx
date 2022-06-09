import React, { FC, useState, useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';
import { getItemImage } from '../utils/image';
import {
  EmbeddedLinkItemExtra,
  ThumbnailSizeVariant,
  UnknownExtra,
  Variant,
} from '../types';
import { DEFAULT_THUMBNAIL_SIZE } from '../constants';
import { SxProps } from '@mui/material';
import { StyledImage } from '../StyledComponents/StyledBaseComponents';

type ThumbnailProps = {
  id: string;
  extra: UnknownExtra;
  maxWidth?: string | number;
  maxHeight?: string | number;
  defaultImage?: string;
  variant?: Variant;
  alt: string;
  useThumbnail: Function;
  sx?: SxProps;
  size?: ThumbnailSizeVariant;
};

const Thumbnail: FC<ThumbnailProps> = ({
  id,
  extra,
  defaultImage,
  alt,
  useThumbnail,
  sx,
  maxWidth = '100%',
  maxHeight = '100%',
  variant = Variant.RECT,
  size = DEFAULT_THUMBNAIL_SIZE,
}) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>(
    undefined,
  );
  const {
    data: thumbnailData,
    isLoading,
    isFetching,
  } = useThumbnail({
    id,
    size,
  });

  useEffect(() => {
    if (thumbnailData) {
      const src = URL.createObjectURL(thumbnailData);
      setThumbnailUrl(src);
    }

    return () => {
      if (thumbnailUrl) {
        URL.revokeObjectURL(thumbnailUrl);
      }
    };
  }, [thumbnailData]);

  if (isLoading || isFetching) {
    return <Skeleton variant={variant} width={maxWidth} height={maxHeight} />;
  }

  const embeddedLinkExtra = extra as unknown as EmbeddedLinkItemExtra;
  const thumbnail = getItemImage({
    url: thumbnailUrl,
    extra: embeddedLinkExtra,
    defaultImage,
  });

  if (!thumbnail) {
    return null;
  }

  return (
    <StyledImage
      src={thumbnail}
      alt={alt}
      sx={[
        {
          maxWidth,
          maxHeight,
        },
        // You cannot spread `sx` directly because `SxProps` (typeof sx) can be an array.
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
};

export default Thumbnail;
