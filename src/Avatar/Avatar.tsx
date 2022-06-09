import React, { useState, useEffect, FC } from 'react';
import { default as AvatarComponent } from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import { getItemImage } from '../utils/image';
import { EmbeddedLinkItemExtra, Variant } from '../types';
import { DEFAULT_THUMBNAIL_SIZE } from '../constants';
import { styled, SxProps } from '@mui/material';

type AvatarProps = {
  id: string;
  extra: object;
  maxWidth?: string | number;
  maxHeight?: string | number;
  defaultImage?: string;
  variant?: Variant;
  alt: string;
  component?: string;
  sx?: SxProps;
  useAvatar: Function;
  // todo: enforce size strings
  size?: string;
};

const Avatar: FC<AvatarProps> = ({
  id,
  extra,
  sx,
  alt,
  defaultImage,
  useAvatar,
  maxWidth = '100%',
  maxHeight = '100%',
  variant = Variant.RECT,
  component = 'img',
  size = DEFAULT_THUMBNAIL_SIZE,
}) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>(
    undefined,
  );
  const {
    data: thumbnailBlob,
    isLoading,
    isFetching,
  } = useAvatar({
    id,
    size,
  });

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

  if (isLoading || isFetching) {
    return (
      <Skeleton
        variant={variant}
        width={maxWidth}
        height={maxHeight}
        sx={sx}
      />
    );
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

  if (component === 'avatar') {
    return <AvatarComponent alt={alt} src={thumbnail} sx={sx} />;
  }

  return <ScaledImg src={thumbnail} alt={alt} sx={sx} />;
};

export default Avatar;
