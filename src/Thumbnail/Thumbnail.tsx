import { SxProps } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import React, { FC, useEffect, useState } from 'react';
import { QueryObserverResult } from 'react-query';

import { ThumbnailSizeVariant } from '@graasp/sdk/frontend';

import { StyledImage } from '../StyledComponents/StyledBaseComponents';
import { DEFAULT_THUMBNAIL_SIZE } from '../constants';
import { Variant } from '../types';
import { getItemImage } from '../utils/image';

type ThumbnailProps = {
  alt: string;
  /**
   * item id to get the thumbnail for
   */
  id: string;
  useThumbnail: ({
    id,
    size,
  }: {
    id?: string | undefined;
    size?: string | undefined;
  }) => QueryObserverResult<Blob, Error>;
  /**
   * @deprecated use sx
   */
  className?: string;
  /**
   * default thumbnail component
   */
  defaultValue?: JSX.Element;
  maxWidth?: string | number;
  maxHeight?: string | number;
  /**
   * size of the thumbnail to fetch
   */
  size?: ThumbnailSizeVariant;
  sx?: SxProps;
  /**
   * default thumbnail src link, override defaultValue
   */
  thumbnailSrc?: string;
  /**
   * skeleton's variant
   */
  variant?: Variant;
};

const Thumbnail: FC<ThumbnailProps> = ({
  id,
  thumbnailSrc,
  defaultValue,
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

  const thumbnail = getItemImage({
    url: thumbnailUrl,
    thumbnailSrc,
  });

  if (thumbnail) {
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
  }

  if (defaultValue) {
    return defaultValue;
  }

  return null;
};

export default React.memo(Thumbnail);
