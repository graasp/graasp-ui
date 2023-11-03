import { SxProps } from '@mui/material';
import Skeleton, { SkeletonProps } from '@mui/material/Skeleton';

import React, { FC } from 'react';

import { ThumbnailSizeType } from '@graasp/sdk';

import { StyledImage } from '../StyledComponents/StyledBaseComponents';
import { Variant } from '../types';

type ThumbnailProps = {
  alt: string;
  id?: string;
  /**
   * @deprecated use sx
   */
  className?: string;
  /**
   * default thumbnail component
   */
  defaultComponent?: JSX.Element;
  isLoading?: boolean;
  maxWidth?: string | number;
  maxHeight?: string | number;
  /**
   * size of the thumbnail to fetch
   */
  size?: ThumbnailSizeType;
  sx?: SxProps;
  /**
   * default thumbnail src link, override defaultValue
   */
  url?: string;
  /**
   * skeleton's variant
   */
  variant?: SkeletonProps['variant'];
};

const Thumbnail: FC<ThumbnailProps> = ({
  id,
  url,
  defaultComponent,
  alt,
  sx,
  maxWidth = '100%',
  maxHeight = '100%',
  variant = Variant.RECT,
  isLoading = false,
}) => {
  if (isLoading) {
    return <Skeleton variant={variant} width={maxWidth} height={maxHeight} />;
  }

  if (url) {
    return (
      <StyledImage
        src={url}
        id={id}
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

  if (defaultComponent) {
    return defaultComponent;
  }

  return null;
};

export default React.memo(Thumbnail);
