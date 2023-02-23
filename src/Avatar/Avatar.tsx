import { SxProps } from '@mui/material';
import { default as AvatarComponent } from '@mui/material/Avatar';
import { SkeletonProps } from '@mui/material/Skeleton';

import React, { FC } from 'react';

import Thumbnail from '../Thumbnail';

type AvatarProps = {
  alt: string;
  /**
   * classname selector
   * use maxWidth and maxHeight or sx
   */
  className?: string;
  /**
   * component used to display the avatar (img or avatar)
   */
  component?: string;
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

const Avatar: FC<AvatarProps> = ({
  sx,
  id,
  alt = 'avatar',
  maxWidth = '100%',
  maxHeight = '100%',
  variant = 'circular',
  component = 'img',
  isLoading,
  className,
  // use a random string to trigger default avatar
  url = 'broken-image',
}) => {
  // no default value wanted and no url and is not loading
  if (!url && component !== 'avatar' && !isLoading) {
    return null;
  }

  if (component === 'avatar') {
    return (
      <AvatarComponent
        id={id}
        className={className}
        alt={alt}
        src={url}
        sx={sx}
      />
    );
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

export default React.memo(Avatar);
