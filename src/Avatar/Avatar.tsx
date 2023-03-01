import { SxProps, styled } from '@mui/material';
import { default as AvatarComponent } from '@mui/material/Avatar';
import Skeleton, { SkeletonProps } from '@mui/material/Skeleton';

import React, { FC, useEffect, useState } from 'react';

import { getItemImage } from '../utils/image';

type AvatarProps = {
  alt: string;
  blob?: Blob;
  /**
   * classname selector
   * use maxWidth and maxHeight or sx
   */
  className?: string;
  /**
   * component used to display the avatar (img or avatar)
   */
  component?: string;
  /**
   * default image to use for image component
   */
  defaultImage?: string;
  isLoading?: boolean;
  maxHeight?: string | number;
  maxWidth?: string | number;
  /**
   * thumbnail size to fetch
   */
  size?: string;
  sx?: SxProps;
  /**
   * skeleton variant
   */
  variant?: SkeletonProps['variant'];
};

const Avatar: FC<AvatarProps> = ({
  sx,
  alt = 'avatar',
  // use a random string to trigger default avatar
  defaultImage = 'broken-image',
  blob: thumbnailBlob,
  maxWidth = '100%',
  maxHeight = '100%',
  variant = 'circular',
  component = 'img',
  isLoading,
  className,
}) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>(
    undefined,
  );

  const ScaledImg = styled('img')({
    maxWidth,
    maxHeight,
  });

  useEffect(() => {
    if (thumbnailBlob) {
      const src = URL.createObjectURL(thumbnailBlob);
      setThumbnailUrl(src);
    }
    return () => {
      if (thumbnailUrl) {
        URL.revokeObjectURL(thumbnailUrl);
      }
    };
  }, [thumbnailBlob]);

  if (isLoading) {
    return (
      <Skeleton variant={variant} width={maxWidth} height={maxHeight} sx={sx} />
    );
  }

  const thumbnail = getItemImage({
    url: thumbnailUrl,
    defaultImage,
  });

  if (!thumbnail) {
    return null;
  }

  if (component === 'avatar') {
    return (
      <AvatarComponent
        className={className}
        alt={alt}
        src={thumbnail}
        sx={sx}
      />
    );
  }

  return <ScaledImg className={className} src={thumbnail} alt={alt} sx={sx} />;
};

export default React.memo(Avatar);
