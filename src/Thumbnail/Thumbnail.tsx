import { Skeleton, SkeletonProps, SxProps } from '@mui/material';

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

  // sizes
  width?: string;
  minWidth?: string;
  maxWidth?: string | number;
  height?: string | number;
  maxHeight?: string | number;

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
  width,
  minWidth,
  maxWidth = '100%',
  height,
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
            minWidth,
            objectFit: 'cover',
            width: width ?? maxWidth,
            height: height ?? maxHeight,
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
    return (
      <Skeleton
        variant={variant}
        width={width ?? maxWidth}
        height={height ?? maxHeight}
      />
    );
  }

  return null;
};

export default Thumbnail;
