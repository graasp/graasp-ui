import { Skeleton, SkeletonProps, SxProps } from '@mui/material';

import { ThumbnailSizeType } from '@graasp/sdk';

import { StyledImage } from '../StyledComponents/StyledBaseComponents.js';
import { Variant } from '../types.js';

type ThumbnailProps = {
  alt: string;
  id?: string;
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

const Thumbnail = ({
  id,
  url,
  defaultComponent,
  alt,
  sx,
  maxWidth = '100%',
  maxHeight = '100%',
  variant = Variant.RECT,
  isLoading = false,
}: ThumbnailProps): JSX.Element | null => {
  if (url) {
    return (
      <StyledImage
        src={url}
        id={id}
        alt={alt}
        sx={[
          {
            objectFit: 'cover',
            width: maxWidth,
            height: maxHeight,
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

  if (isLoading) {
    return <Skeleton variant={variant} width={maxWidth} height={maxHeight} />;
  }

  return null;
};

export default Thumbnail;
