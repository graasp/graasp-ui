import {
  Avatar as AvatarComponent,
  Skeleton,
  SkeletonProps,
  SxProps,
} from '@mui/material';

import Thumbnail from '../Thumbnail';

type AvatarProps = {
  alt: string;
  /**
   * component used to display the avatar (img or avatar)
   */
  component?: 'img' | 'avatar';
  id?: string;
  isLoading?: boolean;
  maxHeight?: string | number;
  maxWidth?: string | number;
  /**
   * thumbnail size to fetch
   */
  size?: string;
  sx?: SxProps;
  url?: string;
  /**
   * skeleton variant
   */
  variant?: SkeletonProps['variant'];
};

const Avatar = ({
  sx,
  id,
  alt = 'avatar',
  maxWidth = '100%',
  maxHeight = '100%',
  variant = 'circular',
  component = 'avatar',
  isLoading,
  url,
}: AvatarProps): JSX.Element | null => {
  if (component === 'avatar') {
    if (url) {
      return (
        <AvatarComponent
          id={id}
          alt={alt}
          src={url}
          sx={{ width: maxWidth, height: maxHeight }}
        />
      );
    } else {
      if (isLoading) {
        return (
          <Skeleton
            variant={variant}
            sx={sx}
            width={maxWidth}
            height={maxHeight}
          />
        );
      }
      return <AvatarComponent />;
    }
  }

  return (
    <Thumbnail
      sx={sx}
      alt={alt}
      id={id}
      url={url}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      variant={variant}
      isLoading={isLoading}
    />
  );
};

export default Avatar;
